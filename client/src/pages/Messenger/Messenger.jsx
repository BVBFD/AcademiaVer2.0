import React, { useState, useEffect, useContext } from 'react';
import Topbar from '../../components/Topbar/Topbar';
import Conversation from '../../components/Conversation/Conversation';
import Message from '../../components/Message/Message';
import styles from './Messenger.module.css';
import { UserContext } from '../../components/Context/Context';

const Messenger = ({ httpService }) => {
  const [convPartnerId, setConvPartnerId] = useState('');
  const [convId, setConvId] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useContext(UserContext);

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

  const addMessage = async (e) => {
    e.preventDefault();
    console.log(newMessage);

    try {
      const res = await httpService.fetch(`api/messages`, {
        method: 'POST',
        body: JSON.stringify({
          conversationId: convId,
          senderId: user._id,
          text: newMessage,
        }),
      });

      const data = await res.json();
      setMessages([...messages, data]);
    } catch (error) {
      console.log(error);
    }
  };

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
                {messages?.map((message) => (
                  <Message
                    httpService={httpService}
                    message={message}
                    messages={messages}
                    setMessages={setMessages}
                  />
                ))}
              </div>
            </div>
            <form className={styles.chatBoxBottom} onSubmit={addMessage}>
              <textarea
                className={styles.chatMessageInput}
                placeholder='Write Something...'
                onChange={(e) => setNewMessage(e.target.value)}
              ></textarea>
              <button type='submit' className={styles.chatSubmitButton}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
