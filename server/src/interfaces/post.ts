export interface IPost {
  created_at?: Date;
  title?: string;
  url?: string;
  author?: string;
  points?: number;
  story_text?: string;
  comment_text?: string;
  num_comments?: number;
  story_id?: string;
  story_title?: string;
  story_url?: string;
  parent_id?: string;
  created_at_i?: number;
  _tags: string[];
  objectID?: string;
  _highlightResult?: {},
  is_active: number
}
