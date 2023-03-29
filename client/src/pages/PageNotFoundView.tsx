import { Grid, Link } from "@mui/material";
import React from "react";

const PageNotFoundView = () => {
  return (
    <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: '100vh' }}
    >
      <Grid item xs={6}>
        <h1>Page Not Found!!!!</h1>
        <Link href="/">back Home</Link>
      </Grid>
    </Grid>
  );
};

export default PageNotFoundView;
