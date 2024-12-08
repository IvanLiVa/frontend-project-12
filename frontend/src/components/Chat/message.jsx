/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import FormChat from './chatForm.jsx';
import { setMessages, addMessage } from '../../store/slices/messagesSlice.js';
import { getMessages } from '../../Api/messages.js';
import './chat.css';
import SocketApi from '../../Api/socket.js';

const MessageForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const messages = useSelector((state) => state.messages.messages);
  const channels = useSelector((state) => state.channels.channels);
  const activeChannelId = useSelector(
    (state) => state.channels.activeChannelId,
  );
  const messagesBoxRef = React.useRef(null);
  const filteredMessages = messages.filter(
    (message) => message.channelId === activeChannelId,
  );
  const messageCount = filteredMessages.length;

  useEffect(() => {
    if (token) {
      getMessages(token)
        .then((data) => {
          dispatch(setMessages(data));
        })
        .catch((error) => {
          console.error('Ошибка загрузки сообщений:', error);
        });
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (messagesBoxRef.current) {
      messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    SocketApi.createConnection();
    SocketApi.onNewMessage(dispatch, addMessage);
  }, [dispatch]);

  const activeChannelMessages = messages.filter(
    (message) => message.channelId === activeChannelId,
  );

  const activeChannel = channels.find(
    (channel) => channel.id === activeChannelId,
  );

  return (
    <div className="col d-flex flex-column">
      <div className="chat-header bg-light p-3 shadow-sm small">
        <p className="m-0">
          <b>
            #
            {activeChannel
              ? activeChannel.name
              : 'Выберите канал'}
          </b>
        </p>
        <span className="text-muted">
          {t('text.messageCount')}
          {messageCount}
        </span>
      </div>

      <div
        id="messages-box"
        className="chat-messages flex-grow-1 overflow-auto px-5"
        ref={messagesBoxRef}
      >
        {activeChannelMessages.map((message) => (
          <div key={message.id} className="message">
            <small>
              {message.username}
              :
              {message.body}
            </small>
          </div>
        ))}
      </div>
      <FormChat />
    </div>
  );
};

export default MessageForm;
