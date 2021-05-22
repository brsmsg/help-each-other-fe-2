import React, { useEffect, useRef, useState } from 'react';
import { HomeWrapper, PostListWrapper, UserListWrapper } from './style';
import { Link, RouteComponentProps } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import PostList from '@/components/PostList';
import { tagEnumReverse } from '@/utils/enum';
import { getPostRequest, getTopUsers } from './service';
import { Card, List, Avatar } from 'antd';
import { PREFIX } from '@/utils/constants';

interface HomeProps extends RouteComponentProps {}
const Home: React.FC<HomeProps> = (props) => {
  const tags = [
    '所有帖子',
    '代拿快递',
    '物品租借',
    '超市代购',
    '拼车出行',
    '活动积赞',
    '其他',
  ];
  const [posts, setPosts] = useState([]);
  const popularRef = useRef<HTMLElement>(null);
  const newestRef = useRef<HTMLElement>(null);
  const [type, setType] = useState('');

  const [topUsers, setTopUsers] = useState([]);

  const getPost = async (tag: any, type: string) => {
    // @ts-ignore
    const newPosts = await getPostRequest({ tag: tagEnumReverse[tag], type });
    if (newPosts.errno === 0) {
      setPosts(newPosts.data);
    }
  };

  const getTop = async () => {
    const res = await getTopUsers();
    if (res.errno === 0) setTopUsers(res.data);
  };

  useEffect(() => {
    getTop();
  }, []);

  const handlePostClick = (id: string) => {
    props.history.push(`post/${id}`);
  };

  const handleClickType = (e: MouseEvent) => {
    if (e.target === popularRef.current) {
      popularRef.current?.classList.add('active');
      newestRef.current?.classList.remove('active');
      setType('popular');
    } else {
      newestRef.current?.classList.add('active');
      popularRef.current?.classList.remove('active');
      setType('newest');
    }
  };

  return (
    <>
      <NavBar tags={tags} type={type} getPost={getPost}></NavBar>
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
              dataSource={topUsers}
              renderItem={(item: any) => (
                <Link to={`/userInfo/${item.id}`}>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={`${PREFIX}${item.avatar}`} />}
                      title={<a>{item.username}</a>}
                      description={item.location}
                    />
                  </List.Item>
                </Link>
              )}
            ></List>
          </Card>
        </UserListWrapper>
      </HomeWrapper>
    </>
  );
};

export default Home;
