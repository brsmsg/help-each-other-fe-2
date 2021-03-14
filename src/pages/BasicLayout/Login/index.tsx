import React, { useEffect, useRef, useState } from 'react';
import { LoginWrapper } from './style';
import { loginRequest } from './service';
import { connect, LoginModelState, Loading } from 'umi';

interface loginProps {
  loginModel: LoginModelState;
  loading: boolean;
  dispatch: Function;
  show: boolean;
  status: boolean;  //true 登陆 false 注册
  toggleShow: (status: boolean) => void;
  toRegister: () => void  //跳转注册
}

const Login: React.FC<loginProps> = (props) => {
  const { show, loginModel, status } = props;
  const { toggleShow, dispatch, toRegister } = props;

  const usernameRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const login = async () => {
    let username: string = usernameRef.current?.value as string;
    let password: string = pwdRef.current?.value as string;
    // 组装payload
    let payload = { username, password }
    // dispatch异步请求
    dispatch({
      type: 'login/login',
      payload
    })
    toggleShow(false);
  }

  return (
    <LoginWrapper login={show}>
      <div>
        <i className="iconfont" onClick={() => toggleShow(false)}>&#xe61a;</i>
        <h1>账号登陆</h1>
        <div className="input_group">
          <div className="username">
            <input placeholder="请输入用户名" className="username" ref={usernameRef} />
          </div>
          <div className="pwd">
            <input placeholder="请输入密码" className="pwd" ref={pwdRef} type="password" />
          </div>
        </div>
        <button onClick={login}>
          登陆
        </button>
        <div className="to_register">
          还没有账号？<span onClick={toRegister}>注册</span>
        </div>
        <div className="protocal">
          注册登陆即表示同意 <a>用户协议、隐私政策</a>
        </div>
      </div>
    </LoginWrapper>
  )
}

// export default Login;
export default connect(({ login, loading }: { login: LoginModelState, loading: Loading }) => ({
  login,
  loading: loading.models.login
}))(Login);