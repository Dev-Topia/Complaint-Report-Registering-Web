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
