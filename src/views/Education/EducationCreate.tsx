import EducationForm from "./EducationForm";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Button, Container } from "@material-ui/core";
import { Education } from "../../shared/types";
import { useMutation } from "react-query";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { saveEducation } from "../../shared/network/education.api";

const EducationCreate = () => {
  const { t } = useTranslation();
  const history = useNavigate();
  const form = useForm<Education>();
  const { enqueueSnackbar } = useSnackbar();

  const mutation = useMutation<any, any, Education>(
    async (values) => {
      await saveEducation(values);
    },
    {
     onSuccess: () => {
        history(-1);
        enqueueSnackbar(
          t("common:notification.create.success", {
            subject: t("education.subject"),
          }),
          {
            variant: "success",
          }
        );
      },
      onError: () => {
        enqueueSnackbar(
          t("common:notification.create.failure", {
            subject: t("education.subject"),
          }),
          {
            variant: "error",
          }
        );
      },
    }
  );

  return (
    <>
      <Container maxWidth="sm">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
          >
            <EducationForm />
            <Box display="flex" justifyContent="center" m={2} gridGap={8}>
              <Button color="primary" variant="text" onClick={()=>history(-1)}>
                {t("common:button.cancel")}
              </Button>
              <Button type="submit" color="primary">
                {t("common:button.save")}
              </Button>
            </Box>
          </form>
        </FormProvider>
      </Container>
    </>
  );
};

export default EducationCreate;