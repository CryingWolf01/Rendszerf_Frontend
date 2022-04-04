import { Education, RelEducationUser } from "../../../shared/types";
import { Box, Button, Container, Grid, MenuItem, TextField } from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type Props = {
  educations?: Education[];
}

const UserEducationForm = ({educations}: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<RelEducationUser>()
  const { t } = useTranslation();
  const history = useNavigate();
  
  return (
    <Container maxWidth="sm">
      <Grid container spacing={2} alignContent="center" alignItems="center">
        <Grid item xs={12}>
          <Controller
            control={control}
            name="education.id"
            rules={{ required: t("validation.required").toString() }}
            render={({ field: { onChange, value } }) => (
              <TextField
                label={t("relEducationUser.formValues.education")}
                InputLabelProps={{ shrink: true, required: true }}
                defaultValue="default"
                SelectProps={{ displayEmpty: true }}
                select
                value={value}
                onChange={onChange}
                error={errors.education?.id && true}
                helperText={errors.education?.id?.message}
              >
                {educations?.length &&
                  educations.map((education) => (
                    <MenuItem key={education.id} value={education.id}>
                      {education.name}
                    </MenuItem>
                  ))}
              </TextField>
            )}
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
}

export default UserEducationForm;