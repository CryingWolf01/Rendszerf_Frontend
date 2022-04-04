import { Box, Button, Card, CardContent, CardHeader, makeStyles, TextField, Typography } from "@material-ui/core";
import Alert from "@mui/material/Alert/Alert";
import { createSelector } from "@reduxjs/toolkit";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PasswordTextField from "../../components/PasswordTextField";
import { RootState } from "../../config/store";
import { COLORS } from "../../config/theme";
import { loginUser } from "../../shared/network/user.api";
import { User } from "../../shared/types";

const selector = createSelector(
  (state: RootState) => state.authentication,
  ({ status, isAuthenticated, error }) => ({
    error,
    status,
    isAuthenticated,
  })
);

const useStyles = makeStyles(
  {
    root: {
      display: "flex",
      justifyContent: "center",
      background: COLORS.lighterGrey,
    },
  },
  {
    name: "Login",
  }
);

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { status, isAuthenticated, error } = useSelector(selector);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  async function onSubmit(values: User) {
    dispatch(loginUser({
      ...values,
      username: values.username,
      password: values.password
    }));
  }

  if (status === "success" && isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <Box className={classes.root}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-around"
        height="100vh"
        maxWidth={500}
      >
        <Typography variant="h1">{t("login.appName")}</Typography>
        <Card
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          elevation={10}
          style={{ borderRadius: 10 }}
        >
          <CardHeader title={t("login.title")} />
          <CardContent style={{ paddingTop: 0 }}>
            {status === "failure" && error && (
              <Alert
                severity="error"
                style={{ borderRadius: 10 }}
                variant="filled"
              >
                {t([`login.${error}`, "login.failure"])}
              </Alert>
            )}
            <TextField
              {...register("username", {
                required: t("validation.required").toString(),
              })}
              label={t("login.username")}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <Controller
              control={control}
              name="password"
              rules={{ required: t("validation.required").toString() }}
              render={({ field: { onChange, value } }) => (
                <PasswordTextField
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  label={t("login.password")}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt={2}
            >
              <Button
                variant="contained"
                type="submit"
                color="primary"
                style={{ height: 35 }}
              >
                {t("login.title")}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default Login;