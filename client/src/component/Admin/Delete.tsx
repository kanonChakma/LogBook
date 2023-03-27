import { Button, Container, Grid } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../common/axios";

const Delete: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axiosInstance
      .delete("admin/delete/" + id)
      .catch(function (error: {
        response: { data: any; status: any; headers: any };
      }) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      })
      .then(function () {
        navigate({
          pathname: "/admin/",
        });
        window.location.reload();
      });
  };

  return (
    <Container component="main" maxWidth="sm">
      <Grid
        sx={{
          width: { md: 450, xs: "auto" },
          marginTop: { md: 30, xs: 20 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "#4B5563",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          padding: "2rem 3rem",
        }}
      >
        <Grid item xs={6}>
          <form onSubmit={handleSubmit}>
            <Button variant="contained" color="primary" type="submit">
              Press here to confirm delete
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Delete;
