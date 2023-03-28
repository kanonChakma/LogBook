import { Grid, Link } from "@mui/material";
import React from "react";

const PageNotFoundView = () => {
  return (
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
        <h1>Page Not Found!!!!</h1>
        <Link href="/">back Home</Link>
      </Grid>
    </Grid>
  );
};

export default PageNotFoundView;
