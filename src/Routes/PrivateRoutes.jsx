import Cookies from "js-cookie"; //import cookie
import { Navigate } from "react-router-dom"; //import react router dom

function privateRoutes({ children }) {
  const token = Cookies.get('token'); //token from cookie

  //if token not set
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default privateRoutes;
