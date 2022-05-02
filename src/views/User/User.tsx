import { Box, Button, CircularProgress, Container, Divider, Grid, makeStyles, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Pagination } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getUsersPageable } from "../../shared/network/user.api";
import UserRow from "./UserRow";

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

const User = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [page, setPage] = useState(
    parseInt(
      window.sessionStorage.getItem("UserPageNumber") || JSON.stringify(0)
    )
  );
  
  const listUsersQuery = useQuery(
    ["listUsersQuery", page],
    async () => {
      const { data } = await getUsersPageable(page, 10);
      return data;
    }
  );

  return (
    <Container maxWidth="lg">
      {sessionStorage.getItem("userType") === "ADMIN" &&
        <Box display="flex" justifyContent="flex-end">
          <Box>
            <Button component={Link} to="/user-create">
              <Add
                style={{
                  fontSize: "20px",
                  marginRight: 8,
                }}
              />
              {t("user.create")}
            </Button>
          </Box>
        </Box>
      }
      {listUsersQuery.isFetching ? (
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
          {listUsersQuery.data?.page.content === null ? (
            <Box style={{ marginBottom: "20px" }}>
              <Typography variant="h5" align="center" color="secondary">
                {t("noItem")}
              </Typography>
            </Box>
          ) : (
            <>
              <Box style={{ marginBottom: "20px" }}>
                <Grid container style={{ height: "40px" }}>
                  <Grid item xs={4}>
                    <Typography className={classes.listTitle}>
                      {t("user.formValues.name")}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className={classes.listTitle}>
                      {t("user.formValues.userType")}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider className={classes.divider} />
                {listUsersQuery.data?.page.content.length &&
                  listUsersQuery.data.page.content.map((user) => (
                    <UserRow user={user} />
                  ))}
              </Box>
              {listUsersQuery.data &&
                listUsersQuery?.data?.page.totalPages > 1 && (
                  <Pagination
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "24px 0",
                    }}
                    count={listUsersQuery?.data?.page.totalPages}
                    color="primary"
                    page={listUsersQuery.data.page.number + 1}
                    onChange={(e, page) => {
                      sessionStorage.setItem(
                        "UsersPageNumber",
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
export default User;
