import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Container, Grid, Link, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../common/axios";
import { SinglePostType } from "../common/types";
import Comments from "./Comments/Comments";
const dataTpe = {
  id: 0,
  content: "",
  excerpt: "",
  slug: "",
  status: "",
  title: "",
  post_image: "",
  author_name: "",
  author_profile_image: "",
  published: new Date(),
} as SinglePostType;

const SinglePost: React.FC = () => {
  const { slug } = useParams();

  const [data, setData] = useState<SinglePostType>(dataTpe);
  const user = localStorage.getItem("userId");

  useEffect(() => {
    axiosInstance.get(`post/${slug}`).then((res) => {
      setData(res.data[0]);
      console.log(res.data);
    });
  }, []);

  console.log({ data });

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
              objectFit: "cover",
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
          sx={{
            marginTop: "10px",
          }}
        >
          <Box>
            <Box display="flex" alignItems="center" gap={2}>
              <Box>
                <img
                  style={{
                    width: "60px",
                    height: "50px",
                    marginTop: "10px",
                    objectFit: "cover",
                  }}
                  src={data?.author_profile_image}
                  alt="img"
                />
              </Box>
              <Box display="flex" flexDirection="column" lineHeight="2px">
                <Typography variant="body1">
                  <Link href={`/profile/${data.author_name}`}>
                    {data?.author_name}
                  </Link>
                </Typography>
                <small>{moment(data?.published).fromNow()}</small>
              </Box>
            </Box>
          </Box>
          <Box display="flex">
            {parseInt(user as string) === data.author ? (
              <>
                <Box marginRight="1rem">
                  <EditIcon color="primary" />
                </Box>
                <Box marginRight="1rem">
                  <DeleteIcon color="warning" />
                </Box>
              </>
            ) : (
              ""
            )}
          </Box>
        </Grid>

        <Grid item xs={12} mb={3} pt={5}>
          <Typography variant="subtitle1">{data?.content}</Typography>
        </Grid>
        <Grid item xs={10}>
          <Comments id={data.id as number} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SinglePost;
