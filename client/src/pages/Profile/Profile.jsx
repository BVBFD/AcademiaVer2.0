import React, { useContext } from 'react';
import styles from './Profile.module.css';
import Topbar from '../../components/Topbar/Topbar.jsx';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import Feed from '../../components/Feed/Feed.jsx';
import Rightbar from '../../components/Rightbar/Rightbar.jsx';
import { UserContext } from '../../components/Context/Context';

const Profile = ({ httpService }) => {
  const { user } = useContext(UserContext);
  console.log(user);

  return (
    <>
      <Topbar />
      <div className={styles.profile}>
        <Sidebar />
        <div className={styles.profileRight}>
          <div className={styles.profileRightTop}>
            <div className={styles.profileCover}>
              <img
                className={styles.profileCoverImg}
                src={
                  !user.coverPic
                    ? '../images/person/noCover.png'
                    : user.coverPic
                }
                crossOrigin='anonymous'
              />
              <img
                className={styles.profileUserImg}
                src={user.profilePic}
                crossOrigin='anonymous'
              />
            </div>
            <div className={styles.profileInfo}>
              <h4 className={styles.profileInfoName}>Lee Seong Eun</h4>
              <span className={styles.profileInfoDesc}>
                Hello My name is Seong Eun Lee
              </span>
            </div>
          </div>
          <div className={styles.profileRightBottom}>
            {!user ? <Feed /> : <Feed user={user} httpService={httpService} />}
            <Rightbar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
