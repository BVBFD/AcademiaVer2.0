import React, { useContext } from 'react';
import styles from './Topbar.module.css';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { UserContext } from '../Context/Context';

const Topbar = (props) => {
  const { user } = useContext(UserContext);

  return (
    <div className={styles.topbarContainer}>
      <div className={styles.topbarLeft}>
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <span className={styles.logo}>Mr.Lee Social</span>
        </Link>
      </div>

      <div className={styles.topbarCenter}>
        <div className={styles.searchBar}>
          <SearchIcon className={styles.searchIcon} />
          <input
            placeholder='Search for friend, post or video'
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.topbarRight}>
        <div className={styles.topbarLinks}>
          <span className={styles.topbarLink}>Homepage</span>
          <span className={styles.topbarLink}>Timeline</span>
        </div>

        <div className={styles.topbarIcons}>
          <div className={styles.topbarIconItem}>
            <PersonIcon />
            <span className={styles.topbarIconBadge}>1</span>
          </div>

          <div className={styles.topbarIconItem}>
            <ChatIcon />
            <span className={styles.topbarIconBadge}>2</span>
          </div>

          <div className={styles.topbarIconItem}>
            <NotificationsIcon />
            <span className={styles.topbarIconBadge}>1</span>
          </div>
        </div>
        <Link to={`/profile/:username`}>
          <img className={styles.topbarImg} src={user.profilePic} />
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
