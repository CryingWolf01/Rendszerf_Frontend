import { Container, Grid, MenuItem, TextField } from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Education, RelEducationToolCategory } from "../../../shared/types";

type Props = {
  educations?: Education[];
}

const EducationToolCategoryForm = ({ educations }: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<RelEducationToolCategory>()
  const { t } = useTranslation();
  
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
                label={t("relEducationToolCategory.formValues.education")}
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
    </Container>
  );
}

export default EducationToolCategoryForm;