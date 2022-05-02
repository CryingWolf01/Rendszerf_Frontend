import { Box, CircularProgress, Container } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { getIssueById, saveIssue } from "../../shared/network/issue.api";
import { Issue } from "../../shared/types";
import IssueForm from "./IssueForm";

const IssueModify = () => {
  const { t } = useTranslation();
  const history = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const form = useForm<Issue>();
  const { enqueueSnackbar } = useSnackbar();

  const issueQuery = useQuery(["issueQueryForModify", id], async () => {
    if (id) {
      const { data } = await getIssueById(Number.parseInt(id));
      return data.item;
    }
    return Promise.reject();
  });

  const onSubmitModify = async (values: Issue) => {
    try {
      await saveIssue(values);
      enqueueSnackbar(
        t("common:notification.update.success", {
          subject: t("issue.subject"),
        }),
        {
          variant: "success",
        },
      );
      history(-1);
    } catch {
      enqueueSnackbar(
        t("common:notification.update.failure", {
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
      <Container maxWidth="md">
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
            </form>
          </FormProvider>
        )}
      </Container>
    </>
  );
};

export default IssueModify;