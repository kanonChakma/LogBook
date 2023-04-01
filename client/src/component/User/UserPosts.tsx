import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Theme,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../common/axios";
import { SinglePostType } from "../../common/types";

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    color: "#4B5563",
    maxWidth: 250,
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

interface PostType {
  profile_name: string;
}

const UserPosts = ({ profile_name }: PostType) => {
  const classes = useStyles();
  const [userPosts, setUserPosts] = useState<SinglePostType[]>();

  useEffect(() => {
    axiosInstance
      .get(`post/${profile_name}`)
      .then((res) => {
        console.log(res.data);
        setUserPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [profile_name]);
  return (
    <>
      <Grid container alignItems="flex-end">
        {userPosts?.map((post) => (
          <Grid item xs={6} md={4} lg={3} mt={5} key={post.id}>
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
                  {post.excerpt.substring(0, 100)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default UserPosts;
