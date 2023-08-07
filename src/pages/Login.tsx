import { useEffect } from "react";
import LoginForm from "../containers/LoginForm";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (Cookies.get("token")) navigate("/dashboard");
  }, []);
  return (
    <div
      className="flex justify-center bg-black/80 items-center min-h-screen w-full relative overflow-hidden
                    before:absolute before:top-0 before:left-0 before:bg-primary before:z-0 before:rotate-45 before:-translate-x-1/3 before:-translate-y-1/3 before:w-[300px] sm:before:w-[500px] before:h-[300px] sm:before:h-[500px] before:rounded-[50px] sm:before:rounded-[75px] 
                    after:absolute after:bottom-0 after:right-0 after:bg-primary after:z-0 after:rotate-45 after:translate-x-1/3 after:translate-y-1/3 after:w-[300px] sm:after:w-[500px] after:h-[300px] sm:after:h-[500px] after:rounded-[50px] sm:after:rounded-[75px]
                "
    >
      <div className="px-4 bg-black w-11/12 sm:w-4/5 md:w-2/5 mx-auto sm:px-8 rounded-2xl pb-20 relative z-10">
        <div className="w-full pb-6">
          <h1 className="text-center text-white text-6xl py-4">opera</h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
