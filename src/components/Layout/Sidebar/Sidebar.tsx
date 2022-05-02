import { Avatar, Box, Drawer } from "@material-ui/core";
import { Book, Build, Category, Group, Home, Note } from "@material-ui/icons";
import { MouseEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { COLORS } from "../../../config/theme";
import ProfileMenu from "./ProfileMenu";
import SidebarItem from "./SidebarItem";

const SideBar = ()=>{
  const { t } = useTranslation();
  const username = sessionStorage.getItem("username");
  const [anchorElProfile, setAnchorElProfile] = useState<HTMLElement | null>(
    null,
  );

  const handleClickProfile = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElProfile(event.currentTarget);
  };

  const userType = sessionStorage.getItem("userType");

  return (
    <>
      <ProfileMenu
        anchorElProfile={anchorElProfile}
        setAnchorElProfile={setAnchorElProfile}
      />
      <Drawer
        variant="permanent"
          style={{ zIndex: 1 }}
          PaperProps={{
            style: {
              width: 125,
              padding: 8,
              zIndex: 1,
              background: COLORS.blueMinded,
              border: "unset",
              overflow: "hidden",
              justifyContent: "space-between",
            },
          }
        }
      >
        <Box>
          <SidebarItem to="/" text={t("drawer.home")} icon={<Home />} />
          {(userType === "ADMIN" || userType === "OPERATOR") &&
            <SidebarItem to="/user" text={t("drawer.user")} icon={<Group />} />
          } { /*Csak adminnak és operátornak látható */}
          {userType !== "OPERATOR" && userType !== "REPAIRMAN" &&
            <SidebarItem to="/tool" text={t("drawer.tool")} icon={<Build />} />
          } { /*admin és eszköz kezelő láthatja */}
          {userType !== "OPERATOR" && userType !== "REPAIRMAN" && 
            <SidebarItem to="/tool-category" text={t("drawer.tool-category")} icon={<Category />} />
          } { /*admin és eszköz kezelő láthatja */}
          {(userType === "ADMIN" || userType === "OPERATOR") &&
            <SidebarItem to="/education" text={t("drawer.education")} icon={<Book />} />
          } { /*Csak adminnak és operátornak látható */}
          {userType !== "TOOL_MANAGER" &&
            <SidebarItem to="/issue" text={t("drawer.issue")} icon={<Note />} />
          } { /* admin, eszköz kezelő és karbantartó láthatja */}
        </Box>
        <SidebarItem
          onClick={handleClickProfile}
          text={username ? username : ""}
          icon={<Avatar>{username && username[0].toUpperCase()}</Avatar>}
        />
        </Drawer>
      </>
  );
}

export default SideBar;