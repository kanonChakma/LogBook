import React from "react";
import ReactQuill from "react-quill";

const modules = {
  toolbar: [
    //[{ 'font': [] }],
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
    ["clean"],
  ],
};

const formats = [
  //'font',
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "align",
  "color",
  "background",
];
interface TextEditorType {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}
const TextEditor = ({ value, setValue }: TextEditorType) => {
  return (
    <ReactQuill
      style={{ height: "170px" }}
      theme="snow"
      modules={modules}
      formats={formats}
      value={value}
      onChange={setValue}
    />
  );
};

export default TextEditor;
