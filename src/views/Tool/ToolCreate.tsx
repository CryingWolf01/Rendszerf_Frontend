import ToolForm from "./ToolForm";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Button, Container } from "@material-ui/core";
import { Tool } from "../../shared/types";
import { useMutation } from "react-query";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { saveTool } from "../../shared/network/tool.api";

const ToolCreate = () => {
  const { t } = useTranslation();
  const history = useNavigate();
  const form = useForm<Tool>();
  const { enqueueSnackbar } = useSnackbar();

  const mutation = useMutation<any, any, Tool>(
    async (values) => {
      await saveTool(values);
    },
    {
      onSuccess: () => {
        history(-1);
        enqueueSnackbar(t("user.createSuccess"), {
          variant: "success",
        });
      },
      onError: () => {
        enqueueSnackbar(t("user.createFailure"), {
          variant: "error",
        });
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
            <ToolForm />
            <Box display="flex" justifyContent="center" m={2} gridGap={8}>
              <Button color="primary" variant="text" onClick={()=>history(-1)}>
                {"Mégse"}
              </Button>
              <Button type="submit" color="primary">
                {"Mentés"}
              </Button>
            </Box>
          </form>
        </FormProvider>
      </Container>
    </>
  );
};

export default ToolCreate;