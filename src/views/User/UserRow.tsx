import { Box, Grid, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { User } from "../../shared/types";

type Props = {
  user: User;
};

const UserRow = ({user}: Props)=>{
  const { t } = useTranslation();
  return (
    <Box style={{ marginBottom: "5px" }}>
      <Grid container style={{ marginTop: "5px" }}>
        <Grid item xs={6} style={{ marginTop: "10px" }}>
          <Typography color="secondary">{user.username}</Typography>
        </Grid>
        <Grid item xs={6} style={{ marginTop: "10px" }}>
          <Typography color="secondary">
            {t(`common:userTypes.${user.userType}`)}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserRow;