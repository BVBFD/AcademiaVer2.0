import React from 'react';
import styles from './Message.module.css';

const Message = (props) => {
  return (
    <div className={styles.message}>
      <div className={styles.messageTop}>
        <img
          className={styles.messageImg}
          src='../images/person/1.png'
          crossOrigin='anonymous'
        />
        <p className={styles.messageText}>Hello this is my Text!</p>
      </div>
      <div className={styles.messageBottom}>2022.03.22</div>
    </div>
  );
};

export default Message;
