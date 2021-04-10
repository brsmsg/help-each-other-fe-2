import { getPostRequest } from '@/pages/Home/service';
import React, { useEffect, useState } from 'react';
import { NavBarItem, NavBarWrapper } from './style';
import { tagEnum, tagEnumReverse } from '@/utils/enum';

interface NavBarProps {
  tags: string[];
  getPost: Function;
  type: string;
}

const NavBar: React.FC<NavBarProps> = (props) => {
  const { tags, type } = props;
  const { getPost } = props;

  const [tag, setTag] = useState('');
  useEffect(() => {
    setTag(tags[0]);
  }, []);

  useEffect(() => {
    getPost(tag, type);
  }, [tag, type]);

  const changeCategory = (tag: string) => {
    setTag(tag);
  };

  return (
    <NavBarWrapper>
      <div className="nav_bar">
        {tags.map((item, index) => {
          return (
            <NavBarItem
              key={index + '_' + item}
              className={tag === item ? 'active' : ''}
              onClick={() => changeCategory(item)}
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
