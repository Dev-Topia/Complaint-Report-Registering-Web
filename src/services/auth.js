import axios from "axios";
import Cookies from "js-cookie";

export const signInAccount = async (account) => {
  try {
    const response = await axios.post(
      "http://localhost:5023/api/Account/sign-in",
      account
    );
    const data = response.data;
    console.log(data.message);
    const token = response.data.token;
    const role = response.data.role;
    const userId = response.data.userId;
    Cookies.set("token", token);
    Cookies.set("role", role);
    Cookies.set("userId", userId);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const signUpAccount = async (account) => {
  console.log(account);
  try {
    const response = await axios.post(
      "http://localhost:5023/api/Account/sign-up",
      account
    );
    const data = response.data;
    console.log(data.message);
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const signOutAccount = async () => {
  const token = Cookies.get("token");
  if (token) {
    try {
      const response = await axios.post(
        "http://localhost:5023/api/Account/sign-out",
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const data = response.data;
      console.log(data.message);
      Cookies.remove("token");
      Cookies.remove("role");
      Cookies.remove("userId");
      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
};

export const getUserProfile = async () => {
  const token = Cookies.get("token");
  const userId = Cookies.get("userId");
  if (userId) {
    try {
      const response = await axios.get(
        `http://localhost:5023/api/Account/get-user-profile/${userId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
};
