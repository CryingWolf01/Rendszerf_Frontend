import {
  Container, Grid, MenuItem, TextField
} from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { getToolCategoryList } from "../../shared/network/tool_category.api";
import { Tool } from "../../shared/types";

type Props = {
  tool?: Tool;
}

const ToolForm = ({tool}: Props) => {
  const { t } = useTranslation();
  const { formState, register, control, } = useFormContext<Tool>();

  const toolCategoryQuery = useQuery(["toolCategoriesForTool"], async () => {
    const { data } = await getToolCategoryList();
    return data.items;
  });

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2} alignContent="center" alignItems="center">
        <Grid item xs={12}>
          <TextField
            label={t("tool.formValues.name")}
            defaultValue={tool?.name}
            InputLabelProps={{ shrink: true, required: true }}
            {...register("name", {
              required: {
                value: true,
                message: t("common:validation.required"),
              },
            })}
            error={formState.errors.name && true}
            helperText={formState.errors?.name?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={t("tool.formValues.identifier")}
            defaultValue={tool?.identifier}
            InputLabelProps={{ shrink: true, required: true }}
            {...register("identifier", {
              required: {
                value: true,
                message: t("common:validation.required"),
              },
            })}
            error={formState.errors.name && true}
            helperText={formState.errors?.name?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="toolCategory.id"
            defaultValue={tool?.toolCategory.id}
            rules={{ required: t("validation.required").toString() }}
            render={({ field: { onChange, value } }) => (
              <TextField
                label={t("relEducationToolCategory.formValues.education")}
                InputLabelProps={{ shrink: true, required: true }}
                defaultValue="default"
                SelectProps={{ displayEmpty: true }}
                select
                value={value}
                onChange={onChange}
                error={formState.errors.toolCategory?.id && true}
                helperText={formState.errors.toolCategory?.id?.message}
              >
                {toolCategoryQuery.data?.length &&
                  toolCategoryQuery.data.map((toolCategory) => (
                    <MenuItem key={toolCategory.id} value={toolCategory.id}>
                      {toolCategory.category}
                    </MenuItem>
                  ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={t("tool.formValues.description")}
            defaultValue={tool?.description}
            InputLabelProps={{ shrink: true, required: true }}
            {...register("description", {
              required: {
                value: true,
                message: t("common:validation.required"),
              },
            })}
            multiline
            rows={3}
            error={formState.errors.name && true}
            helperText={formState.errors?.name?.message}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ToolForm;