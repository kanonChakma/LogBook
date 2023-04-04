import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { featchPostsByCategory } from "../../feature/categories/CategorySlice";
import { useAppDispatch, useAppSelector } from "../../feature/hook";
import CategoryPosts from "./CategoryPosts";

const Category: React.FC = () => {
  const { category_name } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    featchPosts(category_name as string);
  }, []);

  const featchPosts = async (category_name: string) => {
    try {
      await dispatch(featchPostsByCategory(category_name));
    } catch (error) {
      console.log(error);
    }
  };

  const posts = useAppSelector((state) => state.categories.categoryPosts);

  return (
    <Container maxWidth="lg">
      <Grid
        style={{
          marginTop: "100px",
        }}
      >
        {posts.length > 0 ? (
          <Box>
            <Typography
              style={{
                padding: "10px",
                textTransform: "uppercase",
                textAlign: "center",
                borderBottom: "1px solid gray",
              }}
              variant="h5"
            >
              {category_name} Category All Post
            </Typography>
            <CategoryPosts categoryPosts={posts} />
          </Box>
        ) : (
          <Typography
            style={{
              padding: "10px",
              textTransform: "uppercase",
              textAlign: "center",
              borderBottom: "1px solid gray",
            }}
            variant="h5"
          >
            There is no {category_name} Category Post
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Category;
