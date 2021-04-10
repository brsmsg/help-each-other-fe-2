import { Effect, ImmerReducer } from 'umi';
import { postDetailRequest } from './service';
import { LoginModelState } from 'umi';
import LoginModel from '../Login/model';
import { getUserStat } from '@/components/UserDetail/service';

export interface PostModelState {
  id: string;
  title: string | null;
  content: string | null;
  images: string | null;
  status: number | undefined;
  reward: number | undefined;
  createdAt: string;
  updatedAt: string;
  user: LoginModelState | null;
  authorStat: object | null;
  tag?: string;
  views: number;
  accNum: number;
  maxMembers: number;
}

export interface PostModelType {
  namespace: 'post';
  state: PostModelState;
  effects: {
    getPostInfo: Effect;
    // getAuthorStat: Effect;
  };
  reducers: {
    changePostState: ImmerReducer<PostModelState>;
    changeAuthorStat: ImmerReducer<PostModelState>;
  };
}

const PostModel: PostModelType = {
  namespace: 'post',
  state: {
    id: '',
    title: '',
    content: '',
    images: '',
    status: undefined,
    reward: undefined,
    createdAt: '',
    updatedAt: '',
    user: null,
    authorStat: null,
    views: 0,
    accNum: 0,
    maxMembers: 0,
  },
  effects: {
    *getPostInfo({ payload }, { call, put }) {
      const res = yield call(postDetailRequest, payload);
      if (res.errno === 0) {
        yield put({
          type: 'changePostState',
          payload: res.data,
        });
        // 获取用户统计
        const { id } = res.data.user;
        const AuthorRes = yield call(getUserStat, { id });
        console.log('stat', AuthorRes);
        if (AuthorRes.errno === 0) {
          yield put({
            type: 'changeAuthorStat',
            payload: AuthorRes.data,
          });
        }
      }
    },
  },
  reducers: {
    changePostState(state, { payload }) {
      return { ...state, ...payload };
    },
    changeAuthorStat(state, { payload }) {
      return {
        ...state,
        authorStat: payload,
      };
    },
  },
};

export default PostModel;
