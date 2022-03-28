import {
  Container, Grid,
  MenuItem,
  TextField
} from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { User } from "../../shared/types";

const UserForm = () => {
  const { t } = useTranslation();
  const { formState, register, control } = useFormContext<User>();

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2} alignContent="center" alignItems="center">
        <Grid item xs={12}>
          <TextField
            label={"Felhasználónév"}
            InputLabelProps={{ shrink: true, required: true }}
            {...register("username", {
              required: {
                value: true,
                message: t("common:validation.required"),
              },
            })}
            error={formState.errors.username && true}
            helperText={formState.errors?.username?.message}
          />
        </Grid>
        <Grid item xs={12}>
            <Controller
              control={control}
              name="userType"
              defaultValue={"default"}
              rules={{ required: t("validation.required").toString() }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label={"Felhasználó típusa"}
                  InputLabelProps={{ shrink: true, required: true }}
                  defaultValue="default"
                  SelectProps={{ displayEmpty: true }}
                  select
                  value={value}
                  onChange={onChange}
                  error={formState.errors.userType && true}
                  helperText={formState.errors.userType?.message}
                >
                  <MenuItem disabled value="default">
                    {"Kérem válasszon..."}
                  </MenuItem>
                  <MenuItem value="Eszközfelelős">Eszközfelelős</MenuItem>
                  <MenuItem value="Operátor">Operátor</MenuItem>
                  <MenuItem value="Karbantartó">Karbantartó</MenuItem>
                </TextField>
              )}
            />
          </Grid>
      </Grid>
    </Container>
  );
};

export default UserForm;