import React from "react";
import Layout from "../components/Layouts/Layout";
import SingInForm from "../components/Main/Authorization/SingInForm";
import styles from "../styles/auth/Signin.module.css";
const Signin = () => {
  return (
    <>
      <Layout>
        <SingInForm />
      </Layout>
    </>
  );
};

export default Signin;
