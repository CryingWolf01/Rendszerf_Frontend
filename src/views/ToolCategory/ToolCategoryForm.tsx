import {
  Container, Grid, TextField
} from "@material-ui/core";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ToolCategory } from "../../shared/types";

const ToolCategoryForm = () => {
  const { t } = useTranslation();
  const { formState, register } = useFormContext<ToolCategory>();

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2} alignContent="center" alignItems="center">
        <Grid item xs={12}>
          <TextField
            label={"Kategória neve"}
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
          <TextField
            label={"Kategória leírása"}
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