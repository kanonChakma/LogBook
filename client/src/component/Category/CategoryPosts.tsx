import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Link,
  Theme,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { SinglePostType } from "../../common/types";
import { alterImage } from "../Post";

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    color: "#4B5563",
    maxWidth: 300,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  media: {
    paddingTop: "56.25%",
  },
  content: {
    textAlign: "left",
    padding: theme.spacing(3),
    height: "60px",
    color: "#4B5563",
  },
  divider: {
    margin: `${theme.spacing(3)}px 0`,
  },
  heading: {
    fontWeight: "800",
    cursor: "pointer",
    textAlign: "center",
    marginBottom: "10px",
  },
  subheading: {
    lineHeight: 1.8,
  },
  avatar: {
    display: "inline-block",
    border: "2px solid white",
    "&:not(:first-of-type)": {
      marginLeft: -theme.spacing,
    },
  },
  cardfooter: {
    display: "flex",
    justifyContent: "space-between",
    borderTop: "1px solid rgba(0, 0, 0, .2)",
    paddingTop: "10px",
    alignItems: "centecardfooterimgr",
  },
  cardfooterimg: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginTop: "10px",
  },
}));

interface PostType {
  categoryPosts: SinglePostType[];
}

const CategoryPosts = ({ categoryPosts }: PostType) => {
  const classes = useStyles();
  console.log(categoryPosts);
  return (
    <>
      <Container maxWidth="xl" component="main">
        <Grid container spacing={2} alignItems="flex-end">
          {categoryPosts.map((post) => (
            <Grid item xs={12} md={4} lg={3} mt={5} key={post.id}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={`http://127.0.0.1:8000${post.post_image}`}
                />
                <CardContent className={classes.content}>
                  <Link color="textPrimary" href={"/post/" + post.slug}>
                    <Typography
                      className={classes.heading}
                      variant={"body1"}
                      gutterBottom
                    >
                      {post.title}
                    </Typography>
                  </Link>
                  <Typography
                    className={"MuiTypography--subheading"}
                    variant="body2"
                    gutterBottom
                  >
                    {post.excerpt.substring(0, 50)}....
                  </Typography>
                </CardContent>
                <CardContent>
                  <Box className={classes.cardfooter}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Box>
                        <img
                          className={classes.cardfooterimg}
                          src={
                            post.author_profile_image
                              ? `http://127.0.0.1:8000${post.author_profile_image}`
                              : alterImage
                          }
                          alt="img"
                        />
                      </Box>
                      <Box
                        display="flex"
                        flexDirection="column"
                        lineHeight="2px"
                      >
                        <Typography variant="caption">
                          {post.author_name}
                        </Typography>
                        <small>2 Hours ago</small>
                      </Box>
                    </Box>
                    <Box>
                      <Typography variant="body2">
                        <Link
                          style={{ color: "#4B5563" }}
                          href={`/category/${post.category_name}`}
                        >
                          {post.category_name}
                        </Link>
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default CategoryPosts;
