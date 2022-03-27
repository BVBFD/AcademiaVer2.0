import React from 'react';
import Post from '../Post/Post.jsx';
import styles from './Feed.module.css';

const Feed = (props) => {
  return (
    <div className={styles.feed}>
      <div className={styles.feedWrapper}>
        <Post />
      </div>
    </div>
  );
};

export default Feed;
