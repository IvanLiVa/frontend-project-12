import React from 'react';

const FormChat = () => {
  return (
    <div className="mt-auto px-5 py-3">
      <form className="py-1 border rounded-2">
        <div className="input-group has-validation">
          <input
            name="body"
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
