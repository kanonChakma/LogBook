import { Grid, Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { CategoryType } from "../types/category";
import axiosInstance from "../utils/axios";

var settings = {
  dots: false,
  infinite: true,
  speed: 2000,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  variableWidth: true,
  autoplay: true,
  autoplaySpeed: 4000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
const tabss = [
  {
    name: "hello1",
    id: 1,
  },
  {
    name: "hello2",
    id: 2,
  },
  {
    name: "hello3",
    id: 3,
  },
  {
    name: "hello4",
    id: 4,
  },
  {
    name: "hello5",
    id: 5,
  },
  {
    name: "hello6",
    id: 6,
  },
  {
    name: "hello7",
    id: 7,
  },
  {
    name: "hello8",
    id: 8,
  },
];

const Tabs = () => {
  const [tabs, setTabs] = useState<CategoryType[]>([]);

  useEffect(() => {
    axiosInstance
      .get("categories/")
      .then((res) => {
        console.log(res.data);
        setTabs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Grid
      maxWidth="lg"
      sx={{
        position: "fixed",
        zIndex: 1000,
      }}
    >
      <Grid>
        <Slider {...settings}>
          {tabs.map((v) => (
            <div key={v.id} style={{ width: "auto", cursor: "pointer" }}>
              <Link
                href={`/category/${v.name}`}
                style={{ textDecoration: "none" }}
              >
                <h3
                  style={{
                    cursor: "pointer",
                    marginRight: "30px",
                    color: "#4B5563",
                  }}
                >
                  {v.name}
                </h3>
              </Link>
            </div>
          ))}
        </Slider>
      </Grid>
      <hr />
    </Grid>
  );
};

export default Tabs;
