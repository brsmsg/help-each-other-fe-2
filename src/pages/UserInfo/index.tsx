import PostList from '@/components/PostList';
import React from 'react';
import { UserInfoWrapper } from './style';
import { RouteComponentProps } from 'react-router-dom';
import UserDetail from '@/components/UserDetail';

interface UserInfoPost extends RouteComponentProps {}

const UserInfo: React.FC<UserInfoPost> = (props) => {
  const posts = [
    {
      id: 1,
      title: '标题',
      content:
        '内容123内容123内容123内容123内容123内容123内容123内容123内容123内容123内容123内容123内容123内容123内容123内容123内容123内容123内容123内容123内容123内容123',
      images: null,
      creator_id: 1,
      status: 0,
      reward: null,
      createdAt: '2021-03-05T07:09:06.000Z',
      updatedAt: '2021-03-05T07:12:06.000Z',
      user: {
        username: 'kbh',
      },
      tag: '123',
    },
    {
      id: 2,
      title: '标题',
      content: '内容123',
      images: null,
      creator_id: 1,
      status: 0,
      reward: null,
      createdAt: '2021-03-05T07:09:06.000Z',
      updatedAt: '2021-03-05T07:12:06.000Z',
      user: {
        username: 'kbh',
      },
      tag: '234',
    },
  ] as any;

  const handlePostClick = (id: string) => {
    props.history.push(`post/${id}`);
  };

  return (
    <UserInfoWrapper>
      <PostList posts={posts} handlePostClick={handlePostClick}></PostList>
      <UserDetail title="个人信息"></UserDetail>
    </UserInfoWrapper>
  );
};

export default UserInfo;
