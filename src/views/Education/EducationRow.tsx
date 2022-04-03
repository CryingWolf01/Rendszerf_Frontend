import { Box, Grid, IconButton, Tooltip, Typography } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Education } from "../../shared/types";

type Props = {
  education: Education;
};

const EducationRow = ({ education }: Props) => {
  const { t } = useTranslation();
  return (
    <Box style={{ marginBottom: "5px" }}>
      <Grid container style={{ marginTop: "5px" }}>
        <Grid item xs={5} style={{ marginTop: "10px" }}>
          <Typography color="secondary">{education.name}</Typography>
        </Grid>
        <Grid item xs={6} style={{ marginTop: "10px" }}>
          <Typography color="secondary">{education.description}</Typography>
        </Grid>
        <Grid item xs={1} style={{ marginTop: "10px" }}>
          <Tooltip title={t("education.modify").toString()}>
            <IconButton
              size="small"
              color="primary"
              style={{ margin: "0 8px" }}
              component={Link}
              to={`/education-modify?id=${education.id}`}
            >
              <Edit />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EducationRow;