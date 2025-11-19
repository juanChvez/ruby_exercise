import {
  createContext,
  useContext,
  useState,
  type JSX,
  type ReactNode,
} from "react";

import { authService } from "../services";
import {
  type User,
  type LoginData,
  type RegisterData,
  type UserResponse,
} from "../types/User";

import { useMutation } from "@apollo/client/react";

/**
 * Describes the value provided by the authentication context.
 */
interface AuthContextType {
  /**
   * The currently authenticated user, or null if not authenticated.
   */
  user: User | null;
  /**
   * The authentication token, or null if not authenticated.
   */
  token: string | null;
  /**
   * Attempts to authenticate the user.
   * @param {LoginData} loginData - The user's login credentials (email and password).
   * @returns {Promise<void>} A promise that resolves when login is complete.
   */
  login: (loginData: LoginData) => Promise<void>;
  /**
   * Attempts to register a new user.
   * @param {RegisterData} registerData - The new user's registration data.
   * @returns {Promise<void>} A promise that resolves when registration is complete.
   */
  register: (registerData: RegisterData) => Promise<void>;
  /**
   * Logs out the currently authenticated user, clearing state and storage.
   */
  logout: () => void;
}

/**
 * Authentication context instance.
 * @type {React.Context<AuthContextType | null>}
 */
const AuthContext: React.Context<AuthContextType | null> =
  createContext<AuthContextType | null>(null);

/**
 * Custom hook to access the authentication context.
 * Throws if used outside of an AuthProvider.
 * @throws {Error} If used outside of an AuthProvider.
 * @returns {AuthContextType} The authentication context value.
 */
export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

/**
 * Provides authentication state and actions to its children.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The components which will receive authentication context.
 * @returns {JSX.Element} The AuthProvider component.
 */
export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const [registerMutation] = useMutation<{ createUser: UserResponse }>(
    authService.REGISTER_MUTATION
  );
  const [loginMutation] = useMutation<{ loginUser: UserResponse }>(
    authService.LOGIN_MUTATION
  );

  /**
   * Logs in a user by submitting credentials to the authService and storing the result.
   * @param {LoginData} loginData - The user's login credentials.
   * @returns {Promise<void>}
   */
  const login = async (loginData: LoginData): Promise<void> => {
    const { data } = await loginMutation({ variables: loginData });
    if (!data || !data.loginUser) {
      throw new Error("Login failed. No response from server.");
    }

    const response = data.loginUser;
    const { token, user, errors } = response;
    if (errors && errors.length > 0) {
      throw new Error(errors.join(", "));
    }

    if (user) {
      const { id, name, email, level } = user;
      const newUser = { id, name, email, level };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      setToken(token || "");
      localStorage.setItem("token", token || "");
    } else {
      throw new Error("User not found.");
    }
  };

  /**
   * Registers a new user with the provided credentials and stores the new session.
   * @param {RegisterData} registerData - The new user's registration information.
   * @returns {Promise<void>}
   */
  const register = async (registerData: RegisterData): Promise<void> => {
    console.log(registerData);
    const { data } = await registerMutation({
      variables: registerData,
    });
    if (!data) throw new Error("No response from server");

    const response = data.createUser;
    const { token, user, errors } = response;
    if (errors && errors.length > 0) {
      throw new Error(errors.join(", "));
    }

    if (user) {
      const { id, name, email, level } = user;
      const newUser = { id, name, email, level };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      setToken(token || "");
      localStorage.setItem("token", token || "");
    }
  };

  /**
   * Logs the user out and clears their session from local storage.
   */
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
