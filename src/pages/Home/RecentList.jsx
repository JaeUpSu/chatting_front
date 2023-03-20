import { Flex } from "@chakra-ui/layout";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { getHouseLists } from "./../../services/api";

const HouseImg = styled.img`
  max-width: 200px;
  margin-right: 4rem;
  cursor: pointer;
  transition: transform 0.5s ease-in-out;
`;

const FontFam = styled.p`
  font-weight: 600;
  margin-right: 10px;
`;

const RecentWrapper = styled.div`
  width: 1000px;
  margin: 0 auto;
  overflow: hidden;
`;

const RecentList = () => {
  const { data } = useQuery(["list"], getHouseLists);
  const recentList = data && data.filter((item) => item.house).slice(0, 10);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
  };

  return (
    <RecentWrapper>
      <Slider {...settings}>
        {recentList &&
          recentList.map((item, index) => (
            <div key={index}>
              <HouseImg src={item.thumnail} />
              <Flex>
                <FontFam>{item.room_kind}</FontFam>
                <p>Room: {item.room}</p>
              </Flex>
              <Flex>
                <FontFam> {item.deposit}</FontFam>
                <p> {item?.monthly_rent}</p>
              </Flex>
            </div>
          ))}
      </Slider>
    </RecentWrapper>
  );
};

export default RecentList;
