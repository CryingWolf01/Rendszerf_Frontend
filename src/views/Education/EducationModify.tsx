import EducationForm from "./EducationForm";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Button, CircularProgress, Container } from "@material-ui/core";
import { Education } from "../../shared/types";
import { useQuery } from "react-query";
import { useSnackbar } from "notistack";
import { useNavigate, useLocation } from "react-router-dom";
import { getEducationById, saveEducation } from "../../shared/network/education.api";

const EducationModify = () => {
  const { t } = useTranslation();
  const history = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const form = useForm<Education>();
  const { enqueueSnackbar } = useSnackbar();

  const educationQuery = useQuery(["educationQuery", id], async () => {
    if (id) {
      const { data } = await getEducationById(Number.parseInt(id));
      return data.item;
    }

    return Promise.reject();
  });

  const onSubmitModify = async (values: Education) => {
    try {
      await saveEducation(
        {
          ...educationQuery.data,
          ...values
        }
      );
      enqueueSnackbar(
        t("common:notification.modify.success", {
          subject: t("education.subject"),
        }),
        {
          variant: "success",
        },
      );
      history(-1);
    } catch {
      enqueueSnackbar(
        t("common:notification.modify.failure", {
          subject: t("education.subject"),
        }),
        {
          variant: "error",
        },
      );
    }
  };


  return (
    <>
      <Container maxWidth="sm">
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
            <form onSubmit={form.handleSubmit(onSubmitModify)}>
              <EducationForm />
              <Box display="flex" justifyContent="center" m={2} gridGap={8}>
                <Button color="primary" variant="text" onClick={() => history(-1)}>
                  {t("common:button.cancel")}
                </Button>
                <Button type="submit" color="primary">
                  {t("common:button.save")}
                </Button>
              </Box>
            </form>
          </FormProvider>
        )}
      </Container>
    </>
  );
};

export default EducationModify;