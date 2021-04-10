import { request } from 'umi';

export const postDetailRequest = async (params: { id: string }) => {
  const requestConfig = {
    method: 'GET',
    params,
  };
  return request(`post/${params.id}`, requestConfig);
};

export const authorStatRequest = async (params: { id: string }) => {
  const requestConfig = {
    method: 'GET',
    params,
  };
  return request(`users/userStat/${params.id}`, requestConfig);
};

export const participantsRequest = async (params: { id: string }) => {
  const requestConfig = {
    method: 'GET',
    params,
  };
};

export const applyRequest = async (params: {
  applicantId: string;
  postId: string;
  text: string;
}) => {
  const { applicantId, postId, text } = params;
  const requestConfig = {
    method: 'POST',
    data: {
      applicantId,
      text,
    },
  };
  return request(`post/apply/${postId}`, requestConfig);
};

export const getApplyStatus = async (params: {
  postId: string;
  applicantId: string;
}) => {
  const requestConfig = {
    method: 'GET',
    params,
  };
  return request(`post/apply/status`, requestConfig);
};

export const getApplyList = async (params: any) => {
  const { postId } = params;
  const requestConfig = {
    method: 'GET',
  };
  return request(`post/apply/list/${postId}`, requestConfig);
};

export const changeApplySatus = async (params: any) => {
  const requestConfig = {
    method: 'POST',
    data: params,
  };
  const res = await request('post/changeStatus', requestConfig);
  let data = null;
  if (res.errno === 0) {
    data = res.data;
  }
  return data;
};

export const addViewNum = async (postId: string) => {
  const res = await request(`post/addViewNum/${postId}`);
};
