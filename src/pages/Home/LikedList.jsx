import { Flex } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

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

const HandleCarousel = styled.div`
  overflow: hidden;
`;

const LikedWrapper = styled.div`
  margin-left: 2rem;
  margin-right: 4rem;
  height: 100%;
`;

//api 호출
const LikedList = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["list"],
    queryFn: () =>
      fetch(`http://localhost:5000/list`).then((res) => res.json()),
  });
  const likedList = data && data.filter((item) => item.isLike).slice(0, 11);

  //캐러셀 슬라이드 로직
  const [count, setCount] = useState(0);
  const handlePrev = () => {
    setCount((count) => (count === 0 ? likedList.length - 5 : count - 1));
  };
  const handleNext = () => {
    setCount((count) => (count + 1) % (likedList.length - 3));
  };

  const handleRoomDetail = () => {};

  useEffect(() => {
    const timer = setTimeout(() => {
      handleNext();
    }, 5000);

    return () => clearTimeout(timer);
  }, [count]);

  return (
    <LikedWrapper>
      <HandleCarousel>
        <Flex
          transform={`translateX(-${count * 240}px)`}
          transition="transform 0.5s ease-in-out"
        >
          {likedList &&
            likedList.map((item) => (
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
      </HandleCarousel>
      <Flex justify={"space-between"} mt="10px">
        <FontAwesomeIcon icon={faChevronLeft} onClick={handlePrev} />
        <FontAwesomeIcon icon={faChevronRight} onClick={handleNext} />
      </Flex>
    </LikedWrapper>
  );
};

export default LikedList;
