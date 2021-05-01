import React, { useEffect, useState } from 'react';
import { Card, Avatar } from 'antd';
import { DetailWrapper } from './style';
import { Link } from '@umijs/runtime';
import { LoginModelState } from '@/pages/Login/model';
import { getUserInfo, getUserStat } from './service';
import { PREFIX } from '@/utils/constants';

interface UserDetailProps {
  title: string;
  id: any;
}
const { Meta } = Card;

const UserDetail: React.FC<UserDetailProps> = (props) => {
  const { title, id } = props;
  const [user, setUser] = useState<LoginModelState>();
  const [userStat, setUserStat] = useState<any>();

  const getUser = async () => {
    const res = await getUserInfo(id);
    if (res.errno === 0) {
      const { data } = res;
      setUser(data);
      console.log(data);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
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
            avatar={<Avatar src={`${PREFIX}${user?.avatar}`} />}
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
