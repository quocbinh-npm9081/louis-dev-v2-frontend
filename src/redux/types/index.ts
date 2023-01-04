export interface IUserLoginSubmit {
  account: string;
  password: string;
}
export interface IUserRegisterSubmit extends IUserLoginSubmit {
  name: string;
  confirmPassword?: string;
}
export interface IInitialStateAuth {
  isLoading: boolean;
  currentUser: any;
  accessToken: string;
  message: string;
}

export interface IUser extends IUserLoginSubmit {
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
