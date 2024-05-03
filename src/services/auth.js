import axios from "axios";
import Cookies from "js-cookie";

export const signInAccount = async (account) => {
  try {
    const response = await axios.post(
      "http://localhost:5023/api/User/sign-in",
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
    const data = error.response;
    return data;
  }
};

export const signUpAccount = async (account) => {
  try {
    const response = await axios.post(
      "https://api.devtopia.one/api/User/sign-up",
      account
    );
    return response;
  } catch (error) {
    const data = error.response;
    return data;
  }
};

export const signOutAccount = async () => {
  const token = Cookies.get("token");
  if (token) {
    try {
      const response = await axios.post(
        "https://api.devtopia.one/api/User/sign-out",
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      Cookies.remove("token");
      Cookies.remove("role");
      Cookies.remove("userId");
      return response;
    } catch (error) {
      const data = error.response;
      return data;
    }
  }
};

export const getUserDataFromToken = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5023/api/User/get-user-data",
      {
        withCredentials: true,
      }
    );
    return res;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

// export const getUserProfile = async () => {
//   const token = Cookies.get("token");
//   const userId = Cookies.get("userId");
//   if (userId) {
//     try {
//       const response = await axios.get(
//         `https://api.devtopia.one/api/User/get-user/${userId}`,
//         {
//           withCredentials: true,
//         }
//       );
//       const data = response.data.data;
//       return data;
//     } catch (error) {
//       const data = error.response;
//       return data;
//     }
//   }
// };
