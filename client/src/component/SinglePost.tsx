import { Container, CssBaseline, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axios";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

interface PostType {
  author: number;
  content: string;
  excerpt: string;
  slug: string;
  status: string;
  title: string;
}
const SinglePost: React.FC = () => {
  const { slug } = useParams();
  const classes = useStyles();

  const [data, setData] = useState<PostType>();

  useEffect(() => {
    axiosInstance.get(`/${slug}`).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  }, [setData]);

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}></div>
      <div>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            {data?.title}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            {data?.excerpt}
          </Typography>
        </Container>
      </div>
    </Container>
  );
};

export default SinglePost;
