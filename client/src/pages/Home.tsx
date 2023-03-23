import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import Posts from "../component/Posts";
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
    <Container maxWidth="xl">
      <Box sx={{ marginTop: "200px" }}>
        <Posts posts={posts} />
      </Box>
    </Container>
  );
};

export default Home;
