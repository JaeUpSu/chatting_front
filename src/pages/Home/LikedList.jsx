import { Flex } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getWishLists } from "../../services/api";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SellKindsToFront, RoomKindsToFront } from "../../services/data";

const HouseImg = styled.img`
  width: 200px;
  height: 250px;
  margin-right: 4rem;
  cursor: pointer;
  transition: transform 0.5s ease-in-out;
`;

const FontFam = styled.p`
  font-weight: 600;
  margin-right: 10px;
`;

const SlideWrapper = styled.div`
  width: 1000px;
  margin: 0 auto;
  overflow: hidden;
`;

const LikedList = () => {
  const { data } = useQuery(["house"], getWishLists);

  const settings = {
    dots: false,
    infinite: data && data.length < 4 ? false : true,
    speed: 500,
    slidesToShow: data && data.length < 4 ? data && data.length : 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <SlideWrapper>
      <Slider {...settings}>
        {data &&
          data?.map((item, idx) => (
            <div key={idx}>
              <HouseImg src={item.house.thumnail} />
              <FontFam>{item.house.title}</FontFam>
              <Flex>
                <FontFam>{SellKindsToFront[item.house.sell_kind]}</FontFam>
                <FontFam>{RoomKindsToFront[item.house.room_kind]}</FontFam>
              </Flex>

              <Flex>
                <FontFam>
                  {item?.house.deposit !== 0
                    ? item?.house.deposit
                    : item?.house.sale !== 0
                    ? item?.house.sale
                    : null}
                </FontFam>
                <p>
                  {item?.house.monthly_rent !== 0
                    ? item?.house.monthly_rent
                    : null}
                </p>
              </Flex>
            </div>
          ))}
      </Slider>
    </SlideWrapper>
  );
};

export default LikedList;
