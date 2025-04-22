import axios from "@/services/api.customize";
export const loginAPI = (username: string, password: string) => {
  const urlBackend = "/api/v1/auth/login";
  return axios.post<IBackendRes<ILogin>>(
    urlBackend,
    { username, password },
    {
      headers: {
        delay: 1000,
      },
    }
  );
};
export const registerAPI = (
  email: string,
  password: string,
  fullName: string
) => {
  const urlBackend = "/api/v1/users";
  return axios.post<IBackendRes<IRegister>>(urlBackend, {
    email,
    password,
    fullName,
  });
};
export const fetchAccountAPI = () => {
  const urlBackend = "/api/v1/auth/profile";
  return axios.get<IBackendRes<IUser>>(urlBackend);
};
