import { Box, Container, Grid } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import axiosInstance from "../common/axios";
import Posts from "../component/Posts";
import Tabss from "../component/Tabs";

const Home = () => {
  const [posts, setPost] = useState([]);
  const [pageNo, setPageNo] = useState<number>(1);

  const pageChangeHandler = (
    _event: React.ChangeEvent<unknown>,
    pageNumber = 1
  ) => {
    setPageNo(pageNumber);
  };
  useEffect(() => {
    axiosInstance.get(`posts/?p=${pageNo}`).then((res) => {
      setPost(res.data.results);
      console.log(res.data.results);
    });
  }, [pageNo]);

  return (
    <Container maxWidth="lg">
      <Grid sx={{ marginTop: "110px" }}>
        <Tabss />
        <Box>
          <Posts posts={posts} />
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "20vh" }}
          >
            <Grid item xs={3}>
              <Pagination
                onChange={(event, pageNumber) =>
                  pageChangeHandler(event, pageNumber)
                }
                count={5}
                variant="outlined"
                shape="rounded"
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Container>
  );
};

export default Home;
