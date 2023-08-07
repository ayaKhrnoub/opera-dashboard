import { useReducer, createContext, ReactNode } from "react";

interface User {
  id?: number;
  username?: string;
}

interface AuthState {
  user: User;
  token: string | undefined;
  loggedIn: boolean;
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

interface AuthContextProps extends AuthState {
  dispatch: React.Dispatch<Action>;
}

const AuthContext = createContext<AuthContextProps>({
  user: {},
  token: "",
  loggedIn: false,
  dispatch: () => null,
});

const initialState: AuthState = {
  user: {},
  token: "",
  loggedIn: false,
};

const reducer = (
  state: AuthState = initialState,
  action: Action
): AuthState => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_TOKEN":
      return { ...state, token: action.payload };
    case "SET_IS_LOGGED_IN":
      return { ...state, loggedIn: action.payload };
    default:
      return state;
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={{ dispatch, ...state }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
