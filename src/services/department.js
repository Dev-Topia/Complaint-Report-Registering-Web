import axios from "axios";

// const apiDomain = "https://api.devtopia.one";
const apiDomain = "http://localhost:5023";

export const getAllDepartment = async () => {
  try {
    const response = await axios.get(
      `${apiDomain}/api/Department/get-all-department`,
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

export const createDepartment = async (departmentName) => {
  try {
    const response = await axios.post(
      `${apiDomain}/api/Department/create-department`,
        {departmentName: departmentName},
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
    console.error(error.response);
    return error.response;
  }
};

export const editDepartment = async (editDepartment) => {};
