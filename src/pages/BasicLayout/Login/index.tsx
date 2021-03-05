import React, { useEffect, useRef, useState } from 'react';
import { LoginWrapper } from './style';
import { loginRequest } from './service';

interface loginProps {
  show: boolean;
  toggleShow: Function;
}

const Login: React.FC<loginProps> = (props) => {
  const { show } = props;
  const { toggleShow } = props;

  const usernameRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const login = async () => {
    let username: string = usernameRef.current?.value as string;
    let password: string = pwdRef.current?.value as string;
    let res = await loginRequest(username, password);
    console.log(res);
    if (res.errno !== 0) alert(res.message);
    toggleShow(false);
  }

  return (
    <LoginWrapper login={show}>
      <div>
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
        <div className="protocal">
          注册登陆即表示同意 <a>用户协议、隐私政策</a>
        </div>
      </div>
    </LoginWrapper>
  )
}

export default Login;