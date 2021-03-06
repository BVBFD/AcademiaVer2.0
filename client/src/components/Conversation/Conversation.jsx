import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { UserContext } from '../Context/Context';
import styles from './Conversation.module.css';

const Conversation = ({ httpService, setConvPartnerId }) => {
  const { user } = useContext(UserContext);
  const [chatFriends, setChatFriends] = useState([]);
  const [chatFriendsObjectList, setChatFriendsObjectList] = useState([]);

  useEffect(() => {
    const getConv = async () => {
      const res = await httpService.fetch(`api/convs/${user._id}`, {
        method: 'GET',
      });

      let data = await res.json();
      let newArray = [];
      data[0].members.forEach((member) => newArray.push(member));
      newArray = newArray.filter((member) => member !== user._id);
      setChatFriends(newArray);
    };

    getConv();
  }, []);

  useEffect(() => {
    const getChatFriendsObject = async () => {
      let objectList = [];
      chatFriends.forEach(async (chatFriend) => {
        const res = await httpService.fetch(`api/users/${chatFriend}`, {
          method: 'GET',
        });

        const data = await res.json();
        objectList.push(data);
        setChatFriendsObjectList(objectList);
      });
    };

    getChatFriendsObject();
  }, [chatFriends]);

  return chatFriendsObjectList.map((friend) => (
    <div
      className={styles.conversation}
      onClick={() => setConvPartnerId(friend._id)}
    >
      <img
        className={styles.conversationImg}
        src={friend.profilePic}
        crossOrigin='anonymous'
      />
      <span className={styles.conversationName}>{friend.username}</span>
    </div>
  ));
};

export default Conversation;
