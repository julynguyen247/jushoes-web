export {};
declare global {
  interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
  }
  interface ILogin {
    access_token: string;
    user: {
      email: string;
      fullName: string;
      _id: string;
    };
  }
  interface IUserTable {
    _id: string;
    fullName: string;
    email: string;
    createdAt: string;
  }
  interface IUser {
    email: string;
    fullName: string;
    _id: string;
  }
  interface IRegister {
    email: string;
    fullName: string;
    _id: string;
  }
}
