import React, { useEffect, useRef, useState } from 'react';
import { HomeWrapper, PostListWrapper, PostItem } from './style';
import { RouteComponentProps } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import PostList from '@/components/PostList';
import { PostModelState } from '@/.umi/plugin-dva/connect';
import { tagEnumReverse } from '@/utils/enum';
import { getPostRequest } from './service';

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

  return (
    <>
      <NavBar tags={tags} getPost={getPost}></NavBar>
      <HomeWrapper>
        <PostListWrapper>
          <div className="post_header">
            <span
              className="popular active"
              ref={popularRef}
              onClick={(e) => handleClickType(e)}
            >
              热门
            </span>
            <span
              className="newest"
              ref={newestRef}
              onClick={(e) => handleClickType(e)}
            >
              最新
            </span>
          </div>

          <PostList posts={posts} handlePostClick={handlePostClick}></PostList>
        </PostListWrapper>
      </HomeWrapper>
    </>
  );
};

export default Home;
