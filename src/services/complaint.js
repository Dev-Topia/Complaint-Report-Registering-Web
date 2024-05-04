import axios from "axios";
import { storage } from "../firebase.config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const apiDomain = "http://localhost:5023";

export const createComplaint = async (complaint, file) => {
  try {
    const fileUrl = await uploadToFirebase(file);
    complaint.fileUrl = fileUrl;
    const response = await axios.post(
      `${apiDomain}/api/Complaint/register-complaint`,
      complaint,
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

export const uploadToFirebase = async (file) => {
  try {
    const fileRef = ref(storage, `user-file/${Date.now()}-${file.name}`);
    await uploadBytes(fileRef, file);
    const fileUrl = await getDownloadURL(fileRef);
    return fileUrl;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getSingleComplaint = async (id) => {
  try {
    const response = await axios.get(
      `${apiDomain}/api/Complaint/get-single-complaint/${id}`,
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

export const getAllComplaint = async () => {
  try {
    const response = await axios.get(
      `${apiDomain}/api/Complaint/get-all-complaint`,
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

export const getAllComplaintType = async () => {
  try {
    const response = await axios.get(
      `${apiDomain}/api/Complaint/get-complaint-type`,
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

export const deleteComplaintType = async (complaintTypeId) => {
  try {
    const response = await axios.delete(
      `${apiDomain}/api/Complaint/delete-complaint-type/${complaintTypeId}`,
      {
        headers: {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};
