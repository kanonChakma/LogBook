import { Container, Grid } from "@mui/material";
import React from "react";
import Post from "./Post";

export interface postInfo {
  title: string;
  excerpt: string;
  slug: string;
}
interface PostType {
  posts: postInfo[];
}

const Posts = ({ posts }: PostType) => {
  return (
    <React.Fragment>
      <Container maxWidth="xl" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {posts.map(({ title, excerpt, slug }) => (
            <Post
              key={`${title}+1`}
              title={title}
              excerpt={excerpt}
              slug={slug}
            />
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Posts;
