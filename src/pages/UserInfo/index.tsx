import PostList from '@/components/PostList';
import React, { useEffect, useState } from 'react';
import { UserInfoWrapper, Head } from './style';
import { RouteComponentProps } from 'react-router-dom';
import UserDetail from '@/components/UserDetail';
import { Card } from 'antd';
import { getUserId } from '@/utils/currentUser';
import { getPostRequest } from '../Home/service';

interface UserInfoPost extends RouteComponentProps {}

const UserInfo: React.FC<UserInfoPost> = (props) => {
  const { match } = props;

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getUserPosts = async (id: string) => {
      const res = await getPostRequest({ userId: id });
      if (res.errno === 0) {
        setPosts(res.data);
      }
    };
    const { id } = match.params as any;
    getUserPosts(id);
  }, []);

  const handlePostClick = (id: string) => {
    props.history.push(`/post/${id}`);
  };

  return (
    <UserInfoWrapper>
      <Head>个人帖子</Head>
      <PostList posts={posts} handlePostClick={handlePostClick}></PostList>

      <UserDetail title="个人信息"></UserDetail>
    </UserInfoWrapper>
  );
};

export default UserInfo;
