import {
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { CategoryType } from "../../common/types";
import { slugify } from "../../common/utils";
import {
  fetchCategories,
  getAllCategories,
} from "../../feature/categories/CategorySlice";
import { useAppDispatch, useAppSelector } from "../../feature/hook";
import ImageUplaod from "../ImageUplaod";
import TextEditor from "./TextEditor";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "50px",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    marginTop: "10px",
  },
}));

const Create: React.FC = () => {
  const [value, setValue] = useState("");

  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    title: "",
    slug: "",
    excerpt: "",
    category: "",
  });

  const [postData, setPostData] = useState(initialFormData);
  const [postimage, setPostImage] = useState<File | null>();

  const dispatch = useAppDispatch();
  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      await dispatch(fetchCategories());
    } catch (error) {
      console.log(error);
    }
  };

  const categories: CategoryType[] = useAppSelector(getAllCategories);

  const handleChange = (e: { target: { name: any; value: string } }) => {
    if (e.target.name === "title") {
      setPostData({
        ...postData,
        [e.target.name]: e.target.value.trim(),
        ["slug" as string]: slugify(e.target.value.trim()),
      });
    } else {
      setPostData({
        ...postData,
        [e.target.name]: e.target.value.trim(),
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let userId = localStorage.getItem("userId");

    let formData = new FormData();
    formData.append("title", postData.title);
    formData.append("slug", postData.slug);
    formData.append("author", userId as string);
    formData.append("excerpt", postData.excerpt);
    formData.append("content", value);
    formData.append("category", postData.category);
    if (postimage) {
      formData.append("post_image", postimage);
    }
    axios
      .post("http://127.0.0.1:8000/api/admin/post/", formData, {
        headers: {
          Authorization: localStorage.getItem("access_token")
            ? "JWT " + localStorage.getItem("access_token")
            : null,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        navigate("/admin/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        style={{
          minHeight: "100vh",
        }}
      >
        <Grid
          item
          xs={12}
          md={9}
          gap={3}
          sx={{
            boxShadow:
              "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
            padding: " 50px 30px",
            textAlign: "center",
          }}
        >
          <Typography component="h1" variant="h5"></Typography>
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="title"
                  label="Post Title"
                  name="title"
                  autoComplete="title"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="slug"
                  label="slug"
                  name="slug"
                  autoComplete="slug"
                  value={postData.slug}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="excerpt"
                  label="Post Excerpt"
                  name="excerpt"
                  autoComplete="excerpt"
                  onChange={handleChange}
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <ImageUplaod
                  postimage={postimage}
                  setPostImage={setPostImage}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="category"
                  select
                  label="Category"
                  margin="normal"
                  fullWidth
                  name="category"
                  onChange={handleChange}
                >
                  {categories.map((cate) => (
                    <MenuItem value={cate.name} key={cate.id}>
                      <em>{cate.name}</em>
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} mb={5}>
                <TextEditor value={value} setValue={setValue} />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              size="large"
              variant="outlined"
              color="primary"
              style={{
                marginTop: "30px",
              }}
            >
              Create Post
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Create;
