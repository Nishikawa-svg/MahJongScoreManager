import AuthProvider from "./AuthContext";
import CommunityProvider from "./CommunityContext";

const Providers = (props) => {
  return (
    <AuthProvider>
      <CommunityProvider>{props.children}</CommunityProvider>
    </AuthProvider>
  );
};

export default Providers;
