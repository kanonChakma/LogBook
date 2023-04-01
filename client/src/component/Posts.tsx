import { Container, Grid } from "@mui/material";
import React from "react";
import { SinglePostType } from "../common/types";
import Post from "./Post";

interface PostType {
  posts: SinglePostType[];
}

const Posts = ({ posts }: PostType) => {
  return (
    <React.Fragment>
      <Container maxWidth="xl" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {posts.map(
            ({
              title,
              excerpt,
              slug,
              post_image,
              category_name,
              author_name,
              content,
              author_profile_image,
              published,
            }) => (
              <Post
                key={`${title}+1`}
                title={title}
                excerpt={excerpt}
                slug={slug}
                post_image={post_image}
                category_name={category_name}
                author_name={author_name}
                content={content}
                author_profile_image={author_profile_image}
                published={published}
              />
            )
          )}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Posts;
