import React from 'react'
import { useState, useEffect } from "react";
import axiosInstance from '../utils/axios';
import { Box, Container } from "@mui/material";
import Posts from "../component/Posts";

const Search:React.FC = () => {
   const[posts, setPosts] = useState([])
   const search = 'search';
   console.log(window.location.search)
   useEffect(()=>{
     axiosInstance.get(search+'/'+window.location.search)
     .then((res) => {
            setPosts(res.data)
            console.log(res.data)  
       })
   },[]) 

  return (
    <Container maxWidth="xl">
    <Box sx={{ marginTop: "200px" }}>
      <Posts posts={posts} />
    </Box>
  </Container>
  )
}

export default Search