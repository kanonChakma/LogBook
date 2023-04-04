import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Container, Grid, Link, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../common/axios";
import { ProfileType } from "../common/types";
import { removeUserInfoFromLocalStorage } from "../common/userInfo";
import UserPosts from "../component/User/UserPosts";

const Profile = () => {
  let navigate = useNavigate();
  let { profile_name } = useParams<{ profile_name?: string }>();

  const [profielInfo, setProfileInfo] = useState<ProfileType>();
  const userId = localStorage.getItem("userId");

  const alterImage =
    "https://images.unsplash.com/photo-1597089542047-b9873d82d8ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";

  const handleDeletee = () => {
    axiosInstance.delete("user/profile/").then((res) => {
      console.log(res);
      removeUserInfoFromLocalStorage();
      navigate("/auth/register");
      toast.success("Account Deleted Succesfully");
    });
  };

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
              <Grid item textAlign="end" mb={2} xs={12} gap={2}>
                {parseInt(userId as string) === profielInfo?.id && (
                  <Box gap={3}>
                    <Button
                      style={{ marginRight: "30px" }}
                      size="small"
                      variant="outlined"
                      startIcon={<EditIcon />}
                    >
                      <Link href="/profile/edit/">Update</Link>
                    </Button>
                    <Button
                      size="small"
                      onClick={handleDeletee}
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                    >
                      <Link>Delete</Link>
                    </Button>
                  </Box>
                )}
              </Grid>
              <Grid item xs={12} md={4}>
                <img
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                  src={
                    profielInfo?.profile_image
                      ? `http://127.0.0.1:8000/${profielInfo?.profile_image}`
                      : alterImage
                  }
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
                <Typography variant="h6" gutterBottom>
                  Gender: {profielInfo?.gender}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Birth Date: {profielInfo?.birth_date}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {profielInfo?.about}
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
