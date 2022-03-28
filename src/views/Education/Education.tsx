import { Container, Box, Typography, Divider, CircularProgress, makeStyles, Button, Grid } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Pagination } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getEducationsPageable } from "../../shared/network/education.api";
import EducationRow from "./EducationRow";

const useStyles = makeStyles({
  listTitle: {
    color: "secondary",
    fontSize: "16px",
    fontWeight: "bold",
  },

  divider: {
    backgroundColor: "#757575",
  },
});

const Education = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [page, setPage] = useState(
    parseInt(
      window.sessionStorage.getItem("EducationPageNumber") || JSON.stringify(0)
    )
  );
  
  const listEducationsQuery = useQuery(
    ["listEducationsQuery", page],
    async () => {
      const { data } = await getEducationsPageable(page, 10);
      return data;
    }
  );

  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="flex-end">
        <Box>
          <Button component={Link} to="/education-create">
            <Add
              style={{
                fontSize: "20px",
                marginRight: 8,
              }}
            />
            {"Végzettség felvétele"}
          </Button>
        </Box>
      </Box>
      {listEducationsQuery.isFetching ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="300px"
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {listEducationsQuery.data?.page.content === null ? (
            <Box style={{ marginBottom: "20px" }}>
              <Typography variant="h5" align="center" color="secondary">
                {"Nincs megjeleníthető elem"}
              </Typography>
            </Box>
          ) : (
            <>
              <Box style={{ marginBottom: "20px" }}>
                <Grid container style={{ height: "40px" }}>
                  <Grid item xs={5}>
                    <Typography className={classes.listTitle}>
                      {"Végzettség neve"}
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.listTitle}>
                      {"Végzettség leírása"}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider className={classes.divider} />
                {listEducationsQuery.data?.page.content.length &&
                  listEducationsQuery.data.page.content.map((education) => (
                    <EducationRow education={education} />
                  ))}
              </Box>
              {listEducationsQuery.data &&
                listEducationsQuery?.data?.page.totalPages > 1 && (
                  <Pagination
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "24px 0",
                    }}
                    count={listEducationsQuery?.data?.page.totalPages}
                    color="primary"
                    page={listEducationsQuery.data.page.number + 1}
                    onChange={(e, page) => {
                      sessionStorage.setItem(
                        "EducationPageNumber",
                        JSON.stringify(page - 1)
                      );
                      setPage(page - 1);
                    }}
                  />
                )}
            </>
          )}
        </>
      )}
    </Container>
  );
};
export default Education;
