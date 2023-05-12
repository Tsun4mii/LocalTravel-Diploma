import React from "react";
import Item from "./Item";
import AddLocationIcon from "@mui/icons-material/AddLocation";

const CreatorPanel = ({ selected, setSelected }) => {
  return (
    <>
      <Item
        title="Create Invite"
        to="/invites/create"
        icon={<AddLocationIcon />}
        selected={selected}
        setSelected={setSelected}
      />
    </>
  );
};

export default CreatorPanel;
