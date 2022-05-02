import { Box, Grid, Tooltip, Typography, IconButton } from "@material-ui/core";
import { Assignment, Edit, ListAlt } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Issue } from "../../shared/types";

type Props = {
  issue: Issue;
}

const IssueRow = ({issue}: Props) => {
  const { t } = useTranslation();
  return (
    <Box style={{ marginBottom: "5px" }}>
      <Grid container style={{ marginTop: "5px" }}>
        <Grid item xs={2} style={{ marginTop: "10px" }}>
          <Typography color="secondary">{issue.id}</Typography>
        </Grid>
        <Grid item xs={3} style={{ marginTop: "10px" }}>
          <Typography color="secondary">{issue.title}</Typography>
        </Grid>
        <Grid item xs={2} style={{ marginTop: "10px" }}>
          <Typography color="secondary">
            {issue.severity ? t(`common:severityTypes.${issue.severity}`) : "-"}
          </Typography>
        </Grid>
        <Grid item xs={3} style={{ marginTop: "10px" }}>
          <Typography color="secondary">
            {issue.type ? t(`common:issueTypes.${issue.type}`) : "-"}
          </Typography>
        </Grid>
        <Grid item container xs={2} style={{ marginTop: "10px" }} justifyContent="flex-end">
          <Tooltip title={t("issue.modify").toString()}>
            <IconButton
              size="small"
              color="primary"
              style={{ margin: "0 8px" }}
              component={Link}
              to={`/issue-modify?id=${issue.id}`}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("issue.details").toString()}>
            <IconButton
              size="small"
              color="primary"
              style={{ margin: "0 8px" }}
              component={Link}
              to={`/issue-details?id=${issue.id}`}
            >
              <Assignment />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("issue.statusModify").toString()}>
            <IconButton
              size="small"
              color="primary"
              style={{ margin: "0 8px" }}
              component={Link}
              to={`/issue-status-modify?id=${issue.id}`}
            >
              <ListAlt />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
};

export default IssueRow;