import { Box, Button, CircularProgress, Container } from "@material-ui/core";
import { format } from "date-fns";
import { useSnackbar } from "notistack";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { getIssueById, saveIssue } from "../../shared/network/issue.api";
import IssueForm, { IssueFormValues } from "./IssueForm";

const IssueModify = () => {
  const { t } = useTranslation();
  const history = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const form = useForm<IssueFormValues>();
  const { enqueueSnackbar } = useSnackbar();

  const issueQuery = useQuery(["issueQueryForModify", id], async () => {
    if (id) {
      const { data } = await getIssueById(Number.parseInt(id));
      return data.item;
    }
    return Promise.reject();
  });

  const onSubmitModify = async (values: IssueFormValues) => {
    try {
      await saveIssue({
        ...values,
        dateTime: format(values.dateTime, "yyyy-MM-dd")
      });
      enqueueSnackbar(
        t("common:notification.modify.success", {
          subject: t("issue.subject"),
        }),
        {
          variant: "success",
        },
      );
      history(-1);
    } catch {
      enqueueSnackbar(
        t("common:notification.modify.failure", {
          subject: t("issue.subject"),
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
        {issueQuery.isFetching ? (
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
              <IssueForm issue={issueQuery.data}/>
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

export default IssueModify;