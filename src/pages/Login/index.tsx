import React, { useEffect, useRef, useState } from 'react';
import { LoginWrapper, RegisterWrapper } from './style';
import { loginRequest, registerRequest } from './service';
import { connect, LoginModelState, Loading } from 'umi';
import { getUser, getUserId } from '@/utils/currentUser';
import FormItem from '@/components/FormItem';
import { message } from 'antd';

interface loginProps {
  loginModel?: LoginModelState;
  loading?: boolean;
  dispatch: Function;
  show: boolean;
  status: boolean; //true 登陆 false 注册
  toggleShow: (status: boolean) => void;
  toggleStatus: () => void;
  toggleIsLogin: () => void;
}

const Login: React.FC<loginProps> = (props) => {
  const { show, loginModel, status } = props;
  const { toggleShow, dispatch, toggleStatus, toggleIsLogin } = props;

  const usernameRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);

  const login = async () => {
    let username: string = usernameRef.current?.value as string;
    let password: string = pwdRef.current?.value as string;
    // 组装payload
    let payload = { username, password };
    // dispatch异步请求
    dispatch({
      type: 'login/login',
      payload,
    });
  };

  const register = async () => {
    const username = usernameRef.current?.value;
    const password = pwdRef.current?.value;
    const gender = genderRef.current?.checked ? 0 : 1;
    const phone = phoneRef.current?.value;
    const location = locationRef.current?.value;

    const params = { username, password, gender, phone, location };
    const res = await registerRequest(params);
    console.log(res);
    if (res.errno === 0) {
      message.success('注册成功');
      toggleShow(false);
    } else {
      message.error(res.message);
    }

    dispatch({
      type: 'login/login',
      payload: { username, password },
    });
  };

  useEffect(() => {
    toggleShow(false);
    toggleIsLogin();
  }, [getUserId()]);

  return (
    <>
      {status ? (
        <LoginWrapper login={show}>
          <div>
            <i className="iconfont" onClick={() => toggleShow(false)}>
              &#xe61a;
            </i>
            <h1>账号登陆</h1>
            <div className="input_group">
              <div className="username">
                <input
                  placeholder="请输入用户名"
                  className="username"
                  ref={usernameRef}
                />
              </div>
              <div className="pwd">
                <input
                  placeholder="请输入密码"
                  className="pwd"
                  ref={pwdRef}
                  type="password"
                />
              </div>
            </div>
            <button onClick={login}>登陆</button>
            <div className="to_register">
              还没有账号？<span onClick={toggleStatus}>注册</span>
            </div>
            <div className="protocal">
              注册登陆即表示同意 <a>用户协议、隐私政策</a>
            </div>
          </div>
        </LoginWrapper>
      ) : (
        <RegisterWrapper login={show}>
          <div>
            <div>
              <i className="iconfont" onClick={() => toggleShow(false)}>
                &#xe61a;
              </i>
              <h1>账号注册</h1>
              <div className="input_group">
                <div className="text">
                  <input
                    placeholder="请输入用户名"
                    className="username"
                    ref={usernameRef}
                  />
                </div>
                <div className="text">
                  <input
                    placeholder="请输入密码"
                    className="pwd"
                    ref={pwdRef}
                    type="password"
                  />
                </div>
                <div className="gender">
                  <label>
                    <input
                      name="gender"
                      type="radio"
                      value="male"
                      defaultChecked
                      ref={genderRef}
                    />
                    男
                  </label>
                  <label>
                    <input name="gender" type="radio" value="female" />女
                  </label>
                </div>
                <div className="text">
                  <input placeholder="请输入电话" ref={phoneRef} />
                </div>
                <div className="text">
                  <input placeholder="武汉理工大学" ref={locationRef} />
                </div>
              </div>
              <button onClick={register}>立即注册</button>
            </div>
          </div>
        </RegisterWrapper>
      )}
    </>
  );
};

// export default Login;
export default connect(
  ({ login, loading }: { login: LoginModelState; loading: Loading }) => ({
    login,
    loading: loading.models.login,
  }),
)(Login);
