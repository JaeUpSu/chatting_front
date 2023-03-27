import { Flex, Text, Card, Box, Grid } from "@chakra-ui/react";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getWishLists } from "../../services/api";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SellKindsToFront, RoomKindsToFront } from "../../services/data";
import { landing } from "../../services/landing";
import { Link } from "react-router-dom";
import { getSaleContents } from "../../utils/getSaleContents";

const HouseImg = styled.img`
  position: relative;
  height: 400px;
  width: 500px;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.5s ease-in-out;
`;

const SlideWrapper = styled.div`
  width: 1200px;
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
        color: "black",
        top: "63%",
        zIndex: 1,
        left: "5rem",
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
        color: "black",
        top: "63%",
        left: "25rem",
        zIndex: 1,
      }}
    />
  );
};

const IconBtns = ({ src, children }) => {
  const { error, data } = useQuery(["house"], getWishLists);
  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }

  if (!data) {
    return <div>로딩 중입니다.</div>;
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <SlideWrapper>
      <Slider {...settings}>
        {data &&
          data?.map((item, idx) => (
            <Box
              key={idx}
              maxW="1000px"
              h="500px"
              m="10px"
              overflow={"hidden"}
              mr="20px"
              border={"2px solid black"}
              boxShadow={"5px 5px"}
            >
              <HouseImg src={item.house.thumnail} />
              <Box m="1rem">
                <Text fontWeight={"600"} fontSize={"3xl"} mt="0.5rem">
                  {item.house.title}
                </Text>
                <Flex fontSize={"sm"}>
                  <Text mr="1rem" marginBottom="2px">
                    {SellKindsToFront[item.house.sell_kind]}
                  </Text>
                  <Text>{RoomKindsToFront[item.house.room_kind]}</Text>
                </Flex>
              </Box>
            </Box>
          ))}
      </Slider>
    </SlideWrapper>
  );
};

export default IconBtns;
