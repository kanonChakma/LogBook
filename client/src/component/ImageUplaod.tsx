import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, Typography } from "@mui/material";
import React from "react";
import Dropzone from "react-dropzone";
import FlexBetween from "./FlexBetween";

interface ImageUplaodType {
  postimage: File | null | undefined;
  setPostImage: React.Dispatch<React.SetStateAction<File | null | undefined>>;
}

const ImageUplaod = ({ postimage, setPostImage }: ImageUplaodType) => {
  return (
    <Box
      gridColumn="span 4"
      border={`1px solid gray`}
      borderRadius="5px"
      p="1rem"
    >
      <Dropzone
        multiple={false}
        onDrop={(acceptedFiles) => setPostImage(acceptedFiles[0])}
      >
        {({ getRootProps, getInputProps }) => (
          <Box
            {...getRootProps()}
            border={`2px dashed red`}
            p="1rem"
            sx={{ "&:hover": { cursor: "pointer" } }}
          >
            <input {...getInputProps()} />
            {!postimage ? (
              <p>Add Picture Here</p>
            ) : (
              <FlexBetween>
                <Typography>{postimage?.name}</Typography>
                <EditOutlinedIcon />
              </FlexBetween>
            )}
          </Box>
        )}
      </Dropzone>
    </Box>
  );
};

export default ImageUplaod;
