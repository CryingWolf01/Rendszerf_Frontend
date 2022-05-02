import {
  Container, Grid, MenuItem, TextField
} from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { MAINTENANCE_INTERVAL } from "../../config/constants";
import { getToolCategoryList } from "../../shared/network/tool_category.api";
import { ToolCategory } from "../../shared/types";

type Props = {
  toolCategory?: ToolCategory;
}

const ToolCategoryForm = ({toolCategory}: Props) => {
  const { t } = useTranslation();
  const { formState, register, control } = useFormContext<ToolCategory>();

  const parentCategoryQuery = useQuery(["parentCategoryQuery"], async () => {
    const { data } = await getToolCategoryList();
    return data.items;
  })

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
            label={t("toolCategory.formValues.maintenanceEstimatedTime")}
            defaultValue={toolCategory?.maintenanceEstimatedTime}
            InputLabelProps={{ shrink: true }}
            {...register("maintenanceEstimatedTime")}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={t("toolCategory.formValues.maintenanceDescription")}
            defaultValue={toolCategory?.maintenanceDescription}
            InputLabelProps={{ shrink: true }}
            {...register("maintenanceDescription")}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="parentCategory.id"
            defaultValue={toolCategory?.parentCategory.id}
            render={({ field: { onChange, value } }) => (
              <TextField
                label={t("toolCategory.formValues.parentCategory")}
                InputLabelProps={{ shrink: true }}
                SelectProps={{ displayEmpty: true }}
                select
                value={value}
                onChange={onChange}
              >
                {parentCategoryQuery.data?.length &&
                  parentCategoryQuery.data.map((parent) => (
                    <MenuItem key={parent.id} value={parent.id}>
                      {parent.category}
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