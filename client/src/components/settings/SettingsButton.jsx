import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { useRef } from "react";
import { useState } from "react";
import {
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Switch,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changeLang } from "../../redux/reducers/userSlice";
import { useTranslation } from "react-i18next";

const SettingsButton = () => {
  const { t, i18n } = useTranslation();
  const lang = useSelector((state) => state.user.lang);
  const reduxDispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleSwitch = (value) => {
    if (value === true) {
      reduxDispatch(changeLang(value));
      i18n.changeLanguage("ru");
    } else {
      reduxDispatch(changeLang(value));
      i18n.changeLanguage("eng");
    }
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  return (
    <>
      <IconButton
        color="secondary"
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <SettingsIcon />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem color="secondary">
                    <Typography>EN</Typography>
                    <Switch
                      checked={lang}
                      onClick={(e) => handleSwitch(!lang)}
                      color="secondary"
                    />
                    <Typography>RU</Typography>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default SettingsButton;
