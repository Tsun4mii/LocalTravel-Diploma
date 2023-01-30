import { Input } from "@nextui-org/react";
import React from "react";
import styles from "../../styles/Welcome.module.css";
import { FaMapMarkerAlt } from "react-icons/fa";
const Welcome = () => {
  return (
    <div className={styles.welcome_div}>
      <div className={styles.inner_div}>
        <h1>WE HELP YOU FIND YOUR TRIP</h1>
        <h2>Anywhere and anytime</h2>
        <div className={styles.input_div}>
          <div className={styles.search}>
            <Input contentLeft={<FaMapMarkerAlt />} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
