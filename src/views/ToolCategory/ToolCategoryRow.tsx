import { Box, Grid, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { ToolCategory } from "../../shared/types";

type Props = {
  category: ToolCategory;
};

const ToolCategoryRow = ({ category }: Props) => {
  const {t}= useTranslation()
  return (
    <Box style={{ marginBottom: "5px" }}>
      <Grid container style={{ marginTop: "5px" }}>
        <Grid item xs={3} style={{ marginTop: "10px" }}>
          <Typography color="secondary">{category.category}</Typography>
        </Grid>
        <Grid item xs={3} style={{ marginTop: "10px" }}>
          <Typography color="secondary">
            {t(`common:maintenanceInterval.${category.maintenanceInterval}`)}
          </Typography>
        </Grid>
        <Grid item xs={6} style={{ marginTop: "10px" }}>
          <Typography color="secondary">{category.description}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ToolCategoryRow;