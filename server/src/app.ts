import * as dotenv from "dotenv";
dotenv.config();

import * as express from "express";
import * as bodyParser from "body-parser";
import mongoose = require("mongoose");
const axios = require('axios');
import { InternalController } from "./controllers/internal";

import { PostRouter } from "./routes/post/post";

class App {
  public app: express.Application;
  public mongoUrl: string = process.env.MONGO_URI;
  public hnInterval: string = process.env.HN_INTERVAL;
  public hnUrl: string = process.env.HN_URL;
  public init: string = process.env.INIT_DATA;
  private postRoutes: PostRouter = new PostRouter();
  public IController: InternalController = new InternalController();

  constructor() {
    this.app = express();
    this.config();
    this.setRoutes();
    this.mongoSetup();
  }

  private config(): void{
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));

    this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
      res.status(err.status || 500);
      res.json({
        error: "Server error",
      })
    });

  }

  private mongoSetup(): void{
    global.Promise = require("q").Promise;
    mongoose.Promise = global.Promise;

    mongoose.connect(this.mongoUrl,{
      useNewUrlParser: true
    }).then(() => {
      this.initData();
    }).catch(err => {
      console.log('DB connect: error');
      throw err;
    })
  }

  private setRoutes(): void {
    this.app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    this.app.use("/api", this.postRoutes.routes());
  }

  private initData(): void{
    if(parseInt(this.init)) {
      mongoose.connection.db.dropDatabase();
      this.savePosts();
    }
    setInterval(this.savePosts, this.hnInterval);
  }

  private savePosts = async () => {
    console.log("get post data");
    const posts = await this.getHNPost();

    if(posts.data) {
      for (let post of posts.data.hits) {
        this.IController.create(post);
      }
    }

  };

  private getHNPost = async () => {
    try {
      return await axios.get(this.hnUrl);
    } catch (error) {
      console.error(error);
    }
  }

}

export default new App().app;
