import { Document } from "mongoose";
import * as mongoose from 'mongoose';
import { IPost } from "../interfaces/post";
import { postSchema } from "../schemas/post"

export interface IPostModel extends IPost, Document {
  //custom methods for your model would be defined here
}

export const Post = mongoose.model<IPostModel>("Post", postSchema);
