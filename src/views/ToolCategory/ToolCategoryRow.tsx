import { Box, Grid, IconButton, Tooltip, Typography } from "@material-ui/core";
import { Assignment, Edit } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
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
        <Grid item xs={4} style={{ marginTop: "10px" }}>
          <Typography color="secondary">{category.description}</Typography>
        </Grid>
        <Grid item container xs={2} style={{ marginTop: "10px" }} justifyContent="flex-end">
          <Tooltip title={t("toolCategory.modify").toString()}>
            <IconButton
              size="small"
              color="primary"
              style={{ margin: "0 8px" }}
              component={Link}
              to={`/tool-category-modify?id=${category.id}`}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("toolCategory.details").toString()}>
            <IconButton
              size="small"
              color="primary"
              style={{ margin: "0 8px" }}
              component={Link}
              to={`/tool-category-details?id=${category.id}`}
            >
              <Assignment />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ToolCategoryRow;