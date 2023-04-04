import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import axiosInstance, { baseURL } from "../../common/axios";
import { ProfileType } from "../../common/types";
import { FormTextField } from "../FormTextField";
import ImageUplaod from "../ImageUplaod";
import ShowText from "./ShowText";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  about: string;
  contactNo: string;
  birthdate: string;
  gender: string;
}

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  about: "",
  gender: "",
  contactNo: "",
  birthdate: "",
};
const imgUrl =
  "https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  email: yup.string().email("Invalid email").required("Email is required"),
});

const assignUserData = (userInfo: ProfileType) => {
  const {
    about,
    first_name,
    last_name,
    email,
    gender,
    birth_date,
    contact_number,
  } = userInfo;

  initialValues.about = about;
  initialValues.email = email;
  initialValues.birthdate = birth_date as string;
  initialValues.contactNo = contact_number as string;
  initialValues.gender = gender as string;
  initialValues.firstName = first_name as string;
  initialValues.lastName = last_name as string;
};

const UpdateProfile = () => {
  const [profileimage, setProfileImage] = React.useState<File | null>();
  const [userData, setUserData] = useState<ProfileType>();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    await axiosInstance
      .get("user/profile/")
      .then((res) => {
        setUserData(res.data);
        assignUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(userData);
  const handleSubmit = (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    alert(JSON.stringify(values, null, 2));
    let username = values.firstName + " " + values.lastName;
    let formData = new FormData();
    formData.append("user_name", username);
    formData.append("first_name", values.firstName);
    formData.append("last_name", values.lastName);
    formData.append("about", values.about);
    formData.append("contact_number", values.contactNo);
    formData.append("birth_date", values.birthdate);
    formData.append("gender", values.gender);

    if (profileimage) {
      formData.append("profile_image", profileimage);
    }

    let existEmail = localStorage.getItem("email");
    if (existEmail !== values.email) {
      formData.append("email", values.email);
    }

    axios
      .put(`${baseURL}user/profile/`, formData, {
        headers: {
          Authorization: localStorage.getItem("access_token")
            ? "JWT " + localStorage.getItem("access_token")
            : null,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        getUser();
        console.log(res.data);
      })
      .catch((error: any) => {
        console.log(error.response.data);
      });
  };
  return (
    <Container maxWidth="lg">
      <Grid
        sx={{
          marginTop: "100px",
        }}
        container
      >
        <Grid item xs={12}>
          <Box mb={3} p={2}>
            <Typography
              variant="h5"
              style={{
                lineHeight: 1.25,
                marginBottom: 8,
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              Update information
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              padding: "30px 20px",
            }}
          >
            <Box
              style={{
                position: "relative",
              }}
            >
              <img
                src={imgUrl}
                style={{
                  height: "170px",
                  objectFit: "cover",
                  width: "100%",
                }}
                alt="profile-img"
              />
              <Box
                style={{
                  position: "absolute",
                  top: "100px",
                  bottom: 0,
                  left: "50px",
                  right: 0,
                  margin: "auto",
                  width: "200px",
                  height: "100px",
                }}
              >
                <img
                  src={`http://127.0.0.1:8000${userData?.profile_image}`}
                  style={{
                    height: "130px",
                    objectFit: "cover",
                    width: "130px",
                    borderRadius: "50%",
                    margin: "0 auto",
                  }}
                  alt="profile-img"
                />
              </Box>
            </Box>
            <Box
              sx={{
                marginTop: "60px",
              }}
            >
              <ShowText label="First Name" data={userData?.first_name} />
              <ShowText label="Last Name" data={userData?.last_name} />
              <ShowText label="Email" data={userData?.email} />
              <ShowText label="User Name" data={userData?.user_name} />
              <ShowText label="Gender" data={userData?.gender} />
              <ShowText
                label="Contact Number"
                data={userData?.contact_number}
              />
              <ShowText label="Birth Date" data={userData?.birth_date} />
              <ShowText label="First Name" data={userData?.first_name} />
              {/* <ShowText label="Created " data={userData?.start_date} /> */}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={1}></Grid>

        <Grid item xs={12} md={6}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formikProps: FormikProps<FormValues>) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Field
                      name="firstName"
                      label="First Name"
                      size="medium"
                      value={formikProps.values.firstName}
                      component={FormTextField}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      name="lastName"
                      label="Last Name"
                      size="medium"
                      value={formikProps.values.lastName}
                      component={FormTextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="email"
                      value={formikProps.values.email}
                      label="Email"
                      size="medium"
                      component={FormTextField}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      value={formikProps.values.birthdate}
                      name="birthdate"
                      label="Birth Date"
                      type="date"
                      size="medium"
                      component={FormTextField}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      value={formikProps.values.contactNo}
                      type="number"
                      name="contactNo"
                      label="Contact No"
                      size="medium"
                      component={FormTextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="gender"
                      select
                      label="Gender"
                      margin="normal"
                      fullWidth
                      value={formikProps.values.gender}
                      onChange={formikProps.handleChange("gender")}
                    >
                      <MenuItem value="Male">
                        <em>Male</em>
                      </MenuItem>
                      <MenuItem value="Female">
                        <em>Female</em>
                      </MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      multiline
                      rows={4}
                      name="about"
                      value={formikProps.values.about}
                      label="About"
                      size="medium"
                      component={FormTextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ImageUplaod
                      postimage={profileimage}
                      setPostImage={setProfileImage}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="outlined"
                      size="large"
                      fullWidth
                      color="primary"
                      disabled={formikProps.isSubmitting}
                    >
                      Save All
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UpdateProfile;
