import { Container } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { modifyIssueStatus } from "../../../shared/network/issue.api";
import { IssueUpdateSatatusValues } from "../../../shared/types";
import IssueStatusForm from "./IssueStatusForm";


const IssueStatusModify = () => {
  const { t } = useTranslation();
  const history = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const form = useForm<IssueUpdateSatatusValues>();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmitModify = async (values: IssueUpdateSatatusValues) => {
    try {
      await modifyIssueStatus(
        {
          ...values,
          issueId: id ? Number.parseInt(id) : null
        });
      enqueueSnackbar(
        t("common:notification.update.success", {
          subject: t("issue.statusSubject"),
        }),
        {
          variant: "success",
        },
      );
      history(-1);
    } catch {
      enqueueSnackbar(
        t("common:notification.update.failure", {
          subject: t("issue.statusSubject"),
        }),
        {
          variant: "error",
        },
      );
    }
  };

  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmitModify)}>
          <IssueStatusForm/>
        </form>
      </FormProvider>
    </>
  );
};

export default IssueStatusModify;