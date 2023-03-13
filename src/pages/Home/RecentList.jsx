import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

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

const RecentWrapper = styled.div`
  max-width: 1000px;
  overflow: hidden;
  margin: 0 auto;
`;

const RecentList = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["list"],
    queryFn: () =>
      fetch(`http://localhost:5000/list`).then((res) => res.json()),
  });
  const recentList = data && data.filter((item) => item.isRecent).slice(0, 10);

  const handleRoomDetail = () => {};
  const [count, setCount] = useState(0);
  const handlePrev = () => {
    setCount((count) => (count === 0 ? recentList.length - 4 : count - 1));
  };
  const handleNext = () => {
    setCount((count) => (count + 1) % (recentList.length - 3));
  };

  return (
    <RecentWrapper>
      <Flex
        transform={`translateX(-${count * 240}px)`}
        transition="transform 0.5s ease-in-out"
      >
        <Flex>
          {recentList &&
            recentList.map((item) => (
              <div key={item.id}>
                <HouseImg src={item.img} onClick={handleRoomDetail} />
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
        </Flex>
      </Flex>
      <Flex justify={"space-between"} mt="10px" cursor={"pointer"}>
        <FontAwesomeIcon icon={faChevronLeft} onClick={handlePrev} />
        <FontAwesomeIcon icon={faChevronRight} onClick={handleNext} />
      </Flex>
    </RecentWrapper>
  );
};

export default RecentList;
