 /* eslint-disable  functional/no-conditional-statement,  no-param-reassign,functional/no-expression-statement*/
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormChat from './chatForm.jsx';
import { setMessages } from '../../store/slices/messagesSlice.js';
import getMessages from '../../Api/messages.js';

const MessageForm = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const messages = useSelector((state) => state.messages.messages);

  useEffect(() => {
    if (token) {
      getMessages(token)
        .then((data) => {
          console.log('Полученные сообщения:', data);
          dispatch(setMessages(data));
        })
        .catch((error) => {
          console.error('Ошибка загрузки сообщений:', error);
        });
    }
  }, [token, dispatch]);

  return (
    <div className="col d-flex flex-column">
      {/* Заголовок чата */}
      <div className="chat-header bg-light p-3 shadow-sm small">
        <p className="m-0">
          <b># random</b>
        </p>
        <span className="text-muted">0 сообщений</span>
      </div>

      {/* Сообщения */}
      <div
        id="messages-box"
        className="chat-messages flex-grow-1 overflow-auto px-5"
      >
        {/* Отображаем сообщения */}
        {messages.map((message) => (
          <div key={message.id} className="message">
            <p>{message.body}</p> {/* Выводим текст сообщения */}
            <small>От: {message.username}</small>
          </div>
        ))}
      </div>

      {/* Форма ввода */}
      <FormChat />
    </div>
  );
};

export default MessageForm;
