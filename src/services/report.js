import axios from "axios";

// const apiDomain = "https://api.devtopia.one";
const apiDomain = "http://localhost:5023";

export const getDepartmentsReport = async () => {
  try {
    const response = await axios.get(
      `${apiDomain}/api/Report/get-departments-report`,
      {
        headers: {
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.error(error.response);
    return error.response;
  }
};

export const getTotalComplaintByCategory = async () => {
  try {
    const response = await axios.get(
      `${apiDomain}/api/Report/get-categories-total-complaint`,
      {
        headers: {
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.error(error.response);
    return error.response;
  }
};

export const getTotalComplaintByDepartment = async () => {
  try {
    const response = await axios.get(
      `${apiDomain}/api/Report/get-departments-total-complaint`,
      {
        headers: {
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.error(error.response);
    return error.response;
  }
};
