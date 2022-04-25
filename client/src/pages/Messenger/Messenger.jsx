import React, { useState, useEffect, useContext, useRef } from 'react';
import Topbar from '../../components/Topbar/Topbar';
import Conversation from '../../components/Conversation/Conversation';
import Message from '../../components/Message/Message';
import styles from './Messenger.module.css';
import { UserContext } from '../../components/Context/Context';
import { io } from 'socket.io-client';

const Messenger = ({ httpService }) => {
  const [convPartnerId, setConvPartnerId] = useState('');
  const [convId, setConvId] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useContext(UserContext);
  const socket = useRef();
  const [socketUserData, setSocketUserData] = useState({});
  const [socketPatnerData, setSocketPatnerData] = useState({});
  const [arrivalMessage, setArrivalMessage] = useState();

  useEffect(() => {
    socket.current = io('ws://localhost:8900');
    socket.current.emit('addUser', user._id);
  }, []);

  useEffect(() => {
    socket.current.on('getUsers', (users) => {
      const socketUser = users.filter((data) => data.userId === user._id);
      setSocketUserData(socketUser);
    });
  }, []);

  useEffect(() => {
    socket.current.on('getMessage', (data) => {
      console.log(data.senderId, user._id);
      if (data.senderId !== user._id) {
        setArrivalMessage(data);
      }
    });
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages([...messages, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    const getConv = async () => {
      const res = await httpService.fetch(`api/convs/${convPartnerId}`, {
        method: 'GET',
      });
      const data = await res.json();
      socket.current.emit('addUser', convPartnerId);
      socket.current.on('getUsers', (users) => {
        const patner = users.filter((data) => data.userId !== user._id);
        setSocketPatnerData(patner);
      });
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
  }, [convId, messages]);

  const addMessage = async (e) => {
    e.preventDefault();

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
      socket.current.emit('sendMessage', {
        receiverId: socketPatnerData.socketId,
        data,
      });
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

        {!convId ? (
          <div className={styles.chatBox}>
            <div className={styles.chatBoxWrapper}>
              <div className={styles.chatBoxTop}>
                <div className={styles.informClickPatner}>
                  <p>Click to Chatting Patner Plz...</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.chatBox}>
            <div className={styles.chatBoxWrapper}>
              <div className={styles.chatBoxTop}>
                <div>
                  {messages.map((message) => (
                    <Message
                      own={message.senderId === user._id}
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
        )}
      </div>
    </>
  );
};

export default Messenger;
