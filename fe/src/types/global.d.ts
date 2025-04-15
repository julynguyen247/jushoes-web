export {};
declare global {
  interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
  }
  interface ILogin {
    email: string;
    password: string;
  }
  interface IUserTable {
    _id: string;
    fullName: string;
    email: string;
    createdAt: string;
  }
}
