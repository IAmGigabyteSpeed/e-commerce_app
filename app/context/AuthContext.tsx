import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import { Alert } from "react-native";

interface JWTInfo {
  id: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}

interface AuthProps {
  authState?: { token: string | null };
  onRegister?: (name: string, email: string, password: string) => Promise<any>;
  onLogin?: (name: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
  userInfo?: JWTInfo | null;
}

const JWT_Token = "jwt-key";
export const API_URL = "http://10.0.2.2:5000";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{ token: string | null }>({
    token: null,
  });
  const [userInfo, setUserInfo] = useState<JWTInfo | null>(null);

  const isTokenExpired = (token: string): boolean => {
    try {
      const decoded: JWTInfo = jwtDecode<JWTInfo>(token);
      return Date.now() >= decoded.exp * 1000;
    } catch (error) {
      console.error("Invalid token", error);
      return true;
    }
  };

  const getUserInfo = async () => {
    try {
      const token: string | null = await SecureStore.getItemAsync(JWT_Token);
      if (!token) {
        setUserInfo(null);
        return;
      }

      const decoded: JWTInfo = jwtDecode<JWTInfo>(token);
      if (isTokenExpired(token)) {
        await logout();
        setUserInfo(null);
        return;
      }

      setUserInfo(decoded);
    } catch (error) {
      console.error("Invalid token", error);
      setUserInfo(null);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
      });
      return result;
    } catch (e) {
      return { error: true, msg: (e as any).response };
    }
  };

  const login = async (name: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/login`, { name, password });
      setAuthState({ token: result.data.token });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;
      await SecureStore.setItemAsync(JWT_Token, result.data.token);
      await getUserInfo();
      return result;
    } catch (e: any) {
      console.log(e.response?.data || e.message);
      return { error: true, msg: e.response?.data || e.message };
    }
  };

  const logout = async () => {
    axios.defaults.headers.common["Authorization"] = ``;
    await SecureStore.deleteItemAsync(JWT_Token);
    setAuthState({ token: null });
    setUserInfo(null);
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
    userInfo,
  };

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(JWT_Token);
      console.log(token);
      if (token) {
        if (isTokenExpired(token)) {
          Alert.alert("Token expired, logging out...");
          return logout();
        }
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAuthState({ token: token });
        await getUserInfo();
      }
    };
    loadToken();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
