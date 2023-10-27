import auth from "../../firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
export const authentication = createAsyncThunk(
  "youtube-clone/authentication",
  async () => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
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
