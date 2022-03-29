import ToolCategoryForm from "./ToolCategoryForm";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Button, Container } from "@material-ui/core";
import { ToolCategory } from "../../shared/types";
import { useMutation } from "react-query";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { saveToolCategory } from "../../shared/network/tool_category.api";

const ToolCategoryCreate = () => {
  const { t } = useTranslation();
  const history = useNavigate();
  const form = useForm<ToolCategory>();
  const { enqueueSnackbar } = useSnackbar();

  const mutation = useMutation<any, any, ToolCategory>(
    async (values) => {
      await saveToolCategory(values);
    },
    {
      onSuccess: () => {
        history(-1);
        enqueueSnackbar(
          t("common:notification.create.success", {
            subject: t("toolCategory.subject"),
          }),
          {
            variant: "success",
          }
        );
      },
      onError: () => {
        enqueueSnackbar(
          t("common:notification.create.failure", {
            subject: t("toolCategory.subject"),
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
            <ToolCategoryForm />
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

export default ToolCategoryCreate;