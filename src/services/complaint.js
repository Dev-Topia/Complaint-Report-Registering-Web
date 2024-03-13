import axios from "axios";

export const createComplaint = async (complaint) => {
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
