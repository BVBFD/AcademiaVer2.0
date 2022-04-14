import React, { useState, useEffect } from 'react';
import Topbar from '../../components/Topbar/Topbar';
import Conversation from '../../components/Conversation/Conversation';
import Message from '../../components/Message/Message';
import styles from './Messenger.module.css';

const Messenger = ({ httpService }) => {
  const [convPartnerId, setConvPartnerId] = useState('');
  const [convId, setConvId] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getConv = async () => {
      const res = await httpService.fetch(`api/convs/${convPartnerId}`, {
        method: 'GET',
      });
      const data = await res.json();
      setConvId(data[0]._id);
    };

    getConv();
  }, [convPartnerId]);

  useEffect(() => {
    const getMessages = async () => {
      const res = await httpService.fetch(`api/messages/${convId}`, {
        method: 'GET',
      });

      const data = await res.json();
      setMessages(data);
    };

    getMessages();
  }, [convId]);

  console.log(messages);

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
              <Conversation
                httpService={httpService}
                setConvPartnerId={setConvPartnerId}
              />
            </div>
          </div>
        </div>

        <div className={styles.chatBox}>
          <div className={styles.chatBoxWrapper}>
            <div className={styles.chatBoxTop}>
              <div>
                {messages.map((message) => (
                  <Message httpService={httpService} message={message} />
                ))}
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
      </div>
    </>
  );
};

export default Messenger;
