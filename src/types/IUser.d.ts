interface IUser {
  token?: string;
  username: string;
  _id: string;
  avatar: string;
}

type userState = {
  user: IUser | undefined;
  isAdmin: boolean;
  isLoading: boolean;
};
