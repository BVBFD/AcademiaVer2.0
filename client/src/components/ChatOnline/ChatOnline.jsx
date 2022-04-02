import React from 'react';
import styles from './ChatOnline.module.css';

const ChatOnline = (props) => {
  return (
    <div className={styles.chatOnline}>
      <div className={styles.chatOnlineFriend}>
        <div className={styles.chatOnlineImgContainer}>
          <img
            className={styles.chatOnlineImg}
            src='../images/person/2.png'
            crossOrigin='anonymous'
            alt=''
          />
          <div className={styles.chatOnlineBadge}></div>
        </div>
      </div>
      <span className={styles.chatOnlineName}>Leo Lee</span>
    </div>
  );
};

export default ChatOnline;
