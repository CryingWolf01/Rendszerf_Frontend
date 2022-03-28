import { Box, Grid, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Tool } from "../../shared/types";

type Props = {
  tool: Tool;
};

const ToolRow = ({tool}: Props)=>{
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
        <Grid item xs={6} style={{ marginTop: "10px" }}>
          <Typography color="secondary">{tool.description}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ToolRow;