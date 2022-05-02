import { Box, Button, Card, CardContent, CardHeader, makeStyles, TextField, Typography } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import PasswordTextField from "../../components/PasswordTextField";
import { COLORS } from "../../config/theme";
import { loginUser } from "../../shared/network/user.api";
import { User } from "../../shared/types";

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

type Props = {
  setLoggedIn?: Dispatch<SetStateAction<boolean>>;
}

const Login = ({setLoggedIn}: Props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const onSubmit = async (values: User) => {
    try {
      const data = await loginUser({
        username: values.username,
        password: values.password
      });
      if (setLoggedIn) {
        setLoggedIn(true);
      }
      sessionStorage.setItem("userId", String(data.data.item.id));
      sessionStorage.setItem("username", data.data.item.username);
      sessionStorage.setItem("userType", data.data.item.userType);
      sessionStorage.setItem("loggedIn", "true");
      
      <Navigate to={"/"} />
    } catch (e) {
      enqueueSnackbar(
        t("common:notification.login.failure"),
        { variant: "error" }
      );
    }
  };

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