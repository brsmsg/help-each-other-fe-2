import React from 'react';
import { ListWrapper, PostItem } from './style';
import { PostModelState } from '@/pages/PostDetail/model';
import { Image } from 'antd';
import { PREFIX } from '@/utils/constants';
import { formatTime } from '@/utils/util';

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
          <PostItem key={item.id}>
            <div className="item_left" onClick={() => handlePostClick(item.id)}>
              <div className="title">{item.title}</div>
              <ul className="post_info">
                <li>
                  <div className="author">{item.user?.username}</div>
                </li>
                <li>
                  <div className="create_at">
                    {formatTime(new Date(item.createdAt))}
                  </div>
                </li>
                <li>
                  <div className="tag">{item.tag}</div>
                </li>
              </ul>

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
            <div
              className="item_right"
              style={{ display: item.images ? 'block' : 'none' }}
            >
              {item.images ? (
                <div
                  className="wrapper"
                  style={{
                    background: `url(${PREFIX}${
                      item.images?.split('&')[0]
                    }) no-repeat`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <Image
                    src={`${PREFIX}${item.images?.split('&')[0]}`}
                    width={'100%'}
                    height={'100%'}
                    style={{ opacity: 0 }}
                  />
                </div>
              ) : null}
            </div>
          </PostItem>
        );
      })}
    </ListWrapper>
  );
};

export default PostList;
