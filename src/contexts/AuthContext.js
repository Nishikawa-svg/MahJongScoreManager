import { createContext, useState } from "react";
import { useHistory } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = (props) => {
  const history = useHistory();
  // useEffect(() => {
  //   console.log("AuthContext was mounted");
  //   const storagedId = localStorage.getItem("mrm_auth_id");

  //   if (storagedId) {
  //     setIsAuth(true);
  //   }
  //   return () => {
  //     console.log("AuthContext was unmounted");
  //   };
  // }, []);
  const auth = () => {
    const storagetId = localStorage.getItem("mrm_auth_id");
    if (storagetId) return true;
  };

  const [isAuth, setIsAuth] = useState(auth());

  const login = (communityId, password) => {
    // console.log(communityId, password);
    if (communityId === "E11" && password === "jong") {
      localStorage.setItem("mrm_auth_id", communityId);
      setIsAuth(true);
      history.push("/");
    } else {
      alert("failed to login");
    }
  };
  const logout = () => {
    localStorage.removeItem("mrm_auth_id");
    setIsAuth(false);
    history.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth: isAuth,
        setIsAuth: setIsAuth,
        login: login,
        logout: logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
