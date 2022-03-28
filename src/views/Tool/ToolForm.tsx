import {
  Container, Grid, TextField
} from "@material-ui/core";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Tool } from "../../shared/types";

const ToolForm = () => {
  const { t } = useTranslation();
  const { formState, register } = useFormContext<Tool>();

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2} alignContent="center" alignItems="center">
        <Grid item xs={12}>
          <TextField
            label={"Eszköz neve"}
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
            label={"Eszköz azonosító száma"}
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
          <TextField
            label={"Eszköz leírása"}
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