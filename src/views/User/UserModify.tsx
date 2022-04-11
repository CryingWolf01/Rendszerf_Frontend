import { Box, Button, CircularProgress, Container } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserList, saveUser } from "../../shared/network/user.api";
import { User } from "../../shared/types";
import UserForm from "./UserForm";

const UserModify = () => {
  const { t } = useTranslation();
  const history = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const form = useForm<User>();
  const { enqueueSnackbar } = useSnackbar();

  const userQuery = useQuery(["userQuery", id], async () => {
    if (id) {
      const { data } = await getUserList();
      return data.items;
    }

    return Promise.reject();
  });

  const user = userQuery.data?.find(
    (user) => id && user.id === Number.parseInt(id)
  );

  const onSubmitModify = async (values: User) => {
    try {
      await saveUser(
        {
          ...userQuery.data,
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
        {userQuery.isFetching ? (
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
              <UserForm user={user}/>
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

export default UserModify;