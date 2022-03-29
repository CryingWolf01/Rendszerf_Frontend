import { Box, Button, CircularProgress, Container, Divider, Grid, makeStyles, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Pagination } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getToolsPageable } from "../../shared/network/tool.api";
import ToolRow from "./ToolRow";

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

const Tool = ()=>{
  const { t } = useTranslation();
  const classes = useStyles();
  const [page, setPage] = useState(
    parseInt(
      window.sessionStorage.getItem("ToolsPageNumber") || JSON.stringify(0)
    )
  );

  const listToolsQuery = useQuery(
    ["listToolsQuery", page],
    async () => {
      const { data } = await getToolsPageable(page, 10);
      return data;
    }
  );

  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="flex-end">
        <Box>
          <Button component={Link} to="/tool-create">
            <Add
              style={{
                fontSize: "20px",
                marginRight: 8,
              }}
            />
            {t("tool.create")}
          </Button>
        </Box>
      </Box>
      {listToolsQuery.isFetching ? (
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
          {listToolsQuery.data?.page.numberOfElements === 0 ? (
            <Box style={{ marginBottom: "20px" }}>
              <Typography variant="h5" align="center" color="secondary">
                {t("noItem")}
              </Typography>
            </Box>
          ) : (
            <>
              <Box style={{ marginBottom: "20px" }}>
                <Grid container style={{ height: "40px" }}>
                  <Grid item xs={3}>
                    <Typography className={classes.toolListTitle}>
                      {t("tool.formValues.name")}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography className={classes.toolListTitle}>
                      {t("tool.formValues.identifier")}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className={classes.toolListTitle}>
                      {t("tool.formValues.description")}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider className={classes.divider} />
                {listToolsQuery.data?.page.content.length &&
                  listToolsQuery.data.page.content.map((tool) => (
                    <ToolRow tool={tool} />
                  ))}
              </Box>
              {listToolsQuery.data &&
                listToolsQuery?.data?.page.totalPages > 1 && (
                  <Pagination
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "24px 0",
                    }}
                    count={listToolsQuery?.data?.page.totalPages}
                    color="primary"
                    page={listToolsQuery.data.page.number + 1}
                    onChange={(e, page) => {
                      sessionStorage.setItem(
                        "ToolsPageNumber",
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
export default Tool;