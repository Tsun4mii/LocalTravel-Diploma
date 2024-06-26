import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../utils/theme";
import "react-pro-sidebar/dist/css/styles.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Item from "./Item";
import { useSelector, useDispatch } from "react-redux";
import { destroyAuthCookies } from "../../utils/helpers/cookies.helpers";
import { useNavigate } from "react-router-dom";
import { clearState } from "../../redux/reducers/userSlice";
import { postAuthRequest } from "../../utils/helpers/requests.helpers";
import { ROLES } from "../../utils/roles";
import AcceptorPanel from "./AcceptorPanel";
import CreatorPanel from "./CreatorPanel";
import AdminPanel from "./AdminPanel";

const AdminSidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const navigator = useNavigate();

  const userEmail = useSelector((state) => state.user.email);
  const userRole = useSelector((state) => state.user.role);
  const reduxDispatch = useDispatch();

  const logout = async () => {
    const response = await postAuthRequest("/admin/auth/logout", {});
    if (!response.count) {
      console.log("ERROR");
    }
    destroyAuthCookies();
    reduxDispatch(clearState());
    return navigator("/signin");
  };

  let menus = <></>;
  if (userRole === ROLES.acceptor) {
    menus = <AcceptorPanel selected={selected} setSelected={setSelected} />;
  } else if (userRole === ROLES.creator) {
    menus = <CreatorPanel selected={selected} setSelected={setSelected} />;
  } else {
    menus = <AdminPanel selected={selected} setSelected={setSelected} />;
  }
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  LT ADMIN
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
              ></Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {userEmail}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {userRole}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Главная"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            {menus}
          </Box>
          <Box sx={{ m: 2 }} textAlign="center">
            <Button variant="contained" color="secondary" onClick={logout}>
              <Typography color={colors.primary[500]}>Выйти</Typography>
            </Button>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default AdminSidebar;
