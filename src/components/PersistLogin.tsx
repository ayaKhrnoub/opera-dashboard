import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth, useToast } from "../hooks";

const PersistLogin = () => {
  const { dispatch, loggedIn } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    let isMounted = true;
    function verifyUser() {
      if (Cookies.get("token")) {
      } else {
        toast("bbbbb", "error", "bottom-left", "dark");
        navigate("/login");
      }
    }
    verifyUser();

    return () => {
      isMounted = false;
    };
  }, [dispatch, loggedIn, navigate]);
  return <Outlet />;
};

export default PersistLogin;
