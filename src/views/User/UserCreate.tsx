import UserForm from "./UserForm";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Button, Container } from "@material-ui/core";
import { User } from "../../shared/types";
import { useMutation } from "react-query";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../../shared/network/user.api";

const UserCreate = () => {
  const { t } = useTranslation();
  const history = useNavigate();
  const form = useForm<User>();
  const { enqueueSnackbar } = useSnackbar();

  const mutation = useMutation<any, any, User>(
    async (values) => {
      await saveUser(values);
    },
    {
      onSuccess: () => {
        history(-1);
        enqueueSnackbar(
          t("common:notification.create.success", {
            subject: t("user.subject"),
          }),
          {
            variant: "success",
          }
        );
      },
      onError: () => {
        enqueueSnackbar(
          t("common:notification.create.failure", {
            subject: t("user.subject"),
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
            <UserForm />
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

export default UserCreate;