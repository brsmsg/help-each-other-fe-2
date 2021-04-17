import { request } from 'umi';

export const getMsgHistory = async (userId1: string, userId2: string) => {
  const requestConfig = {
    method: 'GET',
    params: {
      id1: userId1,
      id2: userId2,
    },
  };
  const res = await request(`users/chatMsg`, requestConfig);
  if (res.errno === 0) {
    return res.data;
  }
  return null;
};
