import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Avatar,
  Grid,
  Paper,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import Fab from "@mui/material/Fab";
import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../../common/axios";
import { CommentType } from "../../common/types";

const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

const commentDataType = {
  content: "",
  created_at: "",
  id: 0,
  post: 0,
  user: 0,
  user_profile_image: "",
  user_username: "",
} as CommentType;

const Comments = ({ id }: { id: number }) => {
  console.log({ id });
  const user = localStorage.getItem("userId");
  const formRef = useRef<HTMLFormElement>(null);

  const [comments, setComments] = useState<CommentType[]>([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    getComments();
  }, [id]);

  const getComments = async () => {
    await axiosInstance.get(`comment/${id}`).then((res) => {
      setComments(res.data);
      console.log(res.data);
    });
  };

  function handleSubmit(event: { preventDefault: () => void }) {
    axiosInstance
      .post(`comment/`, {
        content: comment,
        post: id,
        user: user,
      })
      .then((res) => {
        if (res.data.comment) {
          getComments();
        }
      });

    setComment("");
  }

  const handleKeyDown = (ev: { keyCode?: any; preventDefault: any }) => {
    if (ev.keyCode === 13) {
      // enter button
      // formRef.current?.submit()
      handleSubmit(ev);
      ev.preventDefault();
    }
  };

  const deleteCommnet = async (comment_id: number) => {
    await axiosInstance
      .delete(`post/${id}/comment/${comment_id}/`)
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <Grid>
      <Typography component="h4" variant="h4" align="left" color="textPrimary">
        Comments
      </Typography>

      {comments.length > 0 &&
        comments.map((comment: CommentType) => (
          <Paper
            key={comment.id}
            style={{ padding: "40px 20px", marginTop: 10 }}
          >
            <Grid sx={{}} alignItems="center" container>
              <Grid item xs={8}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Avatar
                      alt="Remy Sharp"
                      src={
                        comment.user_profile_image
                          ? comment.user_profile_image
                          : imgLink
                      }
                    />
                  </Grid>
                  <Grid justifyContent="left" item xs zeroMinWidth>
                    <h4 style={{ margin: 0, textAlign: "left" }}>
                      {comment.user_username}
                    </h4>
                    <Typography
                      style={{ textAlign: "left" }}
                      variant="subtitle2"
                      gutterBottom
                    >
                      {comment.content}.{" "}
                    </Typography>
                    <p style={{ textAlign: "left", color: "gray" }}>
                      posted{" "}
                      {new Date(comment.created_at).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={2}>
                {Number(user) === comment.user ? (
                  <Fab
                    style={{ marginRight: "20px" }}
                    size="small"
                    color="info"
                    aria-label="edit"
                  >
                    <EditIcon />
                  </Fab>
                ) : (
                  ""
                )}

                {Number(user) === comment.user ? (
                  <Fab size="small" color="warning" aria-label="edit">
                    <DeleteIcon onClick={() => deleteCommnet(comment.id)} />
                  </Fab>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
          </Paper>
        ))}
      <Grid item md={8} xs={12} mt={3} mb={5}>
        <div onKeyDown={handleKeyDown}>
          <form onSubmit={handleSubmit} ref={formRef}>
            <TextareaAutosize
              onChange={(e) => setComment(e.target.value)}
              aria-label="minimum height"
              minRows={8}
              placeholder="Write Your Comment this post!!!!"
              style={{ width: "100%", padding: "10px" }}
              value={comment}
            />
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Comments;
