import React from "react";
import Item from "./Item";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import RouteIcon from "@mui/icons-material/Route";
import CategoryIcon from "@mui/icons-material/Category";
import PublicIcon from "@mui/icons-material/Public";

const AdminPanel = ({ selected, setSelected }) => {
  return (
    <>
      <Item
        title="Points"
        to="/points"
        icon={<AddLocationIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Routes"
        to="/routes"
        icon={<RouteIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Categories"
        to="/categories"
        icon={<CategoryIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Countries"
        to="/countries"
        icon={<PublicIcon />}
        selected={selected}
        setSelected={setSelected}
      />
    </>
  );
};

export default AdminPanel;
