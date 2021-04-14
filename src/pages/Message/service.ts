import { request } from 'umi';

export const getAllContacts = async (userId: string) => {
  const res = await request(`users/getContact/${userId}`);
  let data = null;
  if (res.errno === 0) {
    data = res.data;
  }
  return data;
};

export const getAllAdminMessages = async (userId: string) => {
  const res = await request(`users/getAdminMessgae/${userId}`);
  let data = null;
  if (res.errno === 0) {
    data = res.data;
  }
  return data;
};
