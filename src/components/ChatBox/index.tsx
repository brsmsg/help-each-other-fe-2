import { PREFIX } from '@/utils/constants';
import { getUser, getUserId } from '@/utils/currentUser';
import style from '@/assets/gloabalStyle';
import React, { useEffect, useState } from 'react';
import { getMsgHistory } from './service';
import { ChatBoxWrapprer } from './style';
const { Chat } = require('react-jwchat');

interface ChatBoxProps {
  chatUser: any;
}

const ChatBox: React.FC<ChatBoxProps> = (props) => {
  const { chatUser } = props;
  const [contact, setContact] = useState({});
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const newContact = {
      id: chatUser.id,
      avatar: `${PREFIX}${chatUser.avatar}`,
      nickname: chatUser.username,
    };
    setContact(newContact);
  }, [chatUser]);

  useEffect(() => {
    const getHistory = async () => {
      const data = await getMsgHistory(getUserId() as string, chatUser.id);
      setHistory(data);
    };
    getHistory();
  }, [chatUser]);

  // content: 'hhh';
  // createdAt: '2021-03-05T07:09:06.000Z';
  // id: 1;
  // is_check: false;
  // receiver_id: 2;
  // sender_id: 1;
  // updatedAt: '2021-03-05T07:09:06.000Z';
  const formatData = (message: any) => {
    const newMessage = {
      _id: message.id,
      date: new Date(message.createdAt).getTime(),
      user: {
        id: message.sender_id,
        avatar: `${PREFIX}${message.user.avatar}`,
        nickname: message.user.username,
      },
      message: {
        type: 'text',
        content: message.content,
      },
    };
    return newMessage;
  };
  return (
    <ChatBoxWrapprer>
      <Chat
        contact={contact}
        me={getUser()}
        chatList={(history as any).map((item: any) => formatData(item))}
        style={{
          width: '90%',
          height: '90%',
          // backgroundColor: `${style['theme-color']}`,
        }}
      ></Chat>
    </ChatBoxWrapprer>
  );
};

export default ChatBox;
