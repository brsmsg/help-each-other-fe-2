import React from 'react';
import { Card, Avatar } from 'antd';
import { DetailWrapper } from './style';
import { Link } from '@umijs/runtime';

interface UserDetailProps {
  title: string;
}
const { Meta } = Card;

const UserDetail: React.FC<UserDetailProps> = (props) => {
  const { title } = props;

  return (
    <DetailWrapper>
      <Card title={title} bordered={true}>
        <Link to={`../userInfo/${1}`}>
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            // title={}
            description={<span></span>}
          ></Meta>
        </Link>

        <div className="stat">
          所属区域
          {/* 所属区域：{(post.authorStat as any)?.location} */}
        </div>
        <div className="stat">
          发布请求数
          {/* 发布请求数：{(post.authorStat as any)?.postCount} */}
        </div>
        <div className="stat">
          帮助他人次数
          {/* 帮助他人次数：{(post.authorStat as any)?.helpCount} */}
        </div>
      </Card>
    </DetailWrapper>
  );
};

export default UserDetail;
