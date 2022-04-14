import React, { useEffect, useState } from 'react';
import styles from './Message.module.css';

const Message = ({ httpService, message }) => {
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

  return (
    <div className={styles.message}>
      <div className={styles.messageTop}>
        <img
          className={styles.messageImg}
          src={txtUserPic}
          crossOrigin='anonymous'
        />
        <p className={styles.messageText}>{message.text}</p>
      </div>
      <div className={styles.messageBottom}>
        {new Date().toDateString(message.createdAt)}
      </div>
    </div>
  );
};

export default Message;
