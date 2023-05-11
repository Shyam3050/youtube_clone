import firebase from "firebase/compat/app";
import auth from "../../firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const authentication = createAsyncThunk(
  "youtube-clone/authentication",
  async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const res = await auth.signInWithPopup(provider);
      const accessToken = res.credential.accessToken;
      const profile = {
        name: res.additionalUserInfo.profile.name,
        profilePictureUrl: res.additionalUserInfo.profile.picture,
      };
      
      return {
        accessToken: accessToken,
        user: profile,
      };
    } catch (error) {
      
      console.log(error);
    }
  }
);
