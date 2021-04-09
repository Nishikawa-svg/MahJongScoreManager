import { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../Firebase";

export const AuthContext = createContext();

const AuthProvider = (props) => {
  const history = useHistory();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid, "was log in");
        setIsAuth(true);
        setLoginUser({ uid: user.uid, name: user.displayName });
      } else {
        console.log("not log in");
      }
    });
  }, []);

  const [isAuth, setIsAuth] = useState(false);
  const [loginUser, setLoginUser] = useState({ uid: "", name: "" });

  const login = (email, password) => {
    console.log(email, password);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log("log in success");
        setIsAuth(true);
        history.push("/");
      })
      .catch((error) => console.log("log in error ", error));
  };
  const logout = () => {
    setIsAuth(false);
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("log out success");
      })
      .catch((error) => {
        console.log("log out failed", error);
      });
    history.push("/");
  };

  const signUp = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log("sign up success");
        setIsAuth(true);
        history.push("/");
      })
      .catch((error) => console.log("sign up failed", error));
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth: isAuth,
        setIsAuth: setIsAuth,
        login: login,
        logout: logout,
        signUp: signUp,
        loginUser: loginUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
