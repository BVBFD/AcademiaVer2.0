import React, { useEffect, useState, useRef, useContext } from 'react';
import { UserContext } from '../Context/Context';
import styles from './Message.module.css';

const Message = ({ httpService, message, messages, setMessages, own }) => {
  const [txtUserPic, setTxtUserPic] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {}, []);

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
    <div
      className={
        own ? styles.message : [styles.message, styles.otherMessage].join(' ')
      }
    >
      <div className={styles.messageTop}>
        <img
          className={styles.messageImg}
          src={txtUserPic}
          crossOrigin='anonymous'
        />
        <p
          className={
            own
              ? styles.messageText
              : [styles.messageText, styles.otherMessageText].join(' ')
          }
        >
          {message.text}
          {message.senderId === user._id ? (
            <span onClick={own && removeMessage}>x</span>
          ) : (
            ''
          )}
        </p>
      </div>
      <div className={styles.messageBottom}>
        {new Date().toDateString(message.createdAt)}
      </div>
    </div>
  );
};

export default Message;
