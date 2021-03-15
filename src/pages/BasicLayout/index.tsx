import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router'
import { Musk, TopBar } from './style';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Login from '../Login'
import NavBar from '../../components/NavBar'
import { IconStyle } from '../../assets/iconfont/iconfont';

const BasicLayout: React.FC<RouteComponentProps> = (props) => {
  // const { location } = props;
  const [isShow, setIsShow] = useState(false)
  const [status, setStatus] = useState(true);  //true: 登陆  false: 注册
  // chaneg show state of login component
  const toggleShow = (show: boolean) => {
    setIsShow(show);
  }

  const toggleStatus = () => {
    setStatus(!status);
  }

  return (
    <>
      <IconStyle></IconStyle>
      <TopBar>
        <span>标题logo</span>
        <div className="nav_bar">
        </div>
        <div className="avatar_wrapper" onClick={() => { setIsShow(true) }}>
          <Avatar size={40} icon={<UserOutlined />} />
        </div>
      </TopBar >
      <NavBar></NavBar>
      <Musk onClick={() => toggleShow(false)} show={isShow} />
      <Login show={isShow} toggleShow={toggleShow} status={status} toggleStatus={toggleStatus} />
      { props.children}
    </>
  );
}

export default BasicLayout;