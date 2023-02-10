import { Card, Text } from "@nextui-org/react";
import React from "react";
import styles from "../../../styles/auth/Signin.module.css";

const SingInForm = () => {
  return (
    <>
      <Card className={styles.card_body}>
        <Card.Body>
          <Text size={60}>Local Travel</Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default SingInForm;
