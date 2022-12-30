export interface IUserSubmit {
  account: string;
  password: string;
}

export interface IInitialStateAuth {
  isLoading: boolean;
  currentUser: any;
  accessToken: string;
}

export interface IUser extends IUserSubmit {
  _id: string;
  avatar: string;
  name: string;
  role: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface ILoginResponse {
  msg: string;
  access_token: string;
  user: IUser;
}
