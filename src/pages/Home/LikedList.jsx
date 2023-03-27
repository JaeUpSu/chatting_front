import {
  Flex,
  Text,
  Card,
  Box,
  VStack,
  CardBody,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getWishLists } from "../../services/api";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SellKindsToFront, RoomKindsToFront } from "../../services/data";
import { Link } from "react-router-dom";
import { getSaleContents } from "../../utils/getSaleContents";
import { PrevArrow } from "./../../components/Arrows/PrevArrow";
import { NextArrow } from "./../../components/Arrows/NextArrows";

const SlideWrapper = styled.div`
  width: 1000px;
  margin: 0 auto;
  overflow: hidden;
`;

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
          data?.map((item, idx) => (
            <Card
              key={idx}
              h="60%"
              w="60%"
              boxShadow="md"
              _hover={{ backgroundColor: "rgb(140,140,140,0.1)" }}
            >
              <Link to={`/houseList/house/${item.house.id}`}>
                <CardBody
                  display={"flex"}
                  alignItems="center"
                  justifyContent={"center"}
                  cursor="pointer"
                >
                  <VStack w={"100%"} alignItems="flex-start" spacing={"2"}>
                    <Box
                      backgroundImage={item.house.thumnail}
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
                      {item.house.title}
                    </Heading>

                    <Flex fontSize={"md"}>
                      <Text mr="1rem" marginBottom="2px">
                        {SellKindsToFront[item.house.sell_kind]}
                      </Text>
                      <Text>{RoomKindsToFront[item.house.room_kind]}</Text>
                    </Flex>
                    <Flex>
                      <Text fontSize={"md"} mb="1rem" color={"#ff404c"}>
                        {`${getSaleContents(
                          item.house.sell_kind,
                          item.house.deposit,
                          item.house.monthly_rent,
                          item.house.sale
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

export default LikedList;
