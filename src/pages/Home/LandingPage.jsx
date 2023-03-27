import { Flex, Text, Card, Box, Grid } from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { landing } from "../../services/landing";

const HouseImg = styled.img`
  position: relative;
  height: 600px;
  width: 100%;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.5s ease-in-out;
`;

const SlideWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  margin-left: 3rem;
`;

const LandingPage = () => {
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
  };

  return (
    <SlideWrapper>
      <Slider {...settings}>
        {landing &&
          landing?.map((item, idx) => (
            <Box
              key={idx}
              maxW="1300px"
              h="auto"
              m="10px"
              overflow={"hidden"}
              mr="20px"
            >
              <HouseImg src={item.img} />
            </Box>
          ))}
      </Slider>
    </SlideWrapper>
  );
};

export default LandingPage;
