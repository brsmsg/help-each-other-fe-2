import { request } from 'umi'

export const loginRequest = async (params: { username: string, password: string }) => {
  const requestConfig = {
    method: 'POST',
    data: params
  };
  return request('users/login', requestConfig);
}