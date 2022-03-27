import React from 'react';
import styles from './Post.module.css';
import { Link } from 'react-router-dom';
import { MoreVert } from '@mui/icons-material';

const Post = (props) => {
  return (
    <div className={styles.post}>
      <div className={styles.postWrapper}>
        <div className={styles.postTop}>
          <div className={styles.postTopLeft}>
            <Link to={`/profile/:username`}>
              <img
                className={styles.postProfileImg}
                src='../images/truyu.jpg'
              />
            </Link>
            <span className={styles.postUsername}>Truyu</span>
            <span className={styles.postDate}>2022년 03월 23일</span>
          </div>
          <div className={styles.postTopRight}>
            <MoreVert />
          </div>
        </div>
        <div className={styles.postCenter}>
          <span className={styles.postText}>Hello, this is First Post</span>
          <img className={styles.postImg} src='../images/post/1.jpg' />
        </div>
        <div className={styles.postBottom}>
          <div className={styles.postBottomLeft}>
            <img className={styles.likeIcon} src='../images/like.png' />
            <img className={styles.likeIcon} src='../images/heart.png' />
            <span className={styles.postLikeCounter}>6 people like it</span>
          </div>
          <div className={styles.postBottomRight}>
            <span className={styles.postCommentText}>3 comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
