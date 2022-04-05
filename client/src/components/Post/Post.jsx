import React, { useEffect, useState } from 'react';
import styles from './Post.module.css';
import { Link } from 'react-router-dom';
import { MoreVert } from '@mui/icons-material';

const Post = ({ httpService, data }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const user = await httpService.fetch(`api/users/${data.userId}`, {
        method: 'GET',
      });
      setUser(user);
    };

    getUser();
  }, [data]);

  console.log(data);
  console.log(user.profilePic);

  return (
    <div className={styles.post}>
      <div className={styles.postWrapper}>
        <div className={styles.postTop}>
          <div className={styles.postTopLeft}>
            <Link to={`/profile/${user.username}`}>
              <img className={styles.postProfileImg} src={user.profilePic} />
            </Link>
            <span className={styles.postUsername}>{user.username}</span>
            <span className={styles.postDate}>
              {new Date(data.createdAt).toDateString()}
            </span>
          </div>
          <div className={styles.postTopRight}>
            <MoreVert />
          </div>
        </div>
        <div className={styles.postCenter}>
          <span className={styles.postText}>Hello, this is First Post</span>
          <img className={styles.postImg} src={data.img} />
        </div>
        <div className={styles.postBottom}>
          <div className={styles.postBottomLeft}>
            <img className={styles.likeIcon} src='../images/like.png' />
            <img className={styles.likeIcon} src='../images/heart.png' />
            <span className={styles.postLikeCounter}>
              {data.likes.length} people like it
            </span>
          </div>
          <div className={styles.postBottomRight}>
            <span className={styles.postCommentText}>
              {data.comment?.length} comments
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
