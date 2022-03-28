import { Container } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const Education = () => {
  const { t } = useTranslation();
  return (
    <Container maxWidth="lg">
      <>{t("education.title")}</>
    </Container>
  );
};
export default Education;
