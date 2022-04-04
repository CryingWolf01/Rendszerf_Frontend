import { Box, Grid, Typography } from "@material-ui/core";
import { RelEducationToolCategory } from "../../../shared/types";

type Props = {
  category: RelEducationToolCategory;
}

const EducationToolCategoryRow = ({category}: Props) => {
  return (
    <Box style={{ marginBottom: "5px" }}>
      <Grid container style={{ marginTop: "5px" }}>
        <Grid item xs={12} style={{ marginTop: "10px" }}>
          <Typography color="secondary">{category.education.name}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EducationToolCategoryRow;