import React from 'react';
import styles from './Conversation.module.css';

const Conversation = (props) => {
  return (
    <div className={styles.conversation}>
      <img
        className={styles.conversationImg}
        src='../images/truyu.jpg'
        crossOrigin='anonymous'
        alt=''
      />
      <span className={styles.conversationName}>Truyu</span>
    </div>
  );
};

export default Conversation;
