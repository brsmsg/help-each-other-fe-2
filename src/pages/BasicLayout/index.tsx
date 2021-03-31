import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Musk, TopBarWrapper } from './style';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Login from '../Login';
import { IconStyle } from '../../assets/iconfont/iconfont';
import { GlobalStyle } from '@/assets/gloabalStyle';
import { Link } from '@umijs/runtime';

const BasicLayout: React.FC<RouteComponentProps> = (props) => {
  const { location } = props;
  const [isShow, setIsShow] = useState(false);
  const [status, setStatus] = useState(true); //true: 登陆  false: 注册
  // chaneg show state of login component

  const toggleShow = (show: boolean) => {
    setIsShow(show);
  };

  const toggleStatus = () => {
    setStatus(!status);
  };

  return (
    <>
      <GlobalStyle></GlobalStyle>
      <IconStyle></IconStyle>
      <TopBarWrapper>
        <div className="top_bar">
          <Link to="/">
            <div style={{ color: 'blue' }}>标题logo</div>
          </Link>
          <div className="nav_bar">
            <Link to="/">
              <div
                className={location.pathname === '/home' ? 'active' : undefined}
              >
                首页
              </div>
            </Link>
            <Link to="/writePost">
              <div
                className={
                  location.pathname === '/writePost' ? 'active' : undefined
                }
              >
                发帖
              </div>
            </Link>
          </div>
          <div
            className="avatar_wrapper"
            onClick={() => {
              setIsShow(true);
            }}
          >
            <Avatar size={40} icon={<UserOutlined />} />
          </div>
        </div>
      </TopBarWrapper>
      <Musk onClick={() => toggleShow(false)} show={isShow} />
      <Login
        show={isShow}
        toggleShow={toggleShow}
        status={status}
        toggleStatus={toggleStatus}
      />
      {props.children}
    </>
  );
};

export default BasicLayout;
