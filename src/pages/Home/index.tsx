import React, { useEffect, useRef, useState } from 'react';
import { HomeWrapper, PostListWrapper, UserListWrapper } from './style';
import { RouteComponentProps } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import PostList from '@/components/PostList';
import { tagEnumReverse } from '@/utils/enum';
import { getPostRequest } from './service';
import { Card, List, Avatar } from 'antd';

interface HomeProps extends RouteComponentProps {}
const Home: React.FC<HomeProps> = (props) => {
  const tags = ['所有帖子', '代拿快递', '超市代购', '拼车出行', '活动积赞'];
  const [posts, setPosts] = useState([]);
  const popularRef = useRef<HTMLElement>(null);
  const newestRef = useRef<HTMLElement>(null);

  const getPost = async (tag: any) => {
    // @ts-ignore
    const newPosts = await getPostRequest({ tag: tagEnumReverse[tag] });
    if (newPosts.errno === 0) {
      console.log(newPosts.data);
      setPosts(newPosts.data);
    }
  };

  const handlePostClick = (id: string) => {
    props.history.push(`post/${id}`);
  };

  const handleClickType = (e: MouseEvent) => {
    if (e.target === popularRef.current) {
      popularRef.current?.classList.add('active');
      newestRef.current?.classList.remove('active');
    } else {
      newestRef.current?.classList.add('active');
      popularRef.current?.classList.remove('active');
    }
  };

  const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];

  return (
    <>
      <NavBar tags={tags} getPost={getPost}></NavBar>
      <HomeWrapper>
        <PostListWrapper>
          <div className="post_header">
            <span
              className="popular active"
              ref={popularRef}
              onClick={(e: any) => handleClickType(e)}
            >
              热门
            </span>
            <span
              className="newest"
              ref={newestRef}
              onClick={(e: any) => handleClickType(e)}
            >
              最新
            </span>
          </div>

          <PostList posts={posts} handlePostClick={handlePostClick}></PostList>
        </PostListWrapper>
        <UserListWrapper>
          <Card title="活跃用户">
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={<a href="https://ant.design">{item.title}</a>}
                    description="Ant Design"
                  />
                </List.Item>
              )}
            ></List>
          </Card>
        </UserListWrapper>
      </HomeWrapper>
    </>
  );
};

export default Home;
