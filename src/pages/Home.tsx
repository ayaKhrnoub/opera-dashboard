import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
const Home = () => {
  return Cookies.get("token") ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};

export default Home;
