import {
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../common/axios";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Create: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const initialFormData = Object.freeze({
    id: "",
    title: "",
    slug: "",
    excerpt: "",
    content: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  useEffect(() => {
    axiosInstance.get("admin/edit/postdetail/" + id).then((res) => {
      updateFormData({
        ...formData,
        ["title" as string]: res.data.title,
        ["excerpt" as string]: res.data.excerpt,
        ["slug" as string]: res.data.slug,
        ["content" as string]: res.data.content,
      });
      console.log(res.data);
    });
  }, [updateFormData]);

  const handleChange = (e: { target: { name: any; value: string } }) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    axiosInstance.put(`admin/edit/` + id + "/", {
      title: formData.title,
      slug: formData.slug,
      author: 1,
      excerpt: formData.excerpt,
      content: formData.content,
    });
    navigate({
      pathname: "/admin/",
    });
    window.location.reload();
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Edit Post
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Post Title"
                name="title"
                autoComplete="title"
                value={formData.title}
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
                value={formData.excerpt}
                onChange={handleChange}
                multiline
                rows={8}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="slug"
                label="slug"
                name="slug"
                autoComplete="slug"
                value={formData.slug}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="content"
                label="content"
                name="content"
                autoComplete="content"
                value={formData.content}
                onChange={handleChange}
                multiline
                rows={8}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update Post
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Create;
