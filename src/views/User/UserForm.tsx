import {
  Container, Grid,
  MenuItem,
  TextField
} from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { USER_TYPES } from "../../config/constants";
import { User } from "../../shared/types";

type Props = {
  user?: User;
}

const UserForm = ({user}:Props) => {
  const { t } = useTranslation();
  const { formState, register, control } = useFormContext<User>();

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2} alignContent="center" alignItems="center">
        <Grid item xs={12}>
          <TextField
            label={t("user.formValues.name")}
            defaultValue={user?.username}
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
          <TextField
            label={t("user.formValues.password")}
            defaultValue={user?.password}
            InputLabelProps={{ shrink: true, required: true }}
            {...register("password", {
              required: {
                value: true,
                message: t("common:validation.required"),
              },
            })}
            error={formState.errors.password && true}
            helperText={formState.errors?.password?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="userType"
            defaultValue={user?.userType || "ADMIN"}
            rules={{ required: t("validation.required").toString() }}
            render={({ field: { onChange, value } }) => (
              <TextField
                label={t("user.formValues.userType")}
                InputLabelProps={{ shrink: true, required: true }}
                defaultValue="ADMIN"
                SelectProps={{ displayEmpty: true }}
                select
                value={value}
                onChange={onChange}
                error={formState.errors.userType && true}
                helperText={formState.errors.userType?.message}
              >
                {USER_TYPES.map((type, index) => (
                  <MenuItem key={index} value={type}>
                    {t(`common:userTypes.${type}`)}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserForm;