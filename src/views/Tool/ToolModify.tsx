import { Box, Button, CircularProgress, Container } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { getToolById, saveTool } from "../../shared/network/tool.api";
import { Tool } from "../../shared/types";
import ToolForm from "./ToolForm";

const ToolModify = () => {
  const { t } = useTranslation();
  const history = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const form = useForm<Tool>();
  const { enqueueSnackbar } = useSnackbar();

  const toolQuery = useQuery(["toolQuery", id], async () => {
    if (id) {
      const { data } = await getToolById(Number.parseInt(id));
      return data.item;
    }

    return Promise.reject();
  });

  const onSubmitModify = async (values: Tool) => {
    try {
      await saveTool(
        {
          ...toolQuery.data,
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
        {toolQuery.isFetching ? (
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
              <ToolForm tool={toolQuery.data}/>
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

export default ToolModify;