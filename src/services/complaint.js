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
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
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
      return response;
    } catch (error) {
      return error.response;
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
      return response;
    } catch (error) {
      return error.response;
    }
  }
};

export const getAllComplaintType = async () => {
  const token = Cookies.get("token");
  if (token) {
    try {
      const response = await axios.get(
        `https://api.devtopia.one/api/Complaint/get-complaint-type`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  }
};

export const deleteComplaintType = async (complaintTypeId) => {
  const token = Cookies.get("token");
  if (token) {
    try {
      const response = await axios.delete(
        `https://api.devtopia.one/api/Complaint/delete-complaint-type/${complaintTypeId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  }
};
