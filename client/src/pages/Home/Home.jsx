import React from 'react';
import styles from './Home.module.css';
import Topbar from '../../components/Topbar/Topbar.jsx';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import Feed from '../../components/Feed/Feed.jsx';
import Rightbar from '../../components/Rightbar/Rightbar.jsx';

const Home = ({ httpService }) => {
  return (
    <>
      <Topbar />
      <div className={styles.homeContainer}>
        <Sidebar />
        <Feed httpService={httpService} />
        <Rightbar />
      </div>
    </>
  );
};

export default Home;
