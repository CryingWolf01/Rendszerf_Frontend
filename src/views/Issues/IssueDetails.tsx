import { Box, Container, Grid, makeStyles, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getIssueById } from "../../shared/network/issue.api";

const useStyles = makeStyles({
  title: {
    fontWeight: "bold",
  },
  data: {
    marginBottom: 24,
  },
  header: {
    fontWeight: "bold",
    fontsize: 28,
    marginBottom: 24,
    borderBottom: "1px solid #c7c7c7",
  },
  listTitle: {
    color: "secondary",
    fontSize: "16px",
    fontWeight: "bold",
  },

  divider: {
    backgroundColor: "#757575",
  },
});

const IssueDetails = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");

  const issueQuery = useQuery(["issueDetailsQuery", id], async () => {
    if (id) {
      const { data } = await getIssueById(Number.parseInt(id));
      return data.item;
    }

    return Promise.reject();
  });

  return (
    <Container maxWidth="lg">
      {issueQuery.isFetching ? (<></>) : (
        <>
          <Grid container justifyContent="center">
            <Grid item xs={6}>
              <Typography className={classes.title}>
                {t("issue.formValues.id")}
              </Typography>
              <Typography className={classes.data}>
                {issueQuery.data?.id || ""}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.title}>
                {t("issue.formValues.title")}
              </Typography>
              <Typography className={classes.data}>
                {issueQuery.data?.title || ""}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.title}>
                {t("issue.formValues.type")}
              </Typography>
              <Typography className={classes.data}>
                {issueQuery.data?.type ? t(`common:issueTypes.${issueQuery.data.type}`) : "-"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.title}>
                {t("issue.formValues.tool")}
              </Typography>
              <Typography className={classes.data}>
                {issueQuery.data?.tool?.name || ""}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.title}>
                {t("issue.formValues.responsibleUser")}
              </Typography>
              <Typography className={classes.data}>
                {issueQuery.data?.responsibleUser?.username || ""}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.title}>
                {t("issue.formValues.estimatedTime")}
              </Typography>
              <Typography className={classes.data}>
                {issueQuery.data?.estimatedTime || ""}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.title}>
                {t("issue.formValues.severity")}
              </Typography>
              <Typography className={classes.data}>
                 {issueQuery.data?.severity ? t(`common:severityTypes.${issueQuery.data?.severity}`) : "-"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.title}>
                {t("issue.formValues.status")}
              </Typography>
              <Typography className={classes.data}>
                {issueQuery.data?.status ? t(`common:issueStatuses.${issueQuery.data?.status}`) : "-"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.title}>
                {t("issue.formValues.description")}
              </Typography>
              <Typography className={classes.data}>
                {issueQuery.data?.description || ""}
              </Typography>
            </Grid>
          </Grid>
          {issueQuery.data?.issueLogs !== null ? (
            <>
              <Box style={{ marginBottom: "20px" }}>
                <Typography variant="h5" align="center" color="secondary">
                  {t("issue.formValues.issueLogs")}
                </Typography>
              </Box>
              {issueQuery.data?.issueLogs?.map((issue) => (
                <Box style={{ marginBottom: "5px" }}>
                  <Grid container style={{ marginTop: "5px" }}>
                    <Grid item xs={12} style={{ marginTop: "10px" }}>
                      <Typography color="secondary">{issue.description}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </>
          ) : (
            <Box style={{ marginBottom: "20px" }}>
              <Typography variant="h5" align="center" color="secondary">
                {t("noItem")}
              </Typography>
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default IssueDetails;