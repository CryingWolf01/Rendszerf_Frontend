import { Drawer } from "@material-ui/core";
import { Book, Build, Category, Group, Home } from "@material-ui/icons";
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
      <SidebarItem to="/" text={"Főoldal"} icon={<Home />} />
      <SidebarItem to="/user" text={"Felhasználók"} icon={<Group />} />
      <SidebarItem to="/tool" text={"Eszközök"} icon={<Build />} />
      <SidebarItem to="/tool-category" text={"Eszköz kategóriák"} icon={<Category />} />
      <SidebarItem to="/education" text={"Oktatás"} icon={<Book />} />
    </Drawer>
  );
}

export default SideBar;