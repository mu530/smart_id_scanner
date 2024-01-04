const BASE_URL = "http://192.168.8.102:8000/api";
import * as SecureStore from "expo-secure-store";

const handleResponse = (response, data) => {
  if (!response.ok) {
    if (response.status === 404 || response.status === 401) {
      // Authentication error
      throw new Error("Authentication failed");
    } else {
      // Other error
      throw new Error(data.message || data.error || "Something went wrong");
    }
  }
  const successMessage = data.message || null;
  return { data, successMessage };
};

const makeRequest = async (url, method, data) => {
  const token = await getToken();

  const controller = new AbortController();
  const signal = controller.signal;

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 3000); // Timeout after 5 seconds

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "token " + token,
      },
      body: data ? JSON.stringify(data) : undefined,
      signal: signal,
    });

    clearTimeout(timeoutId);

    const responseData = await response.json();
    return handleResponse(response, responseData);
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      throw new Error(
        "Request timed out. May be the server is down. Please try again later."
      );
    } else {
      throw error;
    }
  }
};

export const get = async (endpoint, params = {}) => {
  const url = `${BASE_URL}/${endpoint}`;
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );
  return makeRequest(url, "GET");
};

export const post = async (endpoint, data = {}) => {
  const url = `${BASE_URL}/${endpoint}`;
  return makeRequest(url, "POST", data);
};

export const put = async (endpoint, data = {}) => {
  const url = `${BASE_URL}/${endpoint}`;
  return makeRequest(url, "PUT", data);
};

export const del = async (endpoint) => {
  const url = `${BASE_URL}/${endpoint}`;
  return makeRequest(url, "DELETE");
};

const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync("authToken");
    if (token !== null) {
      // Token found, return it
      return token.replace(/"/g, "");
    } else {
      // Token not found
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
