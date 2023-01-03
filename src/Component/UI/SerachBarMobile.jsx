import React from "react";
import styles from "./SerachBarMobile.module.css";
import { useDispatch } from "react-redux";
import { setSearchBarVisibility } from "../../store";

const SerachBarMobile = (props) => {
  const dispatch = useDispatch();
  return <div className={styles.searchBarBackground}>{props.children}
    <div className={styles.remainSpace} onClick = {() => dispatch(setSearchBarVisibility())}></div>
  </div>;
};

export default SerachBarMobile;
