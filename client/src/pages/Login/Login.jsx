import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../components/Context/Context';
import styles from './Login.module.css';

const Login = ({ httpService }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);

  const onLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await httpService.fetch(`api/users/login`, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.status !== 200) {
        return window.alert('Login Failed!');
      }

      const data = await res.json();
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      navigate('/');
    } catch (error) {
      console.error(error);
      dispatch({ type: 'LOGIN_FAIL', payload: error });
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <div className={styles.loginLeft}>
          <h3 className={styles.loginLogo}>MrLee Social</h3>
          <span className={styles.loginDesc}>
            Connect with friends and the world around you on MrLee Social
          </span>
        </div>
        <div className={styles.loginRight}>
          <form className={styles.loginBox} onSubmit={onLogin}>
            <input
              type='email'
              placeholder='Email'
              required
              className={styles.loginInput}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              placeholder='Password'
              required
              minLength='6'
              className={styles.loginInput}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className={styles.loginButton} type='submit'>
              Log In
            </button>
            <span className={styles.loginForgot}>Forgot Password</span>
            <button className={styles.loginRegisterButton}>
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
