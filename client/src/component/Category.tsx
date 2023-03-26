import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axios";

const Category: React.FC = () => {
  const { category_name } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .post("categories/", {
        category_name: category_name,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <div>Category</div>;
};

export default Category;
