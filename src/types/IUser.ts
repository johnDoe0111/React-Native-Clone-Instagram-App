export interface IUser {
  token?: string;
  username: string;
  _id: string;
  avatar: string;
}

export type userState = {
  user: IUser | undefined;
  isAdmin: boolean;
  isLoading: boolean;
};
