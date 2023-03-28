import { Flex, Text, VStack, Heading } from "@chakra-ui/layout";
import { Card, Box, CardBody } from "@chakra-ui/react";
import styled from "styled-components";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getHouseLists } from "./../../services/api";
import { SellKindsToFront, RoomKindsToFront } from "../../services/data";
import { Link } from "react-router-dom";
import { getSaleContents } from "./../../utils/getSaleContents";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PrevArrow } from "./../../components/Arrows/PrevArrow";
import { NextArrow } from "./../../components/Arrows/NextArrows";

const SlideWrapper = styled.div`
  width: 1000px;
  margin: 0 auto;
  overflow: hidden;
`;

const RecentList = () => {
  const { error, data } = useQuery(["recently_views"], getHouseLists);

  // if (error) {
  //   return <SlideWrapper>에러가 발생했습니다.</SlideWrapper>;
  // }

  // if (!data) {
  //   return <SlideWrapper>Loading....</SlideWrapper>;
  // }

  const settings = {
    dots: false,
    infinite: data && data.length < 4 ? false : true,
    speed: 500,
    slidesToShow: data && data.length < 4 ? data && data.length : 4,
    slidesToScroll: 2,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <SlideWrapper>
      <Slider {...settings}>
        {data &&
          data.map((item, index) => (
            <Card key={index} mr="10px" h="60%" w="60%">
              <Link to={`/houseList/house/${item.recently_views.id}`}>
                <CardBody
                  display={"flex"}
                  alignItems="center"
                  justifyContent={"center"}
                  cursor="pointer"
                >
                  <VStack w={"100%"} alignItems="flex-start" spacing={"2"}>
                    {" "}
                    <Box
                      backgroundImage={item.recently_views.thumnail}
                      backgroundSize="cover"
                      backgroundRepeat="no-repeat"
                      backgroundPosition="center"
                      width="100%"
                      alt="house"
                      borderRadius="lg"
                      css={{
                        aspectRatio: "1 / 1",
                      }}
                    />
                    <Heading fontSize={"x-large"} color="blackAlpha.800">
                      {item.recently_views.title}
                    </Heading>
                    <Flex fontSize={"md"} fontWeight="600">
                      <Text mr="1rem">
                        {SellKindsToFront[item?.recently_views.sell_kind]}
                      </Text>
                      <Text>
                        {RoomKindsToFront[item?.recently_views.room_kind]}
                      </Text>
                    </Flex>
                    <Flex>
                      <Text fontSize={"md"} color={"#ff404c"} mb="1rem">
                        {`${getSaleContents(
                          item.recently_views.sell_kind,
                          item.recently_views.deposit,
                          item.recently_views.monthly_rent,
                          item.recently_views.sale
                        )}`}
                      </Text>
                    </Flex>
                  </VStack>
                </CardBody>
              </Link>
            </Card>
          ))}
      </Slider>
    </SlideWrapper>
  );
};

export default RecentList;
