import {
  Box,
  Button,
  Container, Grid, MenuItem, TextField
} from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ISSUE_STATUSES } from "../../../config/constants";
import { IssueUpdateSatatusValues } from "../../../shared/types";

const IssueStatusForm = () => {
  const { t } = useTranslation();
  const history = useNavigate();
  const { formState, register, control, } = useFormContext<IssueUpdateSatatusValues>();

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2} alignContent="center" alignItems="center">
        <Grid item xs={12}>
          <Controller
            control={control}
            name="newStatus"
            defaultValue={""}
            rules={{ required: t("validation.required").toString() }}
            render={({ field: { onChange, value } }) => (
              <TextField
                label={t("issue.formValues.status")}
                InputLabelProps={{ shrink: true,  required: true }}
                SelectProps={{ displayEmpty: true }}
                select
                value={value}
                onChange={onChange}
                error={formState.errors.newStatus && true}
                helperText={formState.errors.newStatus?.message}
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
        <Grid item xs={12}>
          <TextField
            label={t("issue.formValues.justification")}
            defaultValue={""}
            InputLabelProps={{ shrink: true }}
            {...register("justification")}
            multiline
            rows={3}
            error={formState.errors.justification && true}
            helperText={formState.errors?.justification?.message}
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

export default IssueStatusForm;