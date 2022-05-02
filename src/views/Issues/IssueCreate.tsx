import { Container } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { saveIssue } from "../../shared/network/issue.api";
import { Issue } from "../../shared/types";
import IssueForm from "./IssueForm";

const IssueCreate = () => {
  const { t } = useTranslation();
  const history = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const form = useForm<Issue>();

  const onSubmitCreate = async (values: Issue) => {
    try {
      await saveIssue(values);
      enqueueSnackbar(
        t("common:notification.create.success", {
          subject: t("issue.subject"),
        }),
        {
          variant: "success",
        }
      );
      history(-1);
    } catch (e) {
      enqueueSnackbar(
        t("common:notification.create.failure", {
          subject: t("issue.subject"),
        }),
        { variant: "error" }
      );
    }
  };

  return (
    <Container maxWidth="lg">
      <form onSubmit={form.handleSubmit(onSubmitCreate)}>
        <FormProvider {...form}>
          <IssueForm />
        </FormProvider>
      </form>
    </Container>
  );
};

export default IssueCreate;