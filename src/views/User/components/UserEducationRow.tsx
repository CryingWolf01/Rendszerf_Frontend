import { Box, Grid, Typography } from "@material-ui/core";
import { RelEducationUser } from "../../../shared/types";

type Props = {
  user: RelEducationUser;
}

const UserEducationRow = ({user}: Props) => {
  return (
    <Box style={{ marginBottom: "5px" }}>
      <Grid container style={{ marginTop: "5px" }}>
        <Grid item xs={12} style={{ marginTop: "10px" }}>
          <Typography color="secondary">{user?.education?.name}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserEducationRow;