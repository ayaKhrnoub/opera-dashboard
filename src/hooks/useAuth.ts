import { useContext } from "react";
import AuthContext from "../context/AuthContext";

interface User {
  id?: number;
  username?: string;
}

type Action =
  | {
      type: "SET_USER";
      payload: User;
    }
  | {
      type: "SET_TOKEN";
      payload: string | undefined;
    }
  | {
      type: "SET_IS_LOGGED_IN";
      payload: boolean;
    };

interface AuthState {
  user: User;
  token: string | undefined;
  loggedIn: boolean;
}

interface AuthContextProps extends AuthState {
  dispatch: React.Dispatch<Action>;
}

const useAuth = (): AuthContextProps => {
  return useContext(AuthContext);
};

export default useAuth;
