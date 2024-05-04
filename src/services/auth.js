import axios from "axios";

const apiDomain = "http://localhost:5023";

export const signInAccount = async (account) => {
  try {
    const response = await axios.post(
      `${apiDomain}/api/User/sign-in`,
      account,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

export const signUpAccount = async (account) => {
  try {
    const response = await axios.post(
      `${apiDomain}/api/User/sign-up`,
      account,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

export const signOutAccount = async () => {
  try {
    const response = await axios.post(
      `${apiDomain}/api/User/sign-out`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

export const getUserDataFromToken = async () => {
  try {
    const res = await axios.get(`${apiDomain}/api/User/get-user-data`, {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const response = await axios.get(
      `${apiDomain}/api/User/get-user/${userId}`,
      {
        withCredentials: true,
      }
    );
    const data = response.data.data;
    return data;
  } catch (error) {
    console.error(error);
    const data = error.response;
    return data;
  }
};
