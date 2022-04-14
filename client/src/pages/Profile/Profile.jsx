import React, { useEffect, useState } from 'react';
import styles from './Profile.module.css';
import Topbar from '../../components/Topbar/Topbar.jsx';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import Feed from '../../components/Feed/Feed.jsx';
import Rightbar from '../../components/Rightbar/Rightbar.jsx';
import { useParams } from 'react-router-dom';

const Profile = ({ httpService }) => {
  const username = useParams().username;
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const res = await httpService.fetch(`api/users/profile/${username}`, {
        method: 'GET',
      });
      const data = await res.json();

      setUser(data);
    };

    getUser();
  }, []);

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
              <h4 className={styles.profileInfoName}>{user.username}</h4>
              <span className={styles.profileInfoDesc}>{user?.desc}</span>
            </div>
          </div>
          <div className={styles.profileRightBottom}>
            <Feed httpService={httpService} username={username} />
            <Rightbar />
            {/* props 넘길때 주의 사항!! */}
            {/* 초기값이 null이거나 undefined 일 경우 그 값 그대로 넘어가 렌더링 되기 때문에 */}
            {/* 가급적 초기값이 확실한것을 props로 넘겨서 초기부터 렌더링 되게 하자!! */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
