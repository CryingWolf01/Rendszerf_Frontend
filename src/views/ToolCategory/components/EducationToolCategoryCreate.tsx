import { Container, Box, CircularProgress } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { getEducationList } from "../../../shared/network/education.api";
import { saveEducationToolCategory } from "../../../shared/network/releducationtoolcategory.api";
import { RelEducationToolCategory } from "../../../shared/types";
import EducationToolCategoryForm from "./EducationToolCategoryForm";


const EducationToolCategoryCreate = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const history = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const form = useForm<RelEducationToolCategory>();

  const educationQuery = useQuery(["educationQueryForRelCategory"], async () => {
    const { data } = await getEducationList();
    return data.items;
  });

  const onSubmitCreate = async (values: RelEducationToolCategory) => {
    try {
      await saveEducationToolCategory({
        ...values,
        toolCategory: {
          ...values.toolCategory,
          id: id ? Number.parseInt(id) : values.toolCategory.id
        }
      });
      enqueueSnackbar(
        t("common:notification.create.success", {
          subject: t("relEducationToolCategory.subject"),
        }),
        {
          variant: "success",
        }
      );
      history(-1);
    } catch (e) {
      enqueueSnackbar(
        t("common:notification.create.failure", {
          subject: t("relEducationToolCategory.subject"),
        }),
        { variant: "error" }
      );
    }
  };

  return (
    <Container maxWidth="lg">
      <form onSubmit={form.handleSubmit(onSubmitCreate)}>
        {educationQuery.isFetching ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="300px"
          >
            <CircularProgress />
          </Box>
        ) : (
          <FormProvider {...form}>
            <EducationToolCategoryForm educations={educationQuery.data} />
          </FormProvider>
        )}
      </form>
    </Container>
  );
}

export default EducationToolCategoryCreate;