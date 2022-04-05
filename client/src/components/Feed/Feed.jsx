import React, { useEffect, useState } from 'react';
import Post from '../Post/Post.jsx';
import styles from './Feed.module.css';

const Feed = ({ httpService }) => {
  const [datas, setDatas] = useState([]);

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

export default Feed;
