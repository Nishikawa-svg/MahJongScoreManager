import { useState, createContext, useEffect, useContext } from "react";
import firebase, { db } from "../Firebase";
import { AuthContext } from "./AuthContext";
import { calculateResult } from "../utils/CalculateResult";
import { rearrangeRanking } from "../utils/RearrangeRanking";
import { calculatePrivateHistory } from "../utils/CalculatePrivateHistory";

const myCommunityId = "aPd6xJZ1EewXHXq3TN4Q";
export const CommunityContext = createContext();

const CommunityProvider = (props) => {
  const [users, setUsers] = useState({});
  const [rules, setRules] = useState({});
  const [aboutCommunity, setAboutCommunity] = useState({});
  const [history, setHistory] = useState([]);
  const [result, setResult] = useState({});
  const [rankings, setRankings] = useState({});
  const [privateHistory, setPrivateHistory] = useState({});
  const { isAuth } = useContext(AuthContext);

  useEffect(() => {
    setRankings(rearrangeRanking(result));
  }, [result]);

  useEffect(() => {
    let unsubscribeGetAboutCommunity = () => {};
    let unsubscribeGetUsers = () => {};
    let unsubscribeGetHistory = () => {};
    let unsubscribeGetResult = () => {};
    let unsubscribeGetPrivateHistory = () => {};
    if (isAuth) {
      console.log("community provider is auth");
      unsubscribeGetAboutCommunity = onGetAboutCommunity();
      unsubscribeGetUsers = onGetUsers();
      unsubscribeGetHistory = onGetHistory();
      unsubscribeGetResult = onGetResult();
      unsubscribeGetPrivateHistory = onGetPrivateHistory();
      getRules();
    } else {
      console.log("community provider is not auth");
    }
    return () => {
      unsubscribeGetAboutCommunity();
      unsubscribeGetUsers();
      unsubscribeGetHistory();
      unsubscribeGetResult();
      unsubscribeGetPrivateHistory();
    };
  }, [isAuth]);

  const onGetAboutCommunity = () => {
    console.log("on get community");
    return db
      .collection("communities")
      .doc(myCommunityId)
      .collection("about")
      .onSnapshot((docs) => {
        let getAboutCommunity = [];
        docs.forEach((doc) => {
          getAboutCommunity.push(doc.data());
        });
        setAboutCommunity(getAboutCommunity[0]);
      });
  };

  const onGetUsers = () => {
    console.log("on get user");
    return db
      .collection("communities")
      .doc(myCommunityId)
      .collection("users")
      .onSnapshot((docs) => {
        docs.docChanges().forEach((change) => {
          if (change.type === "added") {
            console.log("on Get User => Added", change.doc.data());
          }
          if (change.type === "modified") {
            console.log("on Get User => Modified", change.doc.data());
          }
          if (change.type === "removed") {
            console.log("on Get User => Removed", change.doc.data());
          }
        });
        let getUserList = {};
        docs.forEach((doc) => {
          getUserList[doc.id] = doc.data();
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
      .orderBy("game_number")
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
          getResultList[doc.id] = doc.data();
        });
        setResult(getResultList);
      });
  };

  const onGetPrivateHistory = () => {
    console.log("on get private result");
    return db
      .collection("communities")
      .doc(myCommunityId)
      .collection("private_history")
      .onSnapshot((docs) => {
        console.log("private result change");
        let getPrivateHitosryList = {};
        docs.forEach((doc) => {
          getPrivateHitosryList[doc.id] = doc.data();
        });
        setPrivateHistory(getPrivateHitosryList);
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

  const addNewUser = (newUser, selectedAvatar) => {
    db.collection("communities")
      .doc(myCommunityId)
      .collection("users")
      .add({
        name: newUser,
        color: selectedAvatar,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        console.log("new user added");
      })
      .catch((error) => console.log("add new user Error : ", error));
  };

  const addGameResult = (gameRecode) => {
    const newResult = calculateResult(result, gameRecode);

    const updateResult = () => {
      Object.keys(newResult).forEach((key) => {
        db.collection("communities")
          .doc(myCommunityId)
          .collection("result")
          .doc(key)
          .set(newResult[key])
          .then(() => console.log("result updated"))
          .catch((error) => console.log("Error add to result", error));
      });
    };

    const updatePrivateHistory = (game_id) => {
      const newPrivateHistory = calculatePrivateHistory(
        privateHistory,
        gameRecode,
        game_id
      );

      Object.keys(newPrivateHistory).forEach((key) => {
        db.collection("communities")
          .doc(myCommunityId)
          .collection("private_history")
          .doc(key)
          .set(newPrivateHistory[key])
          .then(() => console.log("private history updated "))
          .catch((error) => console.log("Error add to private history", error));
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
      .then((docRef) => {
        console.log("added new game result");
        updatePrivateHistory(docRef.id);
        updateResult();
      })
      .catch((error) => console.log("Error add to result", error));
  };

  const updateAboutCommunity = (newCommunityName, newOriginalRulesText) => {
    db.collection("communities")
      .doc(myCommunityId)
      .collection("about")
      .doc(aboutCommunity.doc_id)
      .set({
        community_name: newCommunityName,
        original_rules_text: newOriginalRulesText,
        created_at: aboutCommunity.created_at,
        doc_id: aboutCommunity.doc_id,
      })
      .then(() => console.log("about community updated"))
      .catch((error) => console.log("Error update about community ", error));
  };

  return (
    <CommunityContext.Provider
      value={{
        aboutCommunity: aboutCommunity,
        users: users,
        rules: rules,
        history: history,
        result: result,
        rankings: rankings,
        privateHistory: privateHistory,
        addNewUser: addNewUser,
        addGameResult: addGameResult,
        updateAboutCommunity: updateAboutCommunity,
      }}
    >
      {props.children}
    </CommunityContext.Provider>
  );
};

export default CommunityProvider;
