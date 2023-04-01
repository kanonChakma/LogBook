import EditIcon from "@mui/icons-material/Edit";
import { Button, Container, Grid, Link, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../common/axios";
import { ProfileType } from "../common/types";
import UserPosts from "../component/User/UserPosts";

const Profile = () => {
  let { profile_name } = useParams<{ profile_name?: string }>();

  const [profielInfo, setProfileInfo] = useState<ProfileType>();

  useEffect(() => {
    axiosInstance
      .get(`user/${profile_name}/`)
      .then((res) => {
        console.log(res.data);
        setProfileInfo(res.data);
      })
      .catch((err) => console.log(err));
  }, [profile_name]);

  return (
    <>
      <Container maxWidth="lg">
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "5vh", marginTop: "100px" }}
        >
          <Grid item xs={12} md={12}>
            <Grid
              sx={{
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                padding: "20px",
              }}
              container
            >
              <Grid item textAlign="end" mb={2} xs={12}>
                <Button variant="outlined" startIcon={<EditIcon />}>
                  <Link href="/profile/edit/">Edit Profile</Link>
                </Button>
              </Grid>
              <Grid item xs={12} md={4}>
                <img
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                  src={`http://127.0.0.1:8000/${profielInfo?.profile_image}`}
                  alt="cover"
                />
              </Grid>
              <Grid item xs={12} md={2}></Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6">
                  Name: {profielInfo?.user_name}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Email: {profielInfo?.email}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit. Quos blanditiis tenetur.subtitle1. Lorem ipsum dolor sit
                  amet, consectetur adipisicing elit. Quos blanditiis tenetur
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <UserPosts profile_name={profile_name as string} />
      </Container>
    </>
  );
};

export default Profile;
