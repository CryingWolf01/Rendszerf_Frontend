import { Button, Drawer } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import { Home } from "@material-ui/icons";

const SideBar = ()=>{
  return <Drawer
  variant="permanent"
    style={{ zIndex: 1 }}
    PaperProps={{
      style: {
        width: 125,
        padding: 8,
        zIndex: 1,
        background: "blue",
        border: "unset",
        overflow: "hidden",
      },
  }
}
>
  <Button
    variant="text"
    component={RouterLink}
    to="/"
    style={{ color: "white", fontSize: 28, borderRadius: 0 }}
  >
    Rendszerfejlesztes
  </Button>
  <SidebarItem to="/home" text={"Kezdőlap"} icon={<Home />} />
</Drawer>;
}

export default SideBar;