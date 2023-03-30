import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import * as React from "react";
import * as yup from "yup";
import { FormTextField } from "../FormTextField";

interface FormValues {
  name: string;
  description: string;
}

// the Formik component supports yup validation out-of-the-box via the `validationSchema` prop
const validationSchema = yup.object().shape({
  name: yup.string().required("Required"),
  description: yup.string().required("Required"),
});

export default function App() {
  return (
    <Container maxWidth="md">
      <Box mb={3} p={2}>
        <Typography
          align="center"
          variant="h5"
          style={{ lineHeight: 1.25, marginBottom: 16 }}
        >
          Formik with TypeScript and Material UI <br />
          with Validation by Yup
        </Typography>
        <Typography align="center">
          Submit the form with empty fields to view validation errors.
        </Typography>
      </Box>
      <Formik
        initialValues={{
          name: "",
          description: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(
          values: FormValues,
          formikHelpers: FormikHelpers<FormValues>
        ) => {
          alert(JSON.stringify(values, null, 2));
          formikHelpers.setSubmitting(false);
        }}
      >
        {(formikProps: FormikProps<FormValues>) => (
          <Form noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  name="name"
                  label="Name"
                  size="small"
                  component={FormTextField}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="description"
                  label="Description"
                  size="small"
                  component={FormTextField}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
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
    </Container>
  );
}
