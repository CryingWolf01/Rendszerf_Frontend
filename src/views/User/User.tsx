import { Container } from "@material-ui/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { getUsersPageable } from "../../shared/network/user.api";

const User = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(
    parseInt(
      window.sessionStorage.getItem("UserPageNumber") || JSON.stringify(0)
    )
  );
  
  const listUsersQuery = useQuery(
    ["listUsersQuery", page],
    async () => {
      const { data } = await getUsersPageable(page, 10);
      return data;
    }
  );

  return (
    <Container maxWidth="lg">
      <>{t("home.title")}</>
    </Container>
  );
};
export default User;
