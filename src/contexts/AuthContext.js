import { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase, { db } from "../Firebase";

export const AuthContext = createContext();

const AuthProvider = (props) => {
  const history = useHistory();
  useEffect(() => {
    console.log("auth context is mounted");
    let unsubscribeGetAuthUsers = onGetAuthUsers();

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid, "was log in");
        setIsAuth(true);
        setLoginUser({ uid: user.uid, name: user.displayName });
      } else {
        console.log("not log in");
      }
    });

    return () => {
      console.log("auth context is mounted");
      unsubscribeGetAuthUsers();
    };
  }, []);

  const [isAuth, setIsAuth] = useState(false);
  const [loginUser, setLoginUser] = useState({ uid: "", name: "" });
  const [authUsers, setAuthUsers] = useState({});

  const onGetAuthUsers = () => {
    console.log("on get auth users");
    return db.collection("users").onSnapshot((docs) => {
      let getAuthUsersList = {};
      docs.forEach((doc) => {
        getAuthUsersList[doc.id] = doc.data();
      });
      setAuthUsers(getAuthUsersList);
    });
  };

  const login = (email, password) => {
    console.log(email, password);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log("log in success");
        console.log(res.user.uid);
        setIsAuth(true);
        history.push("/");
      })
      .catch((error) => {
        console.log("log in error ", error);
        alert("log in failed");
      });
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

  const signUp = (username, email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log("sign up success");
        db.collection("users")
          .doc(res.user.uid)
          .set({
            uid: res.user.uid,
            name: username,
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => console.log("added userInfo to db"))
          .catch((error) => console.log("failed to add userInfo to db", error));

        firebase
          .auth()
          .currentUser.updateProfile({
            displayName: username,
          })
          .then(() => {
            console.log("username updated");
            setLoginUser({ uid: res.user.uid, name: username });
            history.push("/");
          })
          .catch((error) => console.log("username update failer", error));
        setIsAuth(true);
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
        authUsers: authUsers,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
