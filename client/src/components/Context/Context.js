import { createContext, useEffect, useReducer } from 'react';
import { Reducer } from './Reducer.js';

const USER_STATE = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isFetching: false,
  error: false,
};

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, USER_STATE);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state.user]);

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch: dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
