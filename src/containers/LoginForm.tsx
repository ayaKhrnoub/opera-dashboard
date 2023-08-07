import { useState, useCallback } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Loading from "../components/Loading";
import { useAuth, useToast } from "../hooks";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../axios";
import { AxiosError } from "axios";
import Cookies from "js-cookie";

type Response = {
  success: boolean;
  data: string;
  message: string;
};

const LoginForm = () => {
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const { dispatch } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const validate = useCallback(() => {
    const tempErrors = {
      username: "",
      password: "",
    };
    tempErrors.username =
      username === ""
        ? "This field is required"
        : /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(username)
        ? ""
        : "email format is not valid";
    tempErrors.password = password ? "" : "This field is required";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((error) => error === "");
  }, [username, password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const formData = {
          email: username.trim(),
          password: password,
        };
        const { data } = await axiosInstance.post<Response>(
          `/api/admin/auth/login`,
          formData
        );
        Cookies.set("token", data.data, {
          expires: 30,
          path: "/",
        });
        dispatch({ type: "SET_TOKEN", payload: data.data });
        dispatch({ type: "SET_IS_LOGGED_IN", payload: true });
        navigate("/dashboard", { replace: true });
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        if (!err.response) {
          toast(
            "Please check your internet connection",
            "error",
            "bottom-left",
            "dark"
          );
        } else {
          toast(err.response.data?.message, "error", "bottom-left", "dark");
        }
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit} className="w-11/12 mx-auto">
      <Input
        label="email"
        type="text"
        placeholder="username"
        setValue={setUsername}
        error={errors.username}
        value={username}
      />
      <Input
        label="password"
        type="password"
        placeholder="password"
        error={errors.password}
        setValue={setPassword}
        value={password}
      />
      <div className="flex justify-center items-center">
        <Button disabled={loading} type="submit">
          {!loading ? <span>login</span> : <Loading size="lg" />}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
