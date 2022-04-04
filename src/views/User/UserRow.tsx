import { Box, Grid, IconButton, Tooltip, Typography } from "@material-ui/core";
import { Assignment, Edit } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { User } from "../../shared/types";

type Props = {
  user: User;
};

const UserRow = ({user}: Props)=>{
  const { t } = useTranslation();
  return (
    <Box style={{ marginBottom: "5px" }}>
      <Grid container style={{ marginTop: "5px" }}>
        <Grid item xs={4} style={{ marginTop: "10px" }}>
          <Typography color="secondary">{user.username}</Typography>
        </Grid>
        <Grid item xs={6} style={{ marginTop: "10px" }}>
          <Typography color="secondary">
            {t(`common:userTypes.${user.userType}`)}
          </Typography>
        </Grid>
        <Grid item container xs={2} style={{ marginTop: "10px" }} justifyContent="flex-end">
          <Tooltip title={t("user.modify").toString()}>
            <IconButton
              size="small"
              color="primary"
              style={{ margin: "0 8px" }}
              component={Link}
              to={`/user-modify?id=${user.id}`}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("user.details").toString()}>
            <IconButton
              size="small"
              color="primary"
              style={{ margin: "0 8px" }}
              component={Link}
              to={`/user-details?id=${user.id}`}
            >
              <Assignment />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserRow;