import { Post } from '../models/model';

/* Class for internal use */

export class InternalController {

  private postExists = async id => {
    return new Promise((resolve, reject) => {
      Post.findOne({
          objectID: {
            "$eq": id
          }
        },
        (err, item) => {
          if (err) {
            console.log(err.message);
          }
          if (item) {
            resolve(true);
          }
          resolve(false);
        }
      )
    })
  };

  private createPost = async post => {
    return new Promise((resolve, reject) => {
      Post.create(post, (err, item) => {
        if (err) {
          console.log(err.message);
        }
        resolve(item);
      })
    })
  };

  public create = async (data) => {
    try {
      const post = new Post(data);
      const doesPostExists = await this.postExists(post.objectID);
      if (!doesPostExists) {
        await this.createPost(post);
      }
    } catch (error) {
      console.log(error);
    }
  };

}
