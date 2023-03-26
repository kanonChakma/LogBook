import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminDashboard from "../component/Admin/DashBoard";
import axiosInstance from "../utils/axios";

const Admin: React.FC = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/posts")
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .then((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container maxWidth="lg">
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={10}>
          <AdminDashboard posts={posts} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Admin;
