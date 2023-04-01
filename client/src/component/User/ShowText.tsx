import { Grid, Typography } from "@mui/material";
import React from "react";
interface types {
  label?: string;
  data?: string;
}
const ShowText = ({ label, data }: types) => {
  return (
    <Grid
      sx={{
        marginTop: "10px",
        justifyContent: "center",
        alignItems: "center",
      }}
      container
    >
      <Grid item xs={5}>
        <Typography variant="subtitle2">{label}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="subtitle1">{data}</Typography>
      </Grid>
    </Grid>
  );
};

export default ShowText;
