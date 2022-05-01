import { Box, Button, CircularProgress, Container } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { getToolCategoryById, saveToolCategory } from "../../shared/network/tool_category.api";
import { ToolCategory } from "../../shared/types";
import ToolCategoryForm from "./ToolCategoryForm";

const ToolCategoryModify = () => {
  const { t } = useTranslation();
  const history = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const form = useForm<ToolCategory>();
  const { enqueueSnackbar } = useSnackbar();

  const toolCategoryQuery = useQuery(["toolCategoryQuery", id], async () => {
    if (id) {
      const { data } = await getToolCategoryById(Number.parseInt(id));
      return data.item;
    }

    return Promise.reject();
  });

  const onSubmitModify = async (values: ToolCategory) => {
    try {
      await saveToolCategory(
        {
          ...toolCategoryQuery.data,
          ...values
        }
      );
      enqueueSnackbar(
        t("common:notification.update.success", {
          subject: t("education.subject"),
        }),
        {
          variant: "success",
        },
      );
      history(-1);
    } catch {
      enqueueSnackbar(
        t("common:notification.update.failure", {
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
        {toolCategoryQuery.isFetching ? (
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
              <ToolCategoryForm toolCategory={toolCategoryQuery.data}/>
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

export default ToolCategoryModify;