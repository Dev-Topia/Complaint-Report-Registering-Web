import axios from "axios";
import { storage } from "../firebase.config";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

// const apiDomain = "https://api.devtopia.one";
const apiDomain = "http://localhost:5023";

export const createComplaint = async (complaint, file) => {
  try {
    const response = await axios.post(
      `${apiDomain}/api/complaint/register-complaint`,
      { ...complaint, fileUrl: "" },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );
    const complaintId = response.data.complaintId;
    const fileUrlToUpload = await uploadToFirebase(file, complaintId);
    await axios.put(
      `${apiDomain}/api/complaint/update-complaint/${complaintId}`,
      { ...complaint, fileUrl: fileUrlToUpload },
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
    return error;
  }
};

export const updateComplaint = async (complaintId, updateComplaint) => {
  try {
    const response = await axios.put(
      `${apiDomain}/api/complaint/update-complaint/${complaintId}`,
      updateComplaint,
      {
        headers: {
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

export const getAllStatus = async () => {
  try {
    const response = await axios.get(
      `${apiDomain}/api/complaint/get-all-status`,
      {
        headers: {
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

export const getSingleComplaint = async (id) => {
  try {
    const response = await axios.get(
      `${apiDomain}/api/complaint/get-single-complaint/${id}`,
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

export const getAllComplaint = async (pageIndex, pageSize) => {
  try {
    const response = await axios.get(
      `${apiDomain}/api/complaint/get-all-complaint?pageIndex=${pageIndex}&pageSize=${pageSize}`,
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

export const getComplaintByDepartment = async (
  departmentId,
  pageIndex,
  pageSize
) => {
  try {
    const response = await axios.get(
      `${apiDomain}/api/complaint/filter-complaint-by-department?departmentId=${departmentId}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
      {
        headers: {
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

export const getAllComplaintType = async () => {
  try {
    const response = await axios.get(
      `${apiDomain}/api/complaint/get-complaint-type`,
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


export const deleteComplaint = async (complaintId, fileUrl) => {
  try {
    await deleteFromFirebase(complaintId, fileUrl);
    const response = await axios.delete(
      `${apiDomain}/api/complaint/delete-complaint/${complaintId}`,
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
      `${apiDomain}/api/complaint/delete-complaint-type/${complaintTypeId}`,
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

export const uploadToFirebase = async (file, complaintId) => {
  try {
    const fileRef = ref(
      storage,
      `user-file/${complaintId}.${file.name.split(".").pop()}`
    );
    await uploadBytes(fileRef, file);
    const fileUrl = await getDownloadURL(fileRef);
    return fileUrl;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// export const updateInFirebase = async (complaintId, oldFileUrl, newfile) => {
//   try {
//     const urlObj = new URL(oldFileUrl);
//     const pathname = urlObj.pathname;
//     const filename = pathname.split("/").pop();
//     const extension = filename.split(".").pop();
//     const filePath = `user-file/${complaintId}.${extension}`;
//     const fileRef = ref(storage, filePath);
//     deleteObject(fileRef);
//     const newFileRef = ref(
//       storage,
//       `user-file/${complaintId}.${newfile.name.split(".").pop()}`
//     );
//     await uploadBytes(newFileRef, newfile);
//     return await getDownloadURL(newFileRef);
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };

export const deleteFromFirebase = async (complaintId, fileUrl) => {
  const urlObj = new URL(fileUrl);
  const pathname = urlObj.pathname;
  const filename = pathname.split("/").pop();
  const extension = filename.split(".").pop();
  const filePath = `user-file/${complaintId}.${extension}`;
  const ImageRef = ref(storage, filePath);
  await deleteObject(ImageRef);
};
