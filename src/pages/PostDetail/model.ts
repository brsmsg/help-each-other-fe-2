import { Effect, ImmerReducer } from 'umi';
import { authorStatRequest, postDetailRequest } from './service';
import { LoginModelState } from 'umi';
import LoginModel from '../Login/model';

export interface PostModelState {
  id: string;
  title: string | null;
  content: string | null;
  images: string | null;
  status: number | undefined;
  reward: number | undefined;
  createdAt: Date | null;
  updatedAt: Date | null;
  user: LoginModelState | null;
  authorStat: object | null;
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
    createdAt: null,
    updatedAt: null,
    user: null,
    authorStat: null,
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
        const { id: userId } = res.data.user;
        console.log(userId);
        const AuthorRes = yield call(authorStatRequest, { userId });
        console.log(AuthorRes);
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
