import { Box, Button, CircularProgress, Container, Divider, Grid, makeStyles, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Pagination } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getIssuesPageable } from "../../shared/network/issue.api";
import IssueRow from "./IssueRow";

const useStyles = makeStyles({
  toolListTitle: {
    color: "secondary",
    fontSize: "16px",
    fontWeight: "bold",
  },

  divider: {
    backgroundColor: "#757575",
  },
});

const Issues = () => {
   const { t } = useTranslation();
  const classes = useStyles();
  const [page, setPage] = useState(
    parseInt(
      window.sessionStorage.getItem("IssuesPageNumber") || JSON.stringify(0)
    )
  );

  const listIssuessQuery = useQuery(
    ["listIssuesQuery", page],
    async () => {
      const { data } = await getIssuesPageable(page, 10);
      return data;
    }
  );

  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="flex-end">
        <Box>
          <Button component={Link} to="/issue-create">
            <Add
              style={{
                fontSize: "20px",
                marginRight: 8,
              }}
            />
            {t("issue.create")}
          </Button>
        </Box>
      </Box>
      {listIssuessQuery.isFetching ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="300px"
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {listIssuessQuery.data?.page.numberOfElements === 0 ? (
            <Box style={{ marginBottom: "20px" }}>
              <Typography variant="h5" align="center" color="secondary">
                {t("noItem")}
              </Typography>
            </Box>
          ) : (
            <>
              <Box style={{ marginBottom: "20px" }}>
                <Grid container style={{ height: "40px" }}>
                  <Grid item xs={2}>
                    <Typography className={classes.toolListTitle}>
                      {t("issue.formValues.id")}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography className={classes.toolListTitle}>
                      {t("issue.formValues.title")}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography className={classes.toolListTitle}>
                      {t("issue.formValues.severity")}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography className={classes.toolListTitle}>
                      {t("issue.formValues.type")}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider className={classes.divider} />
                {listIssuessQuery.data?.page.content.length &&
                  listIssuessQuery.data.page.content.map((issue) => (
                    <IssueRow issue={issue} />
                  ))}
              </Box>
              {listIssuessQuery.data &&
                listIssuessQuery?.data?.page.totalPages > 1 && (
                  <Pagination
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "24px 0",
                    }}
                    count={listIssuessQuery?.data?.page.totalPages}
                    color="primary"
                    page={listIssuessQuery.data.page.number + 1}
                    onChange={(e, page) => {
                      sessionStorage.setItem(
                        "IssuesPageNumber",
                        JSON.stringify(page - 1)
                      );
                      setPage(page - 1);
                    }}
                  />
                )}
            </>
          )}
        </>
      )}
    </Container>
  );
}

export default Issues;