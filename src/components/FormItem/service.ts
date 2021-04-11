import { request } from 'umi';

export const updateProfile = async (params: any) => {
  const requestConfig = {
    method: 'POST',
    data: params,
  };
  const res = await request('users/update', requestConfig);
  let data = null;
  if (res.errno === 0) {
    data = res.data;
  }
  return data;
};
