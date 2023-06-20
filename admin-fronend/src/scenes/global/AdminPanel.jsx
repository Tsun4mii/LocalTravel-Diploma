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
        title="Точки"
        to="/points"
        icon={<AddLocationIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Маршруты"
        to="/routes"
        icon={<RouteIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Категории"
        to="/categories"
        icon={<CategoryIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Страны"
        to="/countries"
        icon={<PublicIcon />}
        selected={selected}
        setSelected={setSelected}
      />
    </>
  );
};

export default AdminPanel;
