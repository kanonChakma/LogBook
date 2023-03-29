import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Container,
  Grid,
  Paper,
  TextareaAutosize,
  Theme,
  Typography,
} from "@mui/material";
import axiosInstance from "../../common/axios";
import { CommentType } from "../../common/types";
import Fab from "@mui/material/Fab";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";

const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

  const commentDataType ={
    content:"",
    created_at:"",
    id:0,
    post:0,
    user:0,
    user_profile_image: ""
  } as CommentType;

  const Comments = ({id}:{id:number}) => {

    const formRef = useRef<HTMLFormElement>(null)
    
    const [comments, setComments] = useState<CommentType[]>([])
    const [comment, setComment] = useState("")

    useEffect(() => {
      axiosInstance.get(`comment/${id}`).then((res) => {
        setComments(res.data);
        console.log(res.data);
      });
    }, []);
  
  
    function handleSubmit(event: { preventDefault: () => void; }){
      console.log("hello dsfg sdfg sfd ")
      console.log(comment)
      axiosInstance.post(`comment/${id}`, {comment}).then((res) => {
        console.log(res.data)
        comments.unshift( res.data)  
      })

      setComment("")
    }

    const handleKeyDown = (ev: { keyCode?: any; preventDefault: any; })=>{
        if(ev.keyCode ===13){ // enter button
          // formRef.current?.submit()
          handleSubmit(ev);
          ev.preventDefault();
         }
   }

  return (
    <Grid>
      <Typography
            component="h4"
            variant="h4"
            align="left"
            color="textPrimary"
          >
            Comments
      </Typography>
     
       {
        comments.length > 0 && comments.map((comment:CommentType) => (
          <Paper style={{ padding: "40px 20px", marginTop: 10 }}>
          <Grid
          sx={{

          }}
          alignItems="center"
          container>
            <Grid item xs={8}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Avatar alt="Remy Sharp" src={comment.user_profile_image?comment.user_profile_image:imgLink} />
                  </Grid>
                  <Grid justifyContent="left" item xs zeroMinWidth>
                    <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
                    <Typography style={{ textAlign: "left"}} variant="subtitle2" gutterBottom>
                    {comment.content}.{" "}
                    </Typography>
                    <p style={{ textAlign: "left", color: "gray" }}>
                      posted {comment.created_at} minute ago
                    </p>
                  </Grid>
                </Grid>
            </Grid>
            <Grid item xs={2}></Grid>
              <Grid item xs={2}>
                <Fab style={{marginRight:"20px"}} size="small" color="info" aria-label="edit">
                   <EditIcon/>
                </Fab>
                <Fab  size="small" color="warning" aria-label="edit">
                   <DeleteIcon />
                </Fab>
              </Grid>      
          </Grid>
          </Paper>
         ))
       }
         <Grid item md={8} xs={12} mt={3} mb={5}>
           <div onKeyDown={handleKeyDown}>
           <form onSubmit={handleSubmit}  ref={formRef}>
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
  )
}

export default Comments