import { Spacer, Card } from "@nextui-org/react";
import React from "react";
import styles from "../../styles/Triplist.module.css";
import Image from "next/image";

const TripList = () => {
  const trips = [
    {
      category: "Trips",
      country: "Belarus",
      name: "Majestic Belarus",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      img: "http://localhost:3000/turkey.jpg",
    },
    {
      category: "Trips",
      country: "Poland",
      name: "Majestic Poland",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      category: "Trips",
      country: "Iceland",
      name: "Majestic Iceland",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      category: "Trips",
      country: "Latvia",
      name: "Majestic Latvia",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];
  return (
    <>
      <Spacer y={3} />
      <div className={styles.trips_container}>
        <div className={styles.header_div}>
          <h3 className={styles.h3_text}>MOST POPULAR TRIPS</h3>
        </div>
        <h4>
          Book your spot on these best-selling trips – from Costa Rica to
          Southern Italy – before someone else does...
        </h4>
        <div className={styles.cards_container}>
          <div className={styles.cards_gallery}>
            <Card css={{ maxWidth: "350px", margin: "10px" }}>
              <Card.Body css={{ maxWidth: "300px", alignContent: "center" }}>
                <div style={{ width: "fit-content" }}>
                  <Image
                    src={"http://localhost:3001/turkey.jpg"}
                    width={283}
                    height={347}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default TripList;
