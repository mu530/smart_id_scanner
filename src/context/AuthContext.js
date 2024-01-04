import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { BASE_URL } from "../services/config";
import axios from "axios";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [authTokens, setAuthTokens] = useState(null);
  const [user, setUser] = useState(null);

  const loginUser = async (username, password) => {
    setIsLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/token/`, {
        username,
        password,
      });

      const tokens = response.data;
      const decodedToken = jwt_decode(tokens.access);
      setAuthTokens(tokens);
      setUser(decodedToken);

      await SecureStore.setItemAsync("authToken", JSON.stringify(tokens));
      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error(
          `ያስገቡትን መረጃ ትክክለኛነት ያረጋግጡ \nLogin failed. Please check your credentials.`
        );
      } else if (axios.isAxiosError(error) && error.message === "timeout") {
        throw new Error(
          `እባክዎ የበይነመረብ ግንኙነትዎን ያረጋግጡ እና እንደገና ይሞክሩ \nPlease check your internet connection and try again`
        );
      }
    }
    setIsLoading(false);
  };

  const logoutUser = async () => {
    await SecureStore.deleteItemAsync("authToken");
    setUser(null);
    setAuthTokens(null);
  };

  const isAuth = async () => {
    try {
      let tokens = await SecureStore.getItemAsync("authToken");
      tokens = JSON.parse(tokens);

      const decodedToken = jwt_decode(tokens.access);
      setAuthTokens(tokens);
      setUser(decodedToken);
    } catch (e) {}
  };

  let contaxtData = {
    loginUser,
    user,
    authTokens,
    logoutUser,
  };

  useEffect(() => {
    isAuth();
  }, []);
  return (
    <AuthContext.Provider value={contaxtData}>{children}</AuthContext.Provider>
  );
};
