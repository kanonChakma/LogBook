import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../common/axios";
import AdminDashboard from "../component/Admin/DashBoard";

const Admin: React.FC = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/posts")
      .then((res) => {
        console.log(res.data);
        setPosts(res.data.results);
      })
      .then((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container maxWidth="lg">
      <Grid
        container
        marginTop="10px"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <AdminDashboard posts={posts} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Admin;
