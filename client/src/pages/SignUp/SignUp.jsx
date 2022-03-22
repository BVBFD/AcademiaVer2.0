import React from 'react';
import styles from './SignUp.module.css';

const SignUp = (props) => {
  const handleClick = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <div className={styles.loginLeft}>
          <h3 className={styles.loginLogo}>Mr.Lee Social</h3>
          <span className={styles.loginDesc}>
            Connect with friends and The World around you on Mr.Lee Social
          </span>
        </div>
        <div className={styles.loginRight}>
          <form className={styles.loginBox} onSubmit={handleClick}>
            <input
              placeholder='Username'
              required
              className={styles.loginInput}
              type='text'
            />
            <input
              placeholder='Email'
              required
              className={styles.loginInput}
              type='email'
            />
            <input
              placeholder='Password'
              required
              className={styles.loginInput}
              type='password'
              minLength='6'
            />
            <input
              placeholder='Password Again'
              required
              className={styles.loginInput}
              type='password'
            />
            <button className={styles.loginButton} type='submit'>
              Sign Up
            </button>
            <button className={styles.loginRegisterButton}>
              Log Into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
