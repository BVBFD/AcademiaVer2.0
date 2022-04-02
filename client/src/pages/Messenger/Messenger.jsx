import React from 'react';
import Topbar from '../../components/Topbar/Topbar';
import Conversation from '../../components/Conversation/Conversation';
import Message from '../../components/Message/Message';
import ChatOnline from '../../components/ChatOnline/ChatOnline';
import styles from './Messenger.module.css';

const Messenger = (props) => {
  return (
    <>
      <Topbar />
      <div className={styles.messenger}>
        <div className={styles.chatMenu}>
          <div className={styles.chatMenuWrapper}>
            <input
              placeholder='Search for friends'
              className={styles.chatMenuInput}
            />
            <div>
              <Conversation />
            </div>
          </div>
        </div>

        <div className={styles.chatBox}>
          <div className={styles.chatBoxWrapper}>
            <div className={styles.chatBoxTop}>
              <div>
                <Message />
              </div>
            </div>
            <div className={styles.chatBoxBottom}>
              <textarea
                className={styles.chatMessageInput}
                placeholder='Write Something...'
              ></textarea>
              <button className={styles.chatSubmitButton}>Send</button>
            </div>
          </div>
        </div>

        <div className={styles.chatOnline}>
          <div className={styles.chatOnlineWrapper}>
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
