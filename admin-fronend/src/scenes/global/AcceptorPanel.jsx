import React from "react";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import Item from "./Item";

const AcceptorPanel = ({ selected, setSelected }) => {
  return (
    <>
      <Item
        title="Invites"
        to="/invites"
        icon={<ContactMailIcon />}
        selected={selected}
        setSelected={setSelected}
      />
    </>
  );
};

export default AcceptorPanel;
