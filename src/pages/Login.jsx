import React from "react";
import styles from "../Css/Login.module.css";

const Login = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.youtube}>
          <img
            src="http://pngimg.com/uploads/youtube/youtube_PNG2.png"
            alt="youtube-logo"
            style={{ width: "100px" }}
          />
          <button>Login With google</button>
        </div>
        <p>This Project is made using YOUTUBE DATA API</p>
        <p>@educational purpose only</p>
      </div>
    </div>
  );
};

export default Login;
