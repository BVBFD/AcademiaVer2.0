import React, { useEffect, useState } from 'react';
import Post from '../Post/Post.jsx';
import styles from './Feed.module.css';

const Feed = ({ username, httpService }) => {
  console.log(username);
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
    const getUserDatas = async () => {
      const res = await httpService.fetch(`api/users/profile/${username}`, {
        method: 'GET',
      });
      const data = await res.json();

      const res2 = await httpService.fetch(`api/posts/profile/${data._id}`, {
        method: 'GET',
      });
      const data2 = await res2.json();
      setUserDatas(data2);
    };

    getUserDatas();
  }, [username]);

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

  return !username ? <HomeFeed /> : <ProfileFeed />;
};

export default Feed;
