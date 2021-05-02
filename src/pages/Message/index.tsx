import React, { useEffect, useState, useContext, useRef } from 'react';
import { ContactWrapper, MessageListWrapper, MessageWrapper } from './style';
import { Card, List, Avatar, Badge } from 'antd';
import { PREFIX } from '@/utils/constants';
import { getAllAdminMessages, getAllContacts, checkMessages } from './service';
import { getUserId } from '@/utils/currentUser';
import style from '@/assets/gloabalStyle';
import { Link } from '@umijs/runtime';
import ChatBox from '@/components/ChatBox';
import { MSGContext, WSContext } from '@/pages/BasicLayout';
import { useImmer } from 'use-immer';

interface MessageProps {}

const Message: React.FC<MessageProps> = (props) => {
  const [contacts, setContacts] = useImmer([]);
  const [adminMessages, setAdminMessages] = useState([]);
  const [isChat, setIsChat] = useState(false);
  const [chatUser, setChatUser] = useState();

  const { msg, changeMsgNum } = useContext(MSGContext);
  // const { msgType, setMsgType } = useState("");
  const [isShowContact, setIsShowContact] = useState(true);
  const contactRef = useRef<HTMLElement>();
  const adminRef = useRef<HTMLElement>();

  const ws = useContext(WSContext);

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

  const checkAllMessgae = async (id: any) => {
    setContacts((contacts) => {
      contacts.forEach((item: any) => {
        if (item.user.id === id) {
          item.length = 0;
        }
      });
    });
    await checkMessages({ id1: id, id2: getUserId() });
  };

  // const toggleMsg = () => {
  //   const contact = contactRef.current;
  //   console.log(contact);
  //   const admin = adminRef.current;
  // };

  return (
    <MessageWrapper>
      <ContactWrapper ref={contactRef}>
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
                  checkAllMessgae(item.user.id);
                }}
              >
                <List.Item.Meta
                  style={{ cursor: 'pointer ' }}
                  avatar={
                    <Badge count={item.length} size="small" offset={[-5, 5]}>
                      <Avatar src={`${PREFIX}${item.user?.avatar}`} size={40} />
                    </Badge>
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
          <div className="title">
            <span>消息记录</span>
            <span className="user_msg">
              查看用户消息
            </span>
          </div>
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
                  description={
                    <Link to={`/post/${item.postId}`}>
                      <span style={{ color: `${style['text-color-deep']}` }}>
                        {item.content.split('&')[0]}
                      </span>
                    </Link>
                  }
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
