import { Schema } from "mongoose";

export let postSchema: Schema = new Schema({
  created_at: Date,
  title: String,
  url: String,
  author: String,
  points: Number,
  story_text: String,
  comment_text: String,
  num_comments: Number,
  story_id: String,
  story_title: String,
  story_url: String,
  parent_id: String,
  created_at_i: Number,
  _tags: [],
  objectID: String,
  _highlightResult: {},
  is_active: {
    type: Number,
    default: 1
  }
});

/*postSchema.pre("save", (next) => {
  if (!this.is_active) {
    this.is_active = 1;
  }
  next();
});*/
