import React from 'react';
import { HomeWrapper, PostList, PostItem } from './style';
import { RouteComponentProps } from 'react-router-dom';
import NavBar from '@/components/NavBar';
interface HomeProps extends RouteComponentProps {}
const Home: React.FC<HomeProps> = (props) => {
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
  ];
  const handlePostClick = (id: number) => {
    props.history.push(`post/${id}`);
  };
  return (
    <>
      <NavBar></NavBar>
      <HomeWrapper>
        <PostList>
          <div className="post_header">
            <span className="popular">热门</span>
            <span className="newest">最新</span>
          </div>
          <div className="postWrapper">
            {posts.map((item) => {
              return (
                <PostItem
                  onClick={() => handlePostClick(item.id)}
                  key={item.id}
                >
                  <div className="item_left">
                    <div className="title">{item.title}</div>
                    <ul className="post_info">
                      <li>
                        <div className="author">{item.user.username}</div>
                      </li>
                      <li>
                        <div className="create_at">
                          {new Date(item.createdAt).toLocaleTimeString()}
                        </div>
                      </li>
                      <li>
                        <div className="tag">{item.tag}</div>
                      </li>
                    </ul>

                    <div className="content">{item.content}</div>
                  </div>
                  <div className="item_right"></div>
                </PostItem>
              );
            })}
          </div>
        </PostList>
      </HomeWrapper>
    </>
  );
};

export default Home;
