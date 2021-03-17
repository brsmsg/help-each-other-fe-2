import React, { useEffect, useState } from 'react';
import { NavBarItem, NavBarWrapper } from './style';

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = (props) => {
  const categories = [
    '所有帖子',
    '带拿快递',
    '超市代购',
    '拼车出行',
    '活动积赞',
  ];

  const [category, setCategory] = useState(0);
  useEffect(() => {
    setCategory(0);
  }, []);

  const changeCategory = (cat: number) => {
    setCategory(cat);
  };

  return (
    <NavBarWrapper>
      <div className="nav_bar">
        {categories.map((item, index) => {
          return (
            <NavBarItem
              key={index + '_' + item}
              className={category === index ? 'active' : ''}
              onClick={() => changeCategory(index)}
            >
              <span>{item}</span>
            </NavBarItem>
          );
        })}
      </div>
    </NavBarWrapper>
  );
};

export default NavBar;
