import React, { useEffect, useState } from 'react';
import { ContactWrapper, MessageListWrapper, MessageWrapper } from './style';
import { Card, List, Avatar } from 'antd';
import { PREFIX } from '@/utils/constants';
import { getAllAdminMessages, getAllContacts } from './service';
import { getUserId } from '@/utils/currentUser';
import style from '@/assets/gloabalStyle';
import { Link } from '@umijs/runtime';

interface MessageProps {}

const Message: React.FC<MessageProps> = (props) => {
  const [contacts, setContacts] = useState([]);
  const [adminMessages, setAdminMessages] = useState([]);

  useEffect(() => {
    const getContact = async () => {
      const data = await getAllContacts(getUserId() as string);
      setContacts(data);
    };
    getContact();
  }, []);

  useEffect(() => {
    const getAdminMessages = async () => {
      const data = await getAllAdminMessages(getUserId() as string);
      setAdminMessages(data);
    };
    getAdminMessages();
  }, []);

  return (
    <MessageWrapper>
      <ContactWrapper>
        <Card title="联系人">
          <List
            itemLayout="horizontal"
            dataSource={contacts}
            style={{ marginTop: '5px', minHeight: '500px' }}
            renderItem={(item: any) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar src={`${PREFIX}${item.user?.avatar}`} size={40} />
                  }
                  title={
                    <Link
                      to={`/userInfo/${item.user.id}`}
                      style={{ color: `${style['theme-color']}` }}
                    >
                      {item.user?.username}
                    </Link>
                  }
                  description={
                    <span style={{ color: `${style['text-color-deep']}` }}>
                      {item.content}
                    </span>
                  }
                />
              </List.Item>
            )}
          ></List>
        </Card>
      </ContactWrapper>
      <MessageListWrapper>
        <div className="title">消息记录</div>
        <List
          dataSource={adminMessages}
          renderItem={(item: any) => (
            <List.Item style={{ minHeight: '100px', padding: '5px 20px' }}>
              <List.Item.Meta
                title={
                  <Link to="" style={{ color: `${style['theme-color']}` }}>
                    系统管理员消息
                  </Link>
                }
                description={<span>{item.content}</span>}
              />
            </List.Item>
          )}
        ></List>
      </MessageListWrapper>
    </MessageWrapper>
  );
};

export default Message;
