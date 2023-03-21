import { Flex } from "@chakra-ui/layout";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getHouseLists } from "./../../services/api";
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

const RecentList = () => {
  const { data } = useQuery(["recently_views"], getHouseLists);
  const settings = {
    dots: false,
    infinite: data && data.length < 4 ? false : true,
    speed: 500,
    slidesToShow: data && data.length < 4 ? data && data.length : 4,
    slidesToScroll: 1,
  };

  return (
    <SlideWrapper>
      <Slider {...settings}>
        {data &&
          data.map((item, index) => (
            <div key={index} className="slick-slide">
              <HouseImg src={item.recently_views.thumnail} />
              <FontFam>{item.recently_views.title}</FontFam>
              <Flex>
                <FontFam>
                  {SellKindsToFront[item?.recently_views.sell_kind]}
                </FontFam>
                <FontFam>
                  {RoomKindsToFront[item.recently_views.room_kind]}
                </FontFam>
              </Flex>

              <Flex>
                <FontFam>
                  {item?.recently_views.deposit !== 0
                    ? item?.recently_views.deposit
                    : item?.recently_views.sale !== 0
                    ? item?.recently_views.sale
                    : null}
                </FontFam>
                <p>
                  {item?.recently_views.monthly_rent !== 0
                    ? item?.recently_views.monthly_rent
                    : null}
                </p>
              </Flex>
            </div>
          ))}
      </Slider>
    </SlideWrapper>
  );
};

export default RecentList;
