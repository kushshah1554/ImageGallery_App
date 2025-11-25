import  { useContext } from "react";
import { Navigate} from "react-router-dom";
import { TokenContext } from "../TokenProvider";

const ProtectedRoute = ({ children, isLoginOrSignup }) => {
  const { token } = useContext(TokenContext);
  

  //  Login or Signup page
  if (isLoginOrSignup) {
    return token ? <Navigate to="/" /> : children;  
  }

  //  Protected page
  return token ? children :<Navigate to="/login" />;
};

export default ProtectedRoute;
