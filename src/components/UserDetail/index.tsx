import React, { useEffect, useState } from 'react';
import { Card, Avatar } from 'antd';
import { DetailWrapper } from './style';
import { Link } from '@umijs/runtime';
import { LoginModelState } from '@/pages/Login/model';
import { getUserId } from '@/utils/currentUser';
import { getUserStat } from './service';

interface UserDetailProps {
  title: string;
}
const { Meta } = Card;

const UserDetail: React.FC<UserDetailProps> = (props) => {
  const { title } = props;
  const [user, setUser] = useState<LoginModelState>();
  const [userStat, setUserStat] = useState<any>();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('currentUser') as string));
  }, []);

  useEffect(() => {
    const id = getUserId();
    const getUserStatAsync = async () => {
      const res = await getUserStat({ id });
      if (res.errno === 0) {
        setUserStat(res.data);
      }
    };
    getUserStatAsync();
  }, []);
  return (
    <DetailWrapper>
      <Card title={title} bordered={true}>
        <Link to={`../userInfo/${1}`}>
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={user?.username}
            description={<span></span>}
          ></Meta>
        </Link>

        <div className="stat">所属区域: {user?.location}</div>
        <div className="stat">发布请求数: {userStat?.postNum} 个</div>
        <div className="stat">帮助他人次数: {userStat?.helpNum} 次</div>
      </Card>
    </DetailWrapper>
  );
};

export default UserDetail;
