export interface IPost {
  user: {
    _id: string;
    username: string;
    avatar: string;
  };
  _id: string;
  description: string;
  likes: [];
  comments: [];
  image: string;
  created_at: string;
  __v: number;
}

export type postState = {
  posts: IPost[];
  isLoading: boolean;
  error: boolean;
};
