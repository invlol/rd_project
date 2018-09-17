import { Request, Response, Router } from "express";
import { Post } from "../../models/post";
import { PostController } from "../../controllers/post";

export class PostRouter {

  public postController: PostController = new PostController();

  public routes(): Router {

    const postRoutes = Router();

    postRoutes
      .get("/post", this.postController.getAll)
      .post("/post", this.postController.create)
      .delete("/post/:id", this.postController.deletePost);

    return postRoutes;
  }
}
