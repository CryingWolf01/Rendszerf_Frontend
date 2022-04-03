import { Box, Grid, Tooltip, Typography, IconButton } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Tool } from "../../shared/types";

type Props = {
  tool: Tool;
};

const ToolRow = ({ tool }: Props) => {
  const { t } = useTranslation();
  return (
    <Box style={{ marginBottom: "5px" }}>
      <Grid container style={{ marginTop: "5px" }}>
        <Grid item xs={3} style={{ marginTop: "10px" }}>
          <Typography color="secondary">{tool.name}</Typography>
        </Grid>
        <Grid item xs={3} style={{ marginTop: "10px" }}>
          <Typography color="secondary">{tool.identifier}</Typography>
        </Grid>
        <Grid item xs={5} style={{ marginTop: "10px" }}>
          <Typography color="secondary">{tool.description}</Typography>
        </Grid>
        <Grid item xs={1} style={{ marginTop: "10px" }}>
          <Tooltip title={t("tool.modify").toString()}>
            <IconButton
              size="small"
              color="primary"
              style={{ margin: "0 8px" }}
              component={Link}
              to={`/tool-modify?id=${tool.id}`}
            >
              <Edit />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ToolRow;