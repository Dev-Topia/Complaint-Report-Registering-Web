import axios from "axios";
import Cookies from "js-cookie";

export const getUsers = async () => {
  const token = Cookies.get("token");
  if (token) {
    try {
      const response = await axios.get(
        "https://api.devtopia.one/api/User/get-users",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  }
};

export const updateUser = async (userUpdate) => {
  const token = Cookies.get("token");
  const userId = Cookies.get("userId");
  if (userId) {
    try {
      const response = await axios.put(
        `https://api.devtopia.one/api/User/update-user/${userId}`,
        userUpdate,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  }
};
