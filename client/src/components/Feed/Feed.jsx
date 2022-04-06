import React, { useEffect, useState } from 'react';
import Post from '../Post/Post.jsx';
import styles from './Feed.module.css';

const Feed = ({ user, httpService }) => {
  const [datas, setDatas] = useState([]);
  const [userDatas, setUserDatas] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      const res = await httpService.fetch(`api/posts`, {
        method: 'GET',
      });

      const datas = await res.json();
      setDatas(datas);
    };

    getPost();
  }, []);

  useEffect(() => {
    const getUserPost = async () => {
      const res = await httpService.fetch(`api/posts/profile/${user._id}`, {
        method: 'GET',
      });

      const userDatas = await res.json();
      setUserDatas(userDatas);
    };

    getUserPost();
  }, [user]);

  console.log(userDatas);

  const HomeFeed = () => {
    return (
      <div className={styles.feed}>
        <div className={styles.feedWrapper}>
          {datas.map((data) => (
            <Post httpService={httpService} data={data} />
          ))}
        </div>
      </div>
    );
  };

  const ProfileFeed = () => {
    return (
      <div className={styles.feed}>
        <div className={styles.feedWrapper}>
          {userDatas.map((data) => (
            <Post httpService={httpService} data={data} />
          ))}
        </div>
      </div>
    );
  };

  return !user ? <HomeFeed /> : <ProfileFeed />;
};

export default Feed;
