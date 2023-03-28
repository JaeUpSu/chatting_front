import React from "react";
import {
  Flex,
  Text,
  Card,
  Box,
  Heading,
  CardBody,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getTopViewHouse } from "../../services/api";
import styled from "styled-components";
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
  transition: transform 0.5s ease-in-out;
`;

const SlideWrapper = styled.div`
  width: 1000px;
  margin: 0 auto;
  overflow: hidden;
`;

function TopViewList() {
  const { isLoading, data } = useQuery(["TopViewHouse"], getTopViewHouse);
  const settings = {
    dots: false,
    autoplay: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplaySpeed: 4000,
  };
  return (
    <SlideWrapper>
      <Slider {...settings}>
        {data?.map((item, index) => (
          <Card key={index} w="80%">
            <Link to={`/houseList/house/${item.id}`}>
              <CardBody
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                cursor="pointer"
                borderColor="2px solid black"
              >
                <VStack
                  w={"100%"}
                  alignItems="flex-start"
                  borderColor="2px solid black"
                  spacing={"2"}
                >
                  <Box
                    backgroundImage={item.thumnail}
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
                  <Text
                    color="blackAlpha.800"
                    overflow={"hidden"}
                    fontSize={"xl"}
                    fontWeight={"bold"}
                  >
                    {item.title}
                  </Text>
                  <Flex fontSize={"md"} fontWeight="600">
                    <Text mr="1rem">{SellKindsToFront[item?.sell_kind]}</Text>
                    <Text>{RoomKindsToFront[item?.room_kind]}</Text>
                  </Flex>
                  <Flex>
                    <Text fontSize={"md"} color={"#ff404c"}>
                      {`${getSaleContents(
                        item.sell_kind,
                        item.deposit,
                        item.monthly_rent,
                        item.sale
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
}

export default TopViewList;
