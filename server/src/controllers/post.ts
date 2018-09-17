import { Post } from '../models/model';
import { Request, Response } from 'express';

const {
  buildSuccObject,
  buildErrObject,
  handleError,
  checkQueryString,
  isIDGood
} = require('./base');

/* Class to handle restful api */

export class PostController {

  /* Private methods */

  private postExists = async id => {
    return new Promise((resolve, reject) => {
      Post.findOne({
          objectID: {
            "$eq": id
          }
        },
        (err, item) => {
          if (err) {
            reject(buildErrObject(422, err.message));
          }
          if (item) {
            reject(buildErrObject(422, 'POST_ALREADY_EXISTS'));
          }
          resolve(false);
        }
      )
    })
  };

  private postFindById = async (id) => {
    return new Promise((resolve, reject) => {
      Post.findOne({
          _id: id,
          "is_active": {
            "$eq": 1
          }
        },
        (err, item) => {
          if (err) {
            reject(buildErrObject(422, err.message));
          }
          if (!item) {
            reject(buildErrObject(404, 'NOT_FOUND'));
          }

          resolve(item);
        }
      )
    })
  };

  private getAllPosts = async () => {
    return new Promise((resolve, reject) => {
      Post.find({
          "is_active": {
            "$eq": 1
          }
        },
        null,
        {
          sort: {
            created_at: -1
          }
        },
        (err, items) => {
          if (err) {
            reject(buildErrObject(422, err.message))
          }
          resolve(items);
        }
      )
    })
  };

  private updatePost = async (id, obj) => {
    return new Promise((resolve, reject) => {
      Post.findOneAndUpdate({ "_id": id }, obj,
        { 'new': true }, (err, item) => {
        if (err) {
          reject(buildErrObject(422, err.message))
        }
        if (!item) {
          reject(buildErrObject(404, 'NOT_FOUND'))
        }
        resolve(item)
      })
    })
  };

  private createPost = async post => {
    return new Promise((resolve, reject) => {
      Post.create(post, (err, item) => {
        if (err) {
          reject(buildErrObject(422, err.message))
        }
        resolve(item);
      })
    })
  };

  private deleteItemFromDB = async id => {
    return new Promise((resolve, reject) => {
      Post.findByIdAndRemove(id, (err, item) => {
        if (err) {
          reject(buildErrObject(422, err.message));
        }
        if (!item) {
          reject(buildErrObject(404, 'NOT_FOUND'));
        }
        resolve(buildSuccObject('DELETED'));
      })
    })
  };

  /* Public methods */

  public getAll = async (req: Request, res: Response) => {
    try {
      res.status(200).json(await this.getAllPosts());
    } catch (error) {
      handleError(res, error);
    }
  };

  public create = async (req: Request, res: Response) => {
    try {
      const post = new Post(req.body);
      const doesPostExists = await this.postExists(post.objectID);
      if (!doesPostExists) {
        res.status(201).json(await this.createPost(post));
      }
    } catch (error) {
      handleError(res, error);
    }
  };

  public deletePost = async (req: Request, res: Response) => {
    try {
      const id = await isIDGood(req.params.id);
      let post = await this.postFindById(id);
      if (post) {
        const updateObject = { "is_active": 0 };
        res.status(200).json(await this.updatePost(id, updateObject));
      }
    } catch (error) {
      handleError(res, error);
    }
  }

}
