import { Container, Typography, Grid, makeStyles, Box, Divider, Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { Link, useLocation } from "react-router-dom";
import { getEducationToolCategoryList } from "../../shared/network/releducationtoolcategory.api";
import { getToolCategoryById } from "../../shared/network/tool_category.api";
import EducationToolCategoryRow from "./components/EducationToolCategoryRow";

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

const ToolCategoryDetails = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");

  const toolCategoryQuery = useQuery(["toolCategoryDetailsQuery", id], async () => {
    if (id) {
      const { data } = await getToolCategoryById(Number.parseInt(id));
      return data.item;
    }

    return Promise.reject();
  });

  const educationToolCategoriesQuery = useQuery(["educationToolCategoriesQuery"], async () => {
      const { data } = await getEducationToolCategoryList();
      return data.items;
  });

  return (
    <Container maxWidth="lg">
      {toolCategoryQuery.isFetching ? (
        <>
          <Grid container justifyContent="center">
            <Grid item xs={6}>
              <Typography className={classes.title}>
                {t("toolCategory.formValues.name")}
              </Typography>
              <Typography className={classes.data}>
                {toolCategoryQuery.data?.category || ""}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.title}>
                {t("toolCategory.formValues.maintenanceInterval")}
              </Typography>
              <Typography className={classes.data}>
                {toolCategoryQuery.data?.maintenanceInterval || ""}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.title}>
                {t("toolCategory.formValues.description")}
              </Typography>
              <Typography className={classes.data}>
                {toolCategoryQuery.data?.description}
              </Typography>
            </Grid>
          </Grid>
        </>
      ) : (
        <></>
      )}
      <Box display="flex" justifyContent="flex-end">
        <Box>
          <Button component={Link} to={`/education-tool-category-create?id=${id}`}>
            <Add
              style={{
                fontSize: "20px",
                marginRight: 8,
              }}
            />
            {t("relEducationToolCategory.create")}
          </Button>
        </Box>
      </Box>
      {educationToolCategoriesQuery.data?.length === 0 ? (
        <Box style={{ marginBottom: "20px" }}>
          <Typography variant="h5" align="center" color="secondary">
            {t("noItem")}
          </Typography>
        </Box>
      ) : (
        <>
          <Box style={{ marginBottom: "20px" }}>
            <Grid container style={{ height: "40px" }}>
              <Grid item xs={11}>
                <Typography className={classes.listTitle}>
                  {t("relEducationToolCategory.formValues.education")}
                </Typography>
              </Grid>
            </Grid>
            <Divider className={classes.divider} />
            {educationToolCategoriesQuery.data?.length &&
              educationToolCategoriesQuery.data.map((category) => (
                <EducationToolCategoryRow category={category} />
            ))}
          </Box>
        </>
      )}
    </Container>
  )
};

export default ToolCategoryDetails;