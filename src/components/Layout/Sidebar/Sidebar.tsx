import { Drawer } from "@material-ui/core";
import { Book, Build, Group, Home } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { COLORS } from "../../../config/theme";
import SidebarItem from "./SidebarItem";

const SideBar = ()=>{
  const {t} = useTranslation();

  return (
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
          },
        }
      }
    >
      <SidebarItem to="/" text={t("drawer.home")} icon={<Home />} />
      <SidebarItem to="/user" text={t("drawer.user")} icon={<Group />} />
      <SidebarItem to="/tool" text={t("drawer.tool")} icon={<Build />} />
      <SidebarItem to="/education" text={t("drawer.education")} icon={<Book />} />
    </Drawer>
  );
}

export default SideBar;