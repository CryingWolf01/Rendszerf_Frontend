import { Box, CircularProgress, Container } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { getEducationList } from "../../../shared/network/education.api";
import { saveEducationUser } from "../../../shared/network/releducationuser.api";
import { RelEducationUser } from "../../../shared/types";
import UserEducationForm from "./UserEducationForm";

const UserEducationCreate = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const history = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const form = useForm<RelEducationUser>();

  const educationQuery = useQuery(["educationQueryForRelUser"], async () => {
    const { data } = await getEducationList();
    return data.items;
  });

  const onSubmitCreate = async (values: RelEducationUser) => {
    try {
      await saveEducationUser({
        ...values,
        user: {
          ...values.user,
          id: id ? Number.parseInt(id) : values.user.id
        }
      });
      enqueueSnackbar(
        t("common:notification.create.success", {
          subject: t("relEducationUser.subject"),
        }),
        {
          variant: "success",
        }
      );
      history(-1);
    } catch (e) {
      enqueueSnackbar(
        t("common:notification.create.failure", {
          subject: t("relEducationUser.subject"),
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
            <UserEducationForm educations={educationQuery.data}/>
          </FormProvider>
        )}
      </form>
    </Container>
  );
}

export default UserEducationCreate;