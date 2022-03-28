import { Container } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  return (
    <Container maxWidth="lg">
      <>{t("home.title")}</>
    </Container>
  );
};
export default Home;