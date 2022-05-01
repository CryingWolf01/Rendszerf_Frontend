import {
  Box,
  Button,
  Container, Grid, MenuItem, TextField
} from "@material-ui/core";
import { CalendarToday } from "@material-ui/icons";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { ISSUE_STATUSES, ISSUE_TYPES, SEVERITY_TYPES } from "../../config/constants";
import { getToolList } from "../../shared/network/tool.api";
import { getUserList } from "../../shared/network/user.api";
import { Issue, IssueLog, Tool, User } from "../../shared/types";

type Props = {
  issue?: Issue
}

export type IssueFormValues = {
  id: number;
  tool: Tool;
  responsibleUser: User;
  dateTime: Date;
  estimatedTime: number;
  title: string;
  severity: string;
  type: string;
  status: string;
  description: string;
  issueLogs?: IssueLog[];
};

const IssueForm = ({issue}: Props) => {
  const { t } = useTranslation();
  const history = useNavigate();
  const { formState, register, control, } = useFormContext<IssueFormValues>();

  const toolQuery = useQuery(["toolForIssues"], async () => {
    const { data } = await getToolList();
    return data.items;
  });

  const userQuery = useQuery(["userForIssues"], async () => {
    const { data } = await getUserList();
    return data.items;
  });

  return (
    <Container maxWidth="md">
      <Grid container spacing={2} alignContent="center" alignItems="center">
        <Grid item xs={6}>
          <TextField
            label={t("issue.formValues.title")}
            defaultValue={issue?.title}
            InputLabelProps={{ shrink: true, required: true }}
            {...register("title", {
              required: {
                value: true,
                message: t("common:validation.required"),
              },
            })}
            error={formState.errors.title && true}
            helperText={formState.errors?.title?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="type"
            defaultValue={issue?.type}
            render={({ field: { onChange, value } }) => (
              <TextField
                label={t("issue.formValues.type")}
                InputLabelProps={{ shrink: true }}
                defaultValue="default"
                SelectProps={{ displayEmpty: true }}
                select
                value={value}
                onChange={onChange}
                error={formState.errors.status && true}
                helperText={formState.errors.status?.message}
              >
                {ISSUE_TYPES.map((type, index) => (
                  <MenuItem key={index} value={type}>
                    {t(`common:issueTypes.${type}`)}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="tool.id"
            defaultValue={issue?.tool?.id}
            rules={{ required: t("validation.required").toString() }}
            render={({ field: { onChange, value } }) => (
              <TextField
                label={t("issue.formValues.tool")}
                InputLabelProps={{ shrink: true, required: true }}
                defaultValue="default"
                SelectProps={{ displayEmpty: true }}
                select
                value={value}
                onChange={onChange}
                error={formState.errors.tool?.id && true}
                helperText={formState.errors.tool?.id?.message}
              >
                {toolQuery.data?.length &&
                  toolQuery.data.map((tool) => (
                    <MenuItem key={tool.id} value={tool.id}>
                      {tool.name}
                    </MenuItem>
                  ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="responsibleUser.id"
            defaultValue={issue?.responsibleUser?.id}
            render={({ field: { onChange, value } }) => (
              <TextField
                label={t("issue.formValues.responsibleUser")}
                InputLabelProps={{ shrink: true }}
                defaultValue="default"
                SelectProps={{ displayEmpty: true }}
                select
                value={value}
                onChange={onChange}
                error={formState.errors.responsibleUser?.id && true}
                helperText={formState.errors.responsibleUser?.id?.message}
              >
                {userQuery.data?.length &&
                  userQuery.data.map((responsibleUser) => (
                    <MenuItem key={responsibleUser.id} value={responsibleUser.id}>
                      {responsibleUser.username}
                    </MenuItem>
                  ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="status"
            defaultValue={issue?.status}
            rules={{ required: t("validation.required").toString() }}
            render={({ field: { onChange, value } }) => (
              <TextField
                label={t("issue.formValues.status")}
                InputLabelProps={{ shrink: true, required: true }}
                defaultValue="default"
                SelectProps={{ displayEmpty: true }}
                select
                value={value}
                onChange={onChange}
                error={formState.errors.status && true}
                helperText={formState.errors.status?.message}
              >
                {ISSUE_STATUSES.map((status, index) => (
                  <MenuItem key={index} value={status}>
                    {t(`common:issueStatuses.${status}`)}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="severity"
            defaultValue={issue?.severity}
            render={({ field: { onChange, value } }) => (
              <TextField
                label={t("issue.formValues.severity")}
                InputLabelProps={{ shrink: true }}
                defaultValue="default"
                SelectProps={{ displayEmpty: true }}
                select
                value={value}
                onChange={onChange}
                error={formState.errors.severity && true}
                helperText={formState.errors.severity?.message}
              >
                {SEVERITY_TYPES.map((severity, index) => (
                  <MenuItem key={index} value={severity}>
                    {t(`common:severityTypes.${severity}`)}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
         <Grid item sm={6}>
          <Controller
            control={control}
            name="dateTime"
            defaultValue={
              issue?.dateTime ? new Date(issue.dateTime) : new Date()
            }
            rules={{ required: t("validation.required").toString() }}
            render={({ field, fieldState }) => (
              <KeyboardDatePicker
                {...field}
                ref={undefined}
                className="dateTime"
                variant="inline"
                label={t("issue.formValues.dateTime")}
                format="yyyy.MM.dd"
                InputLabelProps={{ shrink: true, required: true }}
                InputProps={{ endAdornment: <CalendarToday /> }}
                autoOk
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label={t("issue.formValues.estimatedTime")}
            defaultValue={issue?.estimatedTime}
            InputLabelProps={{ shrink: true, required: true }}
            {...register("estimatedTime", {
              required: {
                value: true,
                message: t("common:validation.required"),
              },
            })}
            error={formState.errors.estimatedTime && true}
            helperText={formState.errors?.estimatedTime?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={t("issue.formValues.description")}
            defaultValue={issue?.description}
            InputLabelProps={{ shrink: true }}
            {...register("description")}
            multiline
            rows={3}
            error={formState.errors.description && true}
            helperText={formState.errors?.description?.message}
          />
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="center" m={2} gridGap={8}>
        <Button color="primary" variant="text" onClick={()=>history(-1)}>
          {t("common:button.cancel")}
        </Button>
        <Button type="submit" color="primary">
          {t("common:button.save")}
        </Button>
      </Box>
    </Container>
  );
};

export default IssueForm;