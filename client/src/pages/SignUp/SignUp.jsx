import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignUp.module.css';

const SignUp = ({ httpService }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdCheck, setPwdCheck] = useState('');
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (pwd !== pwdCheck) {
      return window.alert('비밀번호 불일치!');
    }
    try {
      const res = await httpService.fetch('api/users/signup', {
        method: 'POST',
        body: JSON.stringify({
          username,
          email,
          password: pwd,
        }),
      });

      await res.json();
      window.alert('Id 생성 완료!');
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
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
              onChange={(e) => setUsername(e.target.value)}
              required
              className={styles.loginInput}
              type='text'
            />
            <input
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.loginInput}
              type='email'
            />
            <input
              placeholder='Password'
              onChange={(e) => setPwd(e.target.value)}
              required
              className={styles.loginInput}
              type='password'
              minLength='6'
            />
            <input
              placeholder='Password Again'
              onChange={(e) => setPwdCheck(e.target.value)}
              required
              className={styles.loginInput}
              type='password'
            />
            <button className={styles.loginButton} type='submit'>
              Sign Up
            </button>
          </form>

          <button className={styles.loginRegisterButton}>
            Log Into Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
