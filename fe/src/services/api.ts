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
  const urlBackend = "/api/v1/auth/account";
  return axios.get<IBackendRes<IUser>>(urlBackend);
};
export const getAllUsersAPI = (query: string) => {
  const urlBackend = `/api/v1/users?${query}`;
  return axios.get<IBackendRes<IModelPaginate<IUserTable>>>(urlBackend);
};

export const createUserAPI = (
  fullName: string,
  email: string,
  password: string,
  phone: string
) => {
  const urlBackend = "/api/v1/users";
  return axios.post<IBackendRes<IRegister>>(urlBackend, {
    fullName,
    email,
    password,
    phone,
  });
};
export const updateUserAPI = (_id: string, fullName: string, phone: string) => {
  const urlBackend = `/api/v1/users/${_id}`;
  return axios.put<IBackendRes<IRegister>>(urlBackend, {
    _id,
    fullName,
    phone,
  });
};
export const getShoesAPI = (query: string) => {
  const urlBackend = `/api/v1/shoes?${query}`;
  return axios.get<IBackendRes<IModelPaginate<IShoesTable>>>(urlBackend);
};
export const createShoesAPI = (
  mainText: string,
  brand: string,
  price: number,
  quantity: number
) => {
  const urlBackend = "/api/v1/shoes";
  return axios.post<IBackendRes<IShoesTable>>(urlBackend, {
    mainText,
    brand,
    price,
    quantity,
  });
};
export const updateShoesAPI = (
  _id: string,
  mainText: string,
  brand: string,
  price: number,
  quantity: number
) => {
  const urlBackend = `/api/v1/shoes/${_id}`;
  return axios.put<IBackendRes<IShoesTable>>(urlBackend, {
    _id,
    mainText,
    brand,
    price,
    quantity,
  });
};
