import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Musk, TopBarWrapper } from './style';
import { Avatar, Button, Dropdown, Menu, Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Login from '../Login';
import { IconStyle } from '../../assets/iconfont/iconfont';
import style, { GlobalStyle } from '@/assets/gloabalStyle';
import { Link } from '@umijs/runtime';
import { getUser, getUserId, clearStorage } from '@/utils/currentUser';
import webSocket, { Socket } from 'socket.io-client';

export const WSContext = React.createContext(undefined as any);

const BasicLayout: React.FC<RouteComponentProps> = (props) => {
  const { location } = props;
  const [isShow, setIsShow] = useState(false);
  const [status, setStatus] = useState(true); //true: 登陆  false: 注册
  // chaneg show state of login component

  const [isLogin, setIsLogin] = useState(false);

  const [ws, setWs] = useState<Socket>();

  const connectWebSocket = () => {
    //開啟
    setWs(webSocket('http://localhost:3001'));
  };

  useEffect(() => {
    const id = getUserId();
    if (id) setIsLogin(true);
    else setIsLogin(false);

    connectWebSocket();
  }, []);

  useEffect(() => {
    if (ws) {
      console.log('success connect');
      initWebSocket();
    }
  }, [ws]);

  const initWebSocket = () => {
    ws?.emit('login', getUserId());
    ws?.on('message', (data: any) => {
      console.log(data);
    });
  };

  const sendMessage = () => {
    ws?.emit('getMessage', '只回傳給發送訊息的 client');
  };

  const toggleShow = (show: boolean) => {
    setIsShow(show);
  };

  const toggleStatus = () => {
    setStatus(!status);
  };

  const toggleIsLogin = () => {
    setIsLogin(!isLogin);
  };

  const logOut = () => {
    clearStorage();
    setIsLogin(!isLogin);
    window.history.go(0);
  };

  const dropDownMenu = (
    <Menu>
      <Menu.Item>
        <Link to={`/userInfo/${getUserId()}`}>我的帖子</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/settings">修改信息</Link>
      </Menu.Item>
      <Menu.Item onClick={logOut}>登出</Menu.Item>
    </Menu>
  );

  return (
    <WSContext.Provider value={ws}>
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
            <div>反馈</div>
          </div>
          {isLogin ? (
            <>
              <div style={{ alignSelf: 'center', marginRight: 50 }}>
                <Link to={`/message/${getUserId()}`}>
                  <Badge count={1} size="small">
                    <Button
                      className="message"
                      style={{
                        color: '#fff',
                        backgroundColor: style['theme-color'],
                      }}
                    >
                      消息中心
                    </Button>
                  </Badge>
                </Link>
              </div>

              <Dropdown overlay={dropDownMenu} placement="bottomCenter" arrow>
                <div className="avatar_wrapper">
                  <Avatar
                    size={40}
                    icon={<UserOutlined />}
                    src={`http://localhost:3001${getUser()?.avatar}`}
                  />

                  <span>{getUser().username}</span>
                </div>
              </Dropdown>
            </>
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
    </WSContext.Provider>
  );
};

export default BasicLayout;
