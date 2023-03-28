import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Theme,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { SinglePostType } from "../common/types";

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
    height: "100px",
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
    alignItems: "center",
  },
  cardfooterimg: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
  },
}));

const Post = ({
  title,
  excerpt,
  slug,
  post_image,
  category_name,
  author_name,
  author_profile_image,
}: SinglePostType) => {
  console.log(post_image);
  const classes = useStyles();
  return (
    <Grid item xs={12} md={4} lg={4} mt={5}>
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={post_image} />
        <CardContent className={classes.content}>
          <Link color="textPrimary" href={"/post/" + slug}>
            <Typography
              className={classes.heading}
              variant={"body1"}
              gutterBottom
            >
              {title}
            </Typography>
          </Link>
          <Typography
            className={"MuiTypography--subheading"}
            variant="body2"
            gutterBottom
          >
            {excerpt.substring(0, 100)}
          </Typography>
        </CardContent>
        <CardContent>
          <Box className={classes.cardfooter}>
            <Box display="flex" alignItems="center" gap={0.5}>
              <Box>
                <img
                  className={classes.cardfooterimg}
                  src={author_profile_image}
                  alt="img"
                />
              </Box>
              <Box display="flex" flexDirection="column" lineHeight="2px">
                <Typography variant="caption">{author_name}</Typography>
                <small>2 Hours ago</small>
              </Box>
            </Box>
            <Box>
              <Typography variant="button">
                <Link
                  style={{ color: "#4B5563" }}
                  href={`/category/${category_name}`}
                >
                  {category_name}
                </Link>
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Post;
