import { Box, Grid, Typography } from "@material-ui/core";
import { Education } from "../../shared/types";

type Props = {
  education: Education;
};

const EducationRow = ({education}: Props)=>{
  return (
    <Box style={{ marginBottom: "5px" }}>
      <Grid container style={{ marginTop: "5px" }}>
        <Grid item xs={5} style={{ marginTop: "10px" }}>
          <Typography color="secondary">{education.name}</Typography>
        </Grid>
        <Grid item xs={7} style={{ marginTop: "10px" }}>
          <Typography color="secondary">{education.description}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EducationRow;