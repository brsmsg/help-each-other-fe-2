import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Musk, TopBarWrapper } from './style';
import { Avatar, Button, Dropdown, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Login from '../Login';
import { IconStyle } from '../../assets/iconfont/iconfont';
import { GlobalStyle } from '@/assets/gloabalStyle';
import { Link } from '@umijs/runtime';
import { getUserId } from '@/utils/currentUser';

const BasicLayout: React.FC<RouteComponentProps> = (props) => {
  const { location } = props;
  const [isShow, setIsShow] = useState(false);
  const [status, setStatus] = useState(true); //true: 登陆  false: 注册
  // chaneg show state of login component

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const id = getUserId();
    if (id) setIsLogin(true);
    else setIsLogin(false);
  }, []);

  const toggleShow = (show: boolean) => {
    setIsShow(show);
  };

  const toggleStatus = () => {
    setStatus(!status);
  };

  const toggleIsLogin = () => {
    setIsLogin(!isLogin);
  };

  const dropDownMenu = (
    <Menu>
      <Menu.Item>
        <Link to={`/userInfo/${getUserId()}`}>前往个人主页</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/settings">修改个人信息</Link>
      </Menu.Item>
      <Menu.Item>登出</Menu.Item>
    </Menu>
  );

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
          {isLogin ? (
            <div className="avatar_wrapper">
              <Dropdown overlay={dropDownMenu} placement="bottomLeft" arrow>
                <Avatar size={40} icon={<UserOutlined />} />
              </Dropdown>
            </div>
          ) : (
            <div className="button_wrapper">
              <Button
                className="register"
                onClick={() => {
                  setIsShow(true);
                }}
              >
                注册
              </Button>
              <Button
                className="login"
                onClick={() => {
                  setIsShow(true);
                }}
              >
                登录
              </Button>
            </div>
          )}
        </div>
      </TopBarWrapper>
      <Musk onClick={() => toggleShow(false)} show={isShow} />
      <Login
        show={isShow}
        toggleShow={toggleShow}
        status={status}
        toggleStatus={toggleStatus}
        toggleIsLogin={toggleIsLogin}
      />
      {props.children}
    </>
  );
};

export default BasicLayout;
