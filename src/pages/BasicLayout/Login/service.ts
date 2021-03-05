import { request } from 'umi'

export const loginRequest = async (username: string, password: string) => {
  const requestConfig = {
    method: 'POST',
    data: {
      username,
      password
    }
  };
  return request('users/login', requestConfig);
}