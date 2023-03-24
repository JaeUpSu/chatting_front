import React from "react";
import { Flex, Text, Card, Box } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getWishLists } from "../../services/api";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SellKindsToFront, RoomKindsToFront } from "../../services/data";
import { Link } from "react-router-dom";
import { getSaleContents } from "../../utils/getSaleContents";

const HouseImg = styled.img`
  position: relative;
  cursor: pointer;
  overflow: hidden;
  width: 200px;
  height: 200px;
  transition: transform 0.5s ease-in-out;
`;

const SlideWrapper = styled.div`
  width: 1000px;
  margin: 0 auto;
  overflow: hidden;
`;

const PrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        ...props.style,
        display: "block",
        position: "absolute",
        border: "none",
        background: "transparent",
        color: "transparent",
        top: "40%",
        zIndex: 1,
        left: "7rem",
      }}
    />
  );
};

const NextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        ...props.style,
        display: "block",
        position: "absolute",
        border: "none",
        background: "transparent",
        color: "transparent",
        top: "40%",
        left: "54rem",
        zIndex: 1,
      }}
    />
  );
};
function Topview() {
  const settings = {
    dots: false,
    infinite: data && data.length < 4 ? false : true,
    speed: 500,
    slidesToShow: data && data.length < 4 ? data && data.length : 4,
    slidesToScroll: 2,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    autoplay: true,
    autoplaySpeed: 4000,
  };
  return (
    <SlideWrapper>
      <Slider {...settings}></Slider>
    </SlideWrapper>
  );
}

export default Topview;
