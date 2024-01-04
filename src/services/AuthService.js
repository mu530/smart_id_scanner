import * as SecureStore from "expo-secure-store";
import { post } from "./api";

class AuthService {
  role = "";
  async signIn(username, password) {
    try {
      const response = await post("auth/", {
        username,
        password,
      });
      const token = response.token;
      const role = response.role;
      await SecureStore.setItemAsync("authToken", JSON.stringify(token));
      await SecureStore.setItemAsync("role", JSON.stringify(role));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async signOut() {
    try {
      await SecureStore.deleteItemAsync("authToken");
      await SecureStore.deleteItemAsync("role");
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async register(username, password, email) {
    try {
      const response = await post("/auth/signup", {
        username,
        password,
        email,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getToken() {
    try {
      const token = await SecureStore.getItemAsync("authToken");
      if (token !== null) {
        // Token found, return it
        return token;
      } else {
        // Token not found
        console.log("not getToken from AithService");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async isAuthenticated() {
    try {
      const token = await SecureStore.getItemAsync("authToken");
      return token !== null;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getRole() {
    try {
      const role = await SecureStore.getItemAsync("role");
      return role !== null ? JSON.parse(role) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export default new AuthService();
