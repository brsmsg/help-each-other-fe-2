import React from 'react';
import { NavBarItem, NavBarWrapper } from './style';

interface NavBarProps {

};

const NavBar: React.FC<NavBarProps> = (props) => {

  const category = ['带拿快递', '超市代购', '拼车出行', '活动积赞']
  return (
    <NavBarWrapper>
      <div className="nav_bar">{
        category.map((item, index) => {
          return (
            <NavBarItem key={index + '_' + item} className="active">
              <span>{item}</span>
            </NavBarItem>
          )
        })
      }</div>
    </NavBarWrapper>
  )
}

export default NavBar;