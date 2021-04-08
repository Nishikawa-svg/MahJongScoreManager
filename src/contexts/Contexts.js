import AuthProvider from "./AuthContext";

const Providers = (props) => {
  return <AuthProvider>{props.children}</AuthProvider>;
};

export default Providers;
