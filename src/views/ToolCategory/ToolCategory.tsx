import { Box, Button, CircularProgress, Container, Divider, Grid, makeStyles, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Pagination } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getToolCategoryPageable } from "../../shared/network/tool_category.api";
import ToolCategoryRow from "./ToolCategoryRow";

const useStyles = makeStyles({
  listTitle: {
    color: "secondary",
    fontSize: "16px",
    fontWeight: "bold",
  },

  divider: {
    backgroundColor: "#757575",
  },
});

const ToolCategory = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [page, setPage] = useState(
    parseInt(
      window.sessionStorage.getItem("ToolCategoryPageNumber") || JSON.stringify(0)
    )
  );
  
  const listToolCategoryQuery = useQuery(
    ["listToolCategoryQuery", page],
    async () => {
      const { data } = await getToolCategoryPageable(page, 10);
      return data;
    }
  );

  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="flex-end">
        <Box>
          <Button component={Link} to="/tool-category-create">
            <Add
              style={{
                fontSize: "20px",
                marginRight: 8,
              }}
            />
            {t("toolCategory.create")}
          </Button>
        </Box>
      </Box>
      {listToolCategoryQuery.isFetching ? (
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
          {listToolCategoryQuery.data?.page.numberOfElements === 0 ? (
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
                    <Typography className={classes.listTitle}>
                      {t("toolCategory.formValues.name")}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography className={classes.listTitle}>
                      {t("toolCategory.formValues.maintenanceInterval")}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography className={classes.listTitle}>
                      {t("toolCategory.formValues.description")}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider className={classes.divider} />
                {listToolCategoryQuery.data?.page.content.length &&
                  listToolCategoryQuery.data.page.content.map((category) => (
                    <ToolCategoryRow category={category} />
                  ))}
              </Box>
              {listToolCategoryQuery.data &&
                listToolCategoryQuery?.data?.page.totalPages > 1 && (
                  <Pagination
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "24px 0",
                    }}
                    count={listToolCategoryQuery?.data?.page.totalPages}
                    color="primary"
                    page={listToolCategoryQuery.data.page.number + 1}
                    onChange={(e, page) => {
                      sessionStorage.setItem(
                        "ToolCategoryPageNumber",
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
};
export default ToolCategory;
