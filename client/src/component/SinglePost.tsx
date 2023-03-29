import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Avatar,
  Box,
  Container,
  Grid,
  Paper,
  TextareaAutosize,
  Theme,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../common/axios";
import { SinglePostType } from "../common/types";
import Comments from "./Comments/Comments";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));


const dataTpe = {
  id:0,
  content: "",
  excerpt: "",
  slug: "",
  status: "",
  title: "",
  post_image: "",
} as SinglePostType;

const SinglePost: React.FC = () => {
  const { slug } = useParams();
  const classes = useStyles();

  const [data, setData] = useState<SinglePostType>(dataTpe);

  const [text, setText] = React.useState("");

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setText(event.target.value);
  };

  useEffect(() => {
    axiosInstance.get(`post/${slug}`).then((res) => {
      setData(res.data[0]);
      console.log(res.data);
    });
  }, [setData, slug]);

  return (
    <Container maxWidth="lg">
      <Grid sx={{ marginTop: { md: "150px", sx: "200px" } }} gap={3} container>
        <Grid item xs={12}>
          <Typography
            component="h5"
            variant="h5"
            align="left"
            color="textPrimary"
            gutterBottom
            textAlign="center"
           borderBottom="2px solid gray" 
           fontWeight="bold"
          >
            {data?.title.toUpperCase()}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Box
            component="img"
            sx={{
              height: 370,
              width: "100%",
              objectFit:'cover'
            }}
            alt="The house from the offer."
            src={data?.post_image}
          />
        </Grid>

        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{}}
        >
          <Box>
            <p>Author</p>
          </Box>
          <Box display="flex">
            <Box marginRight="1rem">
              <EditIcon color="primary" />
            </Box>
            <Box marginRight="1rem">
              <DeleteIcon color="warning" />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} mb={3} pt={5}>
          <Typography variant="subtitle1">
          {data?.content}
          </Typography>
        </Grid>
         <Grid item xs={10}>
           <Comments id={data.id as number}/>
         </Grid>
      </Grid>
    </Container>
  );
};

export default SinglePost;
