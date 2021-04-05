import React from 'react';
import { ListWrapper, PostItem } from './style';
import { PostModelState } from '@/pages/PostDetail/model';

interface PostListProps {
  posts: PostModelState[];
  handlePostClick: (id: string) => void;
}
export const PostList: React.FC<PostListProps> = (props) => {
  const { posts } = props;
  const { handlePostClick } = props;

  return (
    <ListWrapper>
      {posts.map((item) => {
        return (
          <PostItem onClick={() => handlePostClick(item.id)} key={item.id}>
            <div className="item_left">
              <div className="title">{item.title}</div>
              <ul className="post_info">
                <li>
                  <div className="author">{item.user?.username}</div>
                </li>
                <li>
                  <div className="create_at">
                    {/* {new Date(item.createdAt).toLocaleTimeString()} */}
                    {item.createdAt}
                  </div>
                </li>
                <li>
                  <div className="tag">{item.tag}</div>
                </li>
              </ul>

              {/* <div className="content">{item.content}</div> */}
              <ul className="other_info">
                <li>
                  <i className="iconfont">&#xe6df;</i>
                  {item.views} 次
                </li>
                <li>
                  <i className="iconfont">&#xe604;</i>
                  {item.accNum} / {item.maxMembers}
                </li>
              </ul>
            </div>
            <div className="item_right"></div>
          </PostItem>
        );
      })}
    </ListWrapper>
  );
};

export default PostList;
