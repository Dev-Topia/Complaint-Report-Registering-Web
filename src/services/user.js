import axios from "axios";
import { storage } from "../firebase.config";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

const apiDomain = "https://api.devtopia.one";
// const apiDomain = "http://localhost:5023";

export const getUsers = async () => {
  try {
    const response = await axios.get(`${apiDomain}/api/User/get-users`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

export const updateUser = async (userUpdate) => {
  try {
    if (userUpdate.imageUrl instanceof File) {
      const imageUrl = await uploadToFirebase(
        userUpdate.imageUrl,
        userUpdate.userId
      );
      userUpdate.imageUrl = imageUrl;
    }
    const response = await axios.put(
      `${apiDomain}/api/User/update-user/${userUpdate.userId}`,
      userUpdate,
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

export const uploadToFirebase = async (file, userId) => {
  try {
    const fileRef = ref(storage, `user-profile/${userId}`);
    const fileUrl = await getDownloadURL(fileRef).catch(() => null);
    if (fileUrl) {
      await deleteObject(fileRef);
    }
    await uploadBytes(fileRef, file);
    const newFileUrl = await getDownloadURL(fileRef);
    console.log(newFileUrl);
    return newFileUrl;
  } catch (error) {
    console.error(error);
    return false;
  }
};
