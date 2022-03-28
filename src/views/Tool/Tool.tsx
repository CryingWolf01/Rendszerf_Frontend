import { Container } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const Tool = ()=>{
  const { t } = useTranslation();
  return (
    <Container maxWidth="lg">
      <>{t("tool.title")}</>
    </Container>
  );
}
export default Tool;