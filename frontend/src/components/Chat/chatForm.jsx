import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { sendMessage } from '../../Api/messages.js';

const FormChat = () => {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const token = useSelector((state) => state.auth.token);
  const activeChannelId = useSelector((state) => state.channels.activeChannelId);
  const username = useSelector((state) => state.auth.username);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filteredMessage = leoProfanity.clean(message);
    try {
      sendMessage(filteredMessage, activeChannelId, username, token);
      setMessage('');
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
    }
  };

  return (
    <div className="mt-auto px-2 py-2">
      <form className="py-1 border rounded-2" onSubmit={handleSubmit}>
        <div className="d-flex w-100">
          <input
            name="body"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-label={t('text.newMessagePlaceholder')}
            placeholder={t('text.newMessagePlaceholder')}
            className="border-2 p-0 ps-2 form-control flex-grow-1"
          />
          <button type="submit" className="btn btn-outline-primary ms-2" style={{ width: '20%' }}>
            {t('text.sendButton')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormChat;
