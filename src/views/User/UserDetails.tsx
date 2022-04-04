import { Box, Button, Container, Divider, Grid, makeStyles, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { Link, useLocation } from "react-router-dom";
import { getEducationUserList } from "../../shared/network/releducationuser.api";
import UserEducationRow from "./components/UserEducationRow";

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

const UserDetails = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");

  const userEducationQuery = useQuery(["userEducationQuery"], async () => {
      const { data } = await getEducationUserList();
      return data.items;
  });

  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="flex-end">
        <Box>
          <Button component={Link} to={`/education-user-create?id=${id}`}>
            <Add
              style={{
                fontSize: "20px",
                marginRight: 8,
              }}
            />
            {t("relEducationUser.create")}
          </Button>
        </Box>
      </Box>
      {userEducationQuery.data?.length === 0 ? (
        <Box style={{ marginBottom: "20px" }}>
          <Typography variant="h5" align="center" color="secondary">
            {t("noItem")}
          </Typography>
        </Box>
      ) : (
        <>
          <Box style={{ marginBottom: "20px" }}>
            <Grid container style={{ height: "40px" }}>
              <Grid item xs={12}>
                <Typography className={classes.listTitle}>
                  {t("relEducationUser.formValues.education")}
                </Typography>
              </Grid>
            </Grid>
            <Divider className={classes.divider} />
            {userEducationQuery.data?.length &&
              userEducationQuery.data.map((user) => (
                <UserEducationRow user={user} />
            ))}
          </Box>
        </>
      )}
    </Container>
  );
};

export default UserDetails;