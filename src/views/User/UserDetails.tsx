import { Container, Typography, Grid, makeStyles, Box, Divider } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getEducationToolCategoryList } from "../../shared/network/releducationtoolcategory.api";
import { getEducationUserList } from "../../shared/network/releducationuser.api";
import { getToolCategoryById } from "../../shared/network/tool_category.api";
import UserEducationRow from "./UserEducationRow";

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
                  {t("relEducationToolCategory.formValues.education")}
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