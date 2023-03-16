import { Flex } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HouseImg = styled.img`
  max-width: 200px;
  margin-right: 60px;
  cursor: pointer;
  transition: transform 0.5s ease-in-out;
`;

const FontFam = styled.p`
  font-weight: 600;
  margin-right: 10px;
`;

const LikedWrapper = styled.div`
  max-width: 1000px;
  overflow: hidden;
  margin: 0 auto;
  margin-bottom: 50px;
`;

const LikedList = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["list"],
    queryFn: () =>
      fetch(`http://localhost:5000/list`).then((res) => res.json()),
  });
  const likedList = data && data.filter((item) => item.isLike).slice(0, 11);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
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

  return (
    <LikedWrapper>
      <Slider {...settings}>
        {likedList &&
          likedList.map((item, index) => (
            <div key={index}>
              <HouseImg src={item.img} />
              <Flex>
                <FontFam>{item.type}</FontFam>
                <p>Room: {item.room}</p>
              </Flex>
              <Flex>
                <FontFam> {item.totalPrice}</FontFam>
                <p> {item?.rent}</p>
              </Flex>
            </div>
          ))}
      </Slider>
    </LikedWrapper>
  );
};

export default LikedList;
