import axios from "axios";
import Cookies from "js-cookie";

export const createComplaint = async (complaint) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.post(
      "https://api.devtopia.one/api/Complaint/register-complaint",
      complaint,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

export const getSingleComplaint = async (id) => {
  const token = Cookies.get("token");
  if (token) {
    try {
      const response = await axios.get(
        `https://api.devtopia.one/api/Complaint/get-single-complaint/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const data = response.data;
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
};

export const getAllComplaint = async () => {
  const token = Cookies.get("token");
  if (token) {
    try {
      const response = await axios.get(
        `https://api.devtopia.one/api/Complaint/get-all-complaint`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const data = response.data;
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}