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
import moment from "moment";
import React from "react";
import { SinglePostType } from "../common/types";

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    color: "#4B5563",
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
    textAlign: "start",
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
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    marginTop: "12px",
    objectFit: "cover",
  },
}));
export const alterImage =
  "https://images.unsplash.com/photo-1597089542047-b9873d82d8ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";

const Post = ({
  title,
  excerpt,
  slug,
  post_image,
  category_name,
  author_name,
  published,
  author_profile_image,
}: SinglePostType) => {
  const classes = useStyles();
  const myDateTime = new Date(published);
  const myDate = myDateTime.toLocaleDateString("en-US", {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });
  return (
    <Grid item xs={12} md={4} lg={3} mt={3}>
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={post_image} />
        <CardContent className={classes.content}>
          <Link color="textPrimary" href={"/post/" + slug}>
            <Typography
              className={classes.heading}
              variant={"body2"}
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
            {excerpt.substring(0, 50)}....
          </Typography>
        </CardContent>
        <CardContent>
          <Box className={classes.cardfooter}>
            <Box display="flex" alignItems="center" gap={1}>
              <Box>
                <img
                  className={classes.cardfooterimg}
                  src={author_profile_image ? author_profile_image : alterImage}
                  alt="img"
                />
              </Box>
              <Box display="flex" flexDirection="column" lineHeight="2px">
                <Typography variant="caption">
                  <Link
                    style={{ color: "#4B5563" }}
                    href={`/profile/${author_name}`}
                  >
                    {author_name}
                  </Link>
                </Typography>

                <small>{moment(published).fromNow()}</small>
              </Box>
            </Box>
            <Box>
              <Typography variant="body2">
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
