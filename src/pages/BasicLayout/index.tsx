import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router'
import { TopBar } from './style';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Login from './Login'

const BasicLayout: React.FC<RouteComponentProps> = (props) => {
  // const { location } = props;
  const [login, setLogin] = useState(false)
  // chaneg show state of login component
  const handleToggle = (show: boolean) => {
    setLogin(show);
  }

  return (
    <>
      <TopBar>
        <span>标题logo</span>
        <div className="nav_bar">
        </div>
        <div className="avatar_wrapper" onClick={() => { setLogin(true) }}>
          <Avatar size={40} icon={<UserOutlined />} />
        </div>
      </TopBar>
      <Login show={login} toggleShow={handleToggle} />
      {props.children}
    </>
  );
}

export default BasicLayout;