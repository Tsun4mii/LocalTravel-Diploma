import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layouts/Layout";
import Welcome from "../components/Main/Welcome";
import TripList from "../components/Main/TripList";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>LocalTravel</title>
        <meta name="description" content="LocalTravel" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        <Welcome />
        <TripList />
      </Layout>
    </>
  );
}
