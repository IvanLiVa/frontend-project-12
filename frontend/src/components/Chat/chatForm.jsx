import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { sendMessage } from '../../Api/messages.js';

const FormChat = () => {
  const [message, setMessage] = useState('');
  const token = useSelector((state) => state.auth.token);
  const activeChannelId = useSelector(
    (state) => state.channels.activeChannelId
  );
  const username = useSelector((state) => state.auth.username);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      sendMessage(message, activeChannelId, username, token);
      setMessage('');
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
    }
  };

  return (
    <div className="mt-auto px-5 py-3">
      <form className="py-1 border rounded-2" onSubmit={handleSubmit}>
        <div className="input-group has-validation">
          <input
            name="body"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-label="Новое сообщение"
            placeholder="Введите сообщение..."
            className="border-0 p-0 ps-2 form-control"
          />
          <button type="submit" className="btn btn-group-vertical">
            Отправить
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormChat;
