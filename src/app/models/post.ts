import { Image } from './image';
import { Like } from './like';
import { Tag } from './tag';
import { User } from './user';

export class Post {
  id: number;
  content: string;
  created_at: Date;

  //oneToMany
  postImages: Image[];
  postTags: Tag[];
  postLikes: Like[];
  postComments: Comment[];

  //manyToOne
  user_posts: User;

  constructor(){}
}
