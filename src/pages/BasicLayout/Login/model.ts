import { Effect, ImmerReducer } from 'umi';
import { loginRequest } from './service';

export interface LoginModelState {
  id: number | undefined,
  username: string,
  gender: string,
  avatar: string | null,
  category: string | null,
  location: string | null,
}

export interface LoginModelType {
  namespace: 'login',
  state: LoginModelState,
  effects: {
    login: Effect
  },
  reducers: {
    changeLoginStatus: ImmerReducer<LoginModelState>
  }

}

const LoginModel: LoginModelType = {
  namespace: 'login',
  state: {
    id: undefined,
    username: '',
    gender: '',
    avatar: '',
    category: '',
    location: '',
  },
  effects: {
    // call 执行异步函数， put 发出action，类似dispatch
    // 异步发起登陆请求
    * login({ payload }, { call, put }) {
      console.log(payload);
      const res = yield call(loginRequest, payload);
      console.log('res', res);
      if (res.errno === 0) {
        yield put({
          type: 'changeLoginStatus',
          payload: res.data
        })
      }
    }
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}

export default LoginModel;