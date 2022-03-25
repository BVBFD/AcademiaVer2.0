import React, { useState } from 'react';
import styles from './Rightbar.module.css';
import { Add, Remove } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Rightbar = (props) => {
  const [user, setUser] = useState(false);

  const HomeRightbar = () => {
    return (
      <>
        <div className={styles.birthdayContainer}>
          <img className={styles.birthdayImg} src='../images/gift.png' />
          <span className={styles.birthdayText}>
            <b>Pola Foster</b> and <b> 3 other friends </b> have a birthday
            today
          </span>
        </div>
        <img className={styles.rightbarAd} src='../images/ad.jpg' />
        <h4 className={styles.rightbarTitle}>Online Friends</h4>
        <ul className={styles.rightbarFriendList}>
          {/* {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))} */}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <button className={styles.rightbarFollowButton}>
          'Follow' <Add />
        </button>

        <h4 className={styles.rightbarTitle}>User Infomation</h4>
        <div className={styles.rightbarInfo}>
          <div className={styles.rightbarInfoItem}>
            <span className={styles.rightbarInfoKey}>City:</span>
            <span className={styles.rightbarInfoValue}>{user.city}</span>
          </div>

          <div className={styles.rightbarInfoItem}>
            <span className={styles.rightbarInfoKey}>From:</span>
            <span className={styles.rightbarInfoValue}>{user.from}</span>
          </div>

          <div className={styles.rightbarInfoItem}>
            <span className={styles.rightbarInfoKey}>RelationShip:</span>
            <span className={styles.rightbarInfoValue}>Single</span>
          </div>
        </div>
        <h4 className={styles.rightbarTitle}>User Friends</h4>
        <div className={styles.rightbarFollowings}>
          <Link to={`/profile/:username`} style={{ textDecoration: 'none' }}>
            <div className={styles.rightbarFollowing}>
              <img
                src='../images/person/noAvatar.png'
                className={styles.rightbarFollowingImg}
              />
              <span className={styles.rightbarFollowingName}>Truyu</span>
            </div>
          </Link>
        </div>
      </>
    );
  };

  return (
    <div className={styles.rightbar}>
      <div className={styles.rightbarWrapper}>
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
};

export default Rightbar;
