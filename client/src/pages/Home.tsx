import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import Posts from "../component/Posts";
import Tabss from "../component/Tabs";
import axiosInstance from "../utils/axios";

const Home = () => {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    axiosInstance.get("posts/").then((res) => {
      setPost(res.data);
      console.log(res.data);
    });
  }, []);
  return (
    <Container maxWidth="lg">
      <Box sx={{ marginTop: "200px" }}>
        <Tabss/>
        <Posts posts={posts} />
      </Box>
    </Container>
  );
};

export default Home;
