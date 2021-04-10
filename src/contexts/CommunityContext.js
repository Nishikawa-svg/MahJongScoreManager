import { useState, createContext, useEffect, useContext } from "react";
import firebase, { db } from "../Firebase";
import { AuthContext } from "./AuthContext";
import { calculateResult } from "../utils/CalculateResult";

const myCommunityId = "aPd6xJZ1EewXHXq3TN4Q";
export const CommunityContext = createContext();

const CommunityProvider = (props) => {
  const [users, setUsers] = useState([]);
  const [rules, setRules] = useState();
  const [history, setHistory] = useState([]);
  const [result, setResult] = useState({});
  const { isAuth } = useContext(AuthContext);
  useEffect(() => {
    let unsubscribeGetUsers = () => {};
    let unsubscribeGetHistory = () => {};
    let unsubscribeGetResult = () => {};
    if (isAuth) {
      console.log("community provider is auth");
      unsubscribeGetUsers = onGetUsers();
      unsubscribeGetHistory = onGetHistory();
      unsubscribeGetResult = onGetResult();
      getRules();
    } else {
      console.log("community provider is not auth");
    }
    return () => {
      unsubscribeGetUsers();
      unsubscribeGetHistory();
      unsubscribeGetResult();
    };
  }, [isAuth]);

  const getUsers = () => {
    console.log("get user");
    db.collection("communities")
      .doc(myCommunityId)
      .collection("users")
      .get()
      .then((docs) => {
        let getUsersList = [];
        docs.forEach((doc) => {
          // console.log(doc.id, " => ", doc.data());
          const userInfo = {
            name: doc.data().name,
            created_at: doc.data().created_at,
            uid: doc.id,
          };
          getUsersList.push(userInfo);
        });
        setUsers(getUsersList);
      })
      .catch((error) => console.log("Error getting documents : users", error));
  };

  const onGetUsers = () => {
    console.log("on get user");
    return db
      .collection("communities")
      .doc(myCommunityId)
      .collection("users")
      .onSnapshot((docs) => {
        let getUserList = [];
        docs.forEach((doc) => {
          const userInfo = {
            name: doc.data().name,
            created_at: doc.data().created_at,
            uid: doc.id,
          };
          getUserList.push(userInfo);
        });
        setUsers(getUserList);
      });
  };

  const onGetHistory = () => {
    console.log("on get history");
    return db
      .collection("communities")
      .doc(myCommunityId)
      .collection("history")
      .onSnapshot((docs) => {
        let getHistoryList = [];
        docs.forEach((doc) => {
          getHistoryList.push(doc.data());
        });
        setHistory(getHistoryList);
      });
  };

  const onGetResult = () => {
    console.log("on get result");
    return db
      .collection("communities")
      .doc(myCommunityId)
      .collection("result")
      .onSnapshot((docs) => {
        console.log("result change");
        let getResultList = {};
        docs.forEach((doc) => {
          //          getResultList.push(doc.data());
          getResultList[doc.id] = doc.data();
        });
        setResult(getResultList);
      });
  };

  const getRules = () => {
    console.log("get rules");
    db.collection("communities")
      .doc(myCommunityId)
      .collection("rules")
      .get()
      .then((docs) => {
        let getRulesList = [];
        docs.forEach((doc) => {
          getRulesList.push(doc.data());
        });
        setRules(getRulesList[0]);
      })
      .catch((error) => console.log("Error getting document : rules", error));
  };

  const addNewUser = (newUser) => {
    console.log(newUser);

    db.collection("communities")
      .doc(myCommunityId)
      .collection("users")
      .add({
        name: newUser.name,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        // getUsers();
        console.log("new user added");
      })
      .catch((error) => console.log("add new user Error : ", error));
  };

  const addGameResult = (gameRecode) => {
    console.log("recodeed");
    console.log(gameRecode);
    const newResult = calculateResult(result, gameRecode);
    console.log("add game result", newResult);

    const updateResult = () => {
      Object.keys(newResult).forEach((key) => {
        db.collection("communities")
          .doc(myCommunityId)
          .collection("result")
          .doc(key)
          .set(newResult[key])
          .then(() => console.log("ok"))
          .catch(() => console.log("no"));
      });
    };

    db.collection("communities")
      .doc(myCommunityId)
      .collection("history")
      .add({
        ...gameRecode,
        game_number: history.length + 1,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        console.log("added new game result");
        updateResult();
      })
      .catch((error) => console.log("Error add to result", error));
  };

  return (
    <CommunityContext.Provider
      value={{
        users: users,
        rules: rules,
        history: history,
        addNewUser: addNewUser,
        addGameResult: addGameResult,
      }}
    >
      {props.children}
    </CommunityContext.Provider>
  );
};

export default CommunityProvider;
