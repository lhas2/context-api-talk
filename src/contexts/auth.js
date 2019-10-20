import React, { createContext, useReducer, useContext, useEffect } from "react";
import _ from "lodash";

const AuthContext = createContext();

const initialState = {
  authenticated: false,
  data: {}
};

const reducer = (state, action) => {
  const actions = {
    loggedIn: () => {
      return { data: action.payload, authenticated: true };
    },
    loggedOut: () => {
      return { data: action.payload, authenticated: false };
    }
  };
  return actions[action.type] ? actions[action.type]() : state;
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const localAuth = JSON.parse(window.localStorage.getItem("auth"));

    if (!localAuth || !localAuth.authenticated) {
      return;
    }

    dispatch({
      type: "loggedIn",
      payload: localAuth.data
    });
  }, []);

  useEffect(() => {
    window.localStorage.setItem("auth", JSON.stringify(state));
  }, [state]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
