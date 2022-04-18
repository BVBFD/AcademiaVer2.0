import React, { useEffect, useState } from 'react';
import styles from './Message.module.css';

const Message = ({ httpService, message, messages, setMessages }) => {
  const [txtUserPic, setTxtUserPic] = useState('');

  useEffect(() => {
    const getTxtUserPic = async () => {
      const res = await httpService.fetch(`api/users/${message.senderId}`, {
        method: 'GET',
      });

      const data = await res.json();
      setTxtUserPic(data.profilePic);
    };

    getTxtUserPic();
  }, []);

  const removeMessage = async () => {
    try {
      const res = await httpService.fetch(
        `api/messages/remove/${message._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      const newMessagesAfterDelete = messages.filter(
        (message) => message._id !== data._id
      );
      setMessages(newMessagesAfterDelete);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.message}>
      <div className={styles.messageTop}>
        <img
          className={styles.messageImg}
          src={txtUserPic}
          crossOrigin='anonymous'
        />
        <p className={styles.messageText}>
          {message.text}
          <span onClick={removeMessage}>x</span>
        </p>
      </div>
      <div className={styles.messageBottom}>
        {new Date().toDateString(message.createdAt)}
      </div>
    </div>
  );
};

export default Message;
