import {
  Box,
  Tooltip,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {useLocation } from "react-router-dom";
import { NavLink } from "../../Router";

export type SidebarItemProps = {
  to: string;
  text: string;
  icon?: React.ReactNode;
  className?: string;
  exact?: boolean;
  onClick?: () => void;
};

const SideBarItem = ({ to, icon, text, exact, onClick }: SidebarItemProps)=>{
  const location = useLocation();
  const temp = location.pathname === "/" ? "/home" : location.pathname;

  return (
    <Tooltip title={text}>
      <ListItem
        to={to}
        component={NavLink}
        button
        exact={exact}
        onClick={onClick}
        selected={location.pathname === to}
        style={
          temp === to
            ? {
                backgroundColor: "white",
                color: "blue",
                borderRadius: "20px 0 0 20px",
                marginLeft: "8px",
              }
            : {
                color: "white",
              }
        }
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          <ListItemIcon
            style={{
              color: temp === to ? "blue" : "white",
              minWidth: "unset",
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText
            primary={text}
            style={{ marginBottom: 0 }}
            primaryTypographyProps={{
              style: { fontSize: 12, textAlign: "center" },
            }}
          />
        </Box>
      </ListItem>
    </Tooltip>
  );
}

export default SideBarItem;