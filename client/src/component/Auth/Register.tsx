import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Box, Button, Fab, Grid, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import axios from "axios";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { baseURL } from "../../common/axios";
import { FormTextField } from "../FormTextField";
import ImageUplaod from "../ImageUplaod";

const Register = () => {
  const [profileimage, setProfileImage] = React.useState<File | null>();
  const navigate = useNavigate();

  interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  const initialValues: FormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = yup.object().shape({
    firstName: yup.string().required("Required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), ""], "Passwords must match"),
  });

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
    formData.append("email", values.email);
    formData.append("password", values.password);

    if (profileimage) {
      formData.append("profile_image", profileimage);
    }

    axios
      .post(`${baseURL}user/create/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        formikHelpers.setSubmitting(false);
        navigate("/auth/login");
      })
      .catch((error: any) => {
        console.log(error.response.data);
      });
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      style={{
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        item
        xs={12}
        md={7}
        sx={{
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          padding: { md: "40px 30px", xs: "20px" },
          textAlign: "center",
        }}
      >
        <Fab color="secondary" size="small" aria-label="edit">
          <LockOutlinedIcon />
        </Fab>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box sx={{ mt: 3, padding: "20px" }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formikProps: FormikProps<FormValues>) => (
              <Form noValidate autoComplete="off">
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Field
                      name="firstName"
                      label="First name"
                      size="medium"
                      component={FormTextField}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      name="lastName"
                      label="Last name"
                      size="medium"
                      component={FormTextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="email"
                      label="Email"
                      size="medium"
                      component={FormTextField}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Field
                      name="password"
                      label="Password"
                      size="medium"
                      type="password"
                      component={FormTextField}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Field
                      type="password"
                      name="confirmPassword"
                      label="Confirm Password"
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

                  <Grid item xs={12} my={2}>
                    <Button
                      fullWidth
                      type="submit"
                      variant="outlined"
                      size="large"
                      color="primary"
                      disabled={formikProps.isSubmitting}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/auth/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Register;
