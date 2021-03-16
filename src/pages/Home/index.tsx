import React from 'react';
import {
  HomeWrapper, PostList
} from './style'

const Home: React.FC = () => {

  const posts = [{

  },
  {

  }]

  return (
    <HomeWrapper>
      <PostList>
        <div className="post_header">
          <span className="popular">热门</span>
          <span className="newest">最新</span>
        </div>
        <div className="postWrapper">

        </div>
      </PostList>
    </HomeWrapper>
  )
}

export default Home;