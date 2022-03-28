import { Container } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const Tool = ()=>{
  const { t } = useTranslation();
  return (
    <Container maxWidth="lg">
      <>{"Eszközök"}</>
    </Container>
  );
}
export default Tool;