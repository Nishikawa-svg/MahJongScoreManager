import { useState, createContext, useEffect, useContext } from "react";
import firebase, { db } from "../Firebase";
import { AuthContext } from "./AuthContext";

const myCommunityId = "aPd6xJZ1EewXHXq3TN4Q";
export const CommunityContext = createContext();

const CommunityProvider = (props) => {
  const [users, setUsers] = useState([]);
  const [rules, setRules] = useState();
  const { isAuth } = useContext(AuthContext);
  useEffect(() => {
    if (isAuth) {
      console.log("community provider is auth");
      getUsers();
      getRules();
    } else {
      console.log("community provider is not auth");
    }
  }, [isAuth]);

  const getUsers = () => {
    console.log("get user");
    db.collection("communities")
      .doc("aPd6xJZ1EewXHXq3TN4Q")
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
        getUsers();
      })
      .catch((error) => console.log("add new user Error : ", error));
  };

  return (
    <CommunityContext.Provider
      value={{
        users: users,
        rules: rules,
        addNewUser: addNewUser,
      }}
    >
      {props.children}
    </CommunityContext.Provider>
  );
};

export default CommunityProvider;
