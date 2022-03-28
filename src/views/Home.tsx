import { Container } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  return (
    <Container maxWidth="lg">
      <>{"Főoldal"}</>
    </Container>
  );
};
export default Home;