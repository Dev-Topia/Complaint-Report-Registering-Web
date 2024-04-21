import axios from "axios";
import Cookies from "js-cookie";
import { storage } from "../firebase.config";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

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

export const uploadToFirebase = async (file) => {
  const userId = Cookies.get("userId");
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
    console.log(error);
    return false;
  }
};

export const updateUser = async (userUpdate) => {
  const token = Cookies.get("token");
  const userId = Cookies.get("userId");
  if (userId) {
    try {
      // const imageUrl = await uploadToFirebase(userUpdate.imageUrl);
      // userUpdate.imageUrl = imageUrl;
      if (userUpdate.imageUrl instanceof File) {
        const imageUrl = await uploadToFirebase(userUpdate.imageUrl);
        userUpdate.imageUrl = imageUrl;
      }
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
