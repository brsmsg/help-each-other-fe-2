import React, { useEffect, useState, useContext } from 'react';
import { ContactWrapper, MessageListWrapper, MessageWrapper } from './style';
import { Card, List, Avatar } from 'antd';
import { PREFIX } from '@/utils/constants';
import { getAllAdminMessages, getAllContacts } from './service';
import { getUserId } from '@/utils/currentUser';
import style from '@/assets/gloabalStyle';
import { Link } from '@umijs/runtime';
import ChatBox from '@/components/ChatBox';
import { MSGContext } from '@/pages/BasicLayout';

interface MessageProps {}

const Message: React.FC<MessageProps> = (props) => {
  const [contacts, setContacts] = useState([]);
  const [adminMessages, setAdminMessages] = useState([]);
  const [isChat, setIsChat] = useState(false);
  const [chatUser, setChatUser] = useState();

  const { msg, changeMsgNum } = useContext(MSGContext);

  useEffect(() => {
    const getContact = async () => {
      const data = await getAllContacts(getUserId() as string);
      setContacts(data);
    };
    getContact();
    // 清除消息计数
    changeMsgNum(0);
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
              <List.Item
                onClick={() => {
                  setIsChat(true);
                  setChatUser(item.user);
                }}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar src={`${PREFIX}${item.user?.avatar}`} size={40} />
                  }
                  title={
                    <div style={{ color: `${style['theme-color']}` }}>
                      {item.user?.username}
                    </div>
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
      {isChat ? (
        <ChatBox chatUser={chatUser}></ChatBox>
      ) : (
        <MessageListWrapper>
          <div className="title">消息记录</div>
          <List
            style={{ borderBottom: `1px solid ${style['border-color']}` }}
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
      )}
    </MessageWrapper>
  );
};

export default Message;
