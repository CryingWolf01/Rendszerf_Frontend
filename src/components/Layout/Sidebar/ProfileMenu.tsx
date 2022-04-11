import { ListItemIcon, MenuItem, MenuList, Popover, Typography } from "@material-ui/core";
import { AccountBoxOutlined, ExitToAppRounded } from "@material-ui/icons";
import { Dispatch, SetStateAction } from "react";
import { Link, Navigate } from "react-router-dom";
import Login from "../../../views/Login/Login";

type Props = {
  anchorElProfile: HTMLElement | null;
  setAnchorElProfile: Dispatch<SetStateAction<HTMLElement | null>>;
};

const ProfileMenu = ({
  anchorElProfile,
  setAnchorElProfile,
}: Props) => {
  const handleCloseProfileMenu = () => {
    setAnchorElProfile(null);
  };

  async function logout() {
    sessionStorage.setItem("loggedIn", "false");
    sessionStorage.setItem("username", "");
    window.location.reload();
  }

  return (
    <Popover
      anchorEl={anchorElProfile}
      keepMounted
      open={!!anchorElProfile}
      onClose={handleCloseProfileMenu}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <MenuList>
        <MenuItem button onClick={() => logout()}>
          <ListItemIcon>
            <ExitToAppRounded />
          </ListItemIcon>
          <Typography variant="inherit">Kijelentkezés</Typography>
        </MenuItem>
      </MenuList>
    </Popover>
  );
}

export default ProfileMenu;