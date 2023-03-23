import { Flex, Text, Card } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
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
  border-radius: 3%;
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
        top: "45%",
        left: "5rem",
        zIndex: 1,
        width: "40px",
        height: "40px",
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
        top: "45%",
        right: "5rem",
        zIndex: 1,
        width: "40px",
        height: "40px",
      }}
    />
  );
};

const LikedList = () => {
  const { error, data } = useQuery(["house"], getWishLists);
  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }

  if (!data) {
    return <div>로딩 중입니다.</div>;
  }

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
      <Slider {...settings}>
        {data &&
          data?.map((item, idx) => (
            <Card key={idx} maxW="200px" m="10px" overflow={"hidden"} ml="2rem">
              <Link to={`/houseList/house/${item.house.id}`}>
                <HouseImg src={item.house.thumnail} />
              </Link>

              <Text fontWeight={"600"} mb="1rem">
                {item.house.title}
              </Text>
              <Flex fontSize={"sm"}>
                <Text mr="1rem">{SellKindsToFront[item.house.sell_kind]}</Text>
                <Text>{RoomKindsToFront[item.house.room_kind]}</Text>
              </Flex>

              <Flex>
                <Text fontSize={"sm"} mb="1rem" color={"#ff404c"}>
                  {`${getSaleContents(
                    item.house.sell_kind,
                    item.house.deposit,
                    item.house.monthly_rent,
                    item.house.sale
                  )}`}
                </Text>
              </Flex>
            </Card>
          ))}
      </Slider>
    </SlideWrapper>
  );
};

export default LikedList;
