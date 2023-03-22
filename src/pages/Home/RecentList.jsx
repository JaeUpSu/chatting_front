import { Flex, Text } from "@chakra-ui/layout";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getHouseLists } from "./../../services/api";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SellKindsToFront, RoomKindsToFront } from "../../services/data";
import { Link } from "react-router-dom";
import { getSaleContents } from "./../../utils/getSaleContents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
const HouseImg = styled.img`
  width: 200px;
  height: 250px;
  position: relative;
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
        top: "50%",
        left: "1rem",
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
        top: "50%",
        right: "3rem",
        zIndex: 1,
        width: "40px",
        height: "40px",
      }}
    />
  );
};

const RecentList = () => {
  const { error, data } = useQuery(["recently_views"], getHouseLists);

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
  };

  return (
    <SlideWrapper>
      <Slider {...settings}>
        {data &&
          data.map((item, index) => (
            <div key={index}>
              <Link to={`/houseList/house/${item.recently_views.id}`}>
                <HouseImg src={item.recently_views.thumnail} />
              </Link>

              <FontFam>{item.recently_views.title}</FontFam>
              <Flex>
                <FontFam>
                  {SellKindsToFront[item?.recently_views.sell_kind]}
                </FontFam>
                <FontFam>
                  {RoomKindsToFront[item?.recently_views.room_kind]}
                </FontFam>
              </Flex>

              <Flex>
                <Text>
                  {`${getSaleContents(
                    item.recently_views.sell_kind,
                    item.recently_views.deposit,
                    item.recently_views.monthly_rent,
                    item.recently_views.sale
                  )}`}
                </Text>
              </Flex>
            </div>
          ))}
      </Slider>
    </SlideWrapper>
  );
};

export default RecentList;
