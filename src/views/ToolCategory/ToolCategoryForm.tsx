import {
  Container, Grid, MenuItem, TextField
} from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { MAINTENANCE_INTERVAL } from "../../config/constants";
import { ToolCategory } from "../../shared/types";

type Props = {
  toolCategory?: ToolCategory;
}

const ToolCategoryForm = ({toolCategory}: Props) => {
  const { t } = useTranslation();
  const { formState, register, control } = useFormContext<ToolCategory>();

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2} alignContent="center" alignItems="center">
        <Grid item xs={12}>
          <TextField
            label={t("toolCategory.formValues.name")}
            defaultValue={toolCategory?.category}
            InputLabelProps={{ shrink: true, required: true }}
            {...register("category", {
              required: {
                value: true,
                message: t("common:validation.required"),
              },
            })}
            error={formState.errors.category && true}
            helperText={formState.errors?.category?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="maintenanceInterval"
            defaultValue={toolCategory?.maintenanceInterval || "WEEK"}
            rules={{ required: t("common:validation.required").toString() }}
            render={({ field: { onChange, value } }) => (
              <TextField
                label={t("toolCategory.formValues.maintenanceInterval")}
                InputLabelProps={{ shrink: true, required: true }}
                defaultValue="WEEK"
                SelectProps={{ displayEmpty: true }}
                select
                value={value}
                onChange={onChange}
                error={formState.errors.maintenanceInterval && true}
                helperText={formState.errors.maintenanceInterval?.message}
              >
                {MAINTENANCE_INTERVAL.map((interval, index) => (
                  <MenuItem key={index} value={interval}>
                    {t(`common:maintenanceInterval.${interval}`)}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={t("toolCategory.formValues.description")}
            defaultValue={toolCategory?.description}
            InputLabelProps={{ shrink: true, required: true }}
            {...register("description", {
              required: {
                value: true,
                message: t("common:validation.required"),
              },
            })}
            multiline={true}
            rows={3}
            error={formState.errors.category && true}
            helperText={formState.errors?.category?.message}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ToolCategoryForm;