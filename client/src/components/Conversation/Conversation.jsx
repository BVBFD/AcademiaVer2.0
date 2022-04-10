import React, { useContext } from 'react';
import { UserContext } from '../Context/Context';
import styles from './Conversation.module.css';

const Conversation = (props) => {
  const { user } = useContext(UserContext);
  console.log(user);

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
