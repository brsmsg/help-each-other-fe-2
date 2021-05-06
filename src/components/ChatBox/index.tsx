import { PREFIX } from '@/utils/constants';
import { getUser, getUserId } from '@/utils/currentUser';
import style from '@/assets/gloabalStyle';
import React, { useContext, useEffect, useState } from 'react';
import { getMsgHistory } from './service';
import { ChatBoxWrapprer } from './style';
import { isMobileContext, MSGContext, WSContext } from '@/pages/BasicLayout';
const { Chat } = require('react-jwchat');

interface ChatBoxProps {
  chatUser: any;
}

const ChatBox: React.FC<ChatBoxProps> = (props) => {
  const { chatUser } = props;
  const [contact, setContact] = useState({});
  const [history, setHistory] = useState([]);

  const ws = useContext(WSContext);
  const { msg, changeMsgNum } = useContext(MSGContext);

  const isMobile = useContext(isMobileContext);

  ws.on('message', (data: any) => {
    const newHistory = [
      ...history,
      {
        id: data.id,
        user: getUser(),
        createdAt: new Date(),
        receiver_id: data.receiver.id,
        sender_id: data.user.id,
        content: data.message.content,
      },
    ] as any;
    setHistory(newHistory);
  });

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

  const onSend = (message: any) => {
    message.receiver = chatUser;
    ws.emit('message', message);
    console.log('msg', message);
    const newHistory = [
      ...history,
      {
        id: message.id,
        user: getUser(),
        updatedAt: new Date(),
        receiver_id: message.receiver.id,
        sender_id: message.user.id,
        content: message.message.content,
      },
    ] as any;
    setHistory(newHistory);
  };

  const formatData = (message: any) => {
    const newMessage = {
      _id: message.id,
      date: new Date(message.updatedAt).getTime() / 1000,
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
        onSend={onSend}
      ></Chat>
    </ChatBoxWrapprer>
  );
};

export default ChatBox;
