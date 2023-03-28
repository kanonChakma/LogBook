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

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));
const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

const dataTpe = {
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
            component="h4"
            variant="h4"
            align="left"
            color="textPrimary"
            gutterBottom
          >
            {data?.title}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Box
            component="img"
            sx={{
              height: 370,
              width: "100%",
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

        <Grid item xs={12} mb={3}>
          <p>{data?.content}</p>
          <p>
            orem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.Why do we use it?It is a
            long established fact that a reader will be distracted by the
            readable content of a page when looking at its layout. The point of
            using Lorem Ipsum is that it has a more-or-less normal distribution
            of letters, as opposed to using 'Content here, content here', making
            it look like readable English. Many desktop publishing packages and
            web page editors now use Lorem Ipsum as their default model text,
            and a search for 'lorem ipsum' will uncover many web sites still in
            their infancy. Various versions have evolved over the years,
            sometimes by accident, sometimes on purpose (injected humour and the
            like).Where does it come from?Contrary to popular belief, Lorem
            Ipsum is not simply random text. It has roots in a piece of
            classical Latin literature from 45 BC, making it over 2000 years
            old. Richard McClintock, a Latin professor at Hampden-Sydney College
            in Virginia, looked up one of the more obscure Latin words,
            consectetur, from a Lorem Ipsum passage, and going through the cites
            of the word in classical literature, discovered the undoubtable
            source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de
            Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
            Cicero, written in 45 BC. This book is a treatise on the theory of
            ethics, very popular during the Renaissance. The first line of Lorem
            Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section
            1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is
            reproduced below for those interested. Sections 1.10.32 and 1.10.33
            from "de Finibus Bonorum et Malorum" by Cicero are also reproduced
            in their exact original form, accompanied by English versions from
            the 1914 translation by H. Rackham.
          </p>
        </Grid>

        <Box>
          <Typography
            component="h4"
            variant="h4"
            align="left"
            color="textPrimary"
          >
            Comments
          </Typography>
          <Paper style={{ padding: "40px 20px", marginTop: 10 }}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar alt="Remy Sharp" src={imgLink} />
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
                <p style={{ textAlign: "left" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean luctus ut est sed faucibus. Duis bibendum ac ex
                  vehicula laoreet. Suspendisse congue vulputate lobortis.
                  Pellentesque at interdum tortor. Quisque arcu quam, malesuada
                  vel mauris et, posuere sagittis ipsum. Aliquam ultricies a
                  ligula nec faucibus. In elit metus, efficitur lobortis nisi
                  quis, molestie porttitor metus. Pellentesque et neque risus.
                  Aliquam vulputate, mauris vitae tincidunt interdum, mauris mi
                  vehicula urna, nec feugiat quam lectus vitae ex.{" "}
                </p>
                <p style={{ textAlign: "left", color: "gray" }}>
                  posted 1 minute ago
                </p>
              </Grid>
            </Grid>
          </Paper>

          <Grid item md={8} sm={12} mt={3} mb={5}>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={8}
              placeholder="Write Your Comment this post!!!!"
              style={{ width: "100%", padding: "10px" }}
            />
          </Grid>
        </Box>
      </Grid>
    </Container>
  );
};

export default SinglePost;
