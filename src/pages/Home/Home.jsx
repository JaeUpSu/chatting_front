import { Flex } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import IconBtns from "./IconBtns";
import RecentList from "./RecentList";
import LikedList from "./LikedList";

const HomeWrapper = styled.div`
  margin-left: 4rem;
  margin-right: 7rem;
  height: 100%;
  overflow-y: scroll;
`;
const HomeContainer = styled.div`
:not(:HeadFont)
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeadFont = styled.h3`
  font-weight: 600;
  margin-left: 20px;
  margin-bottom: 5px;
  font-size: 20px;
`;

const DivideLine = styled.div`
  border-top: 2px solid lightgray;
  margin: 40px auto;
  margin-bottom: 70px;
  width: 600px;
`;

export default function Home() {
  const [containerHeight, setContainerHeight] = useState("100vh");
 

  useEffect(() => {
    const updateContainerHeight = () => {
      const headerHeight = document.querySelector("header").offsetHeight;
      const windowHeight = window.innerHeight;
      const newContainerHeight = windowHeight - headerHeight - 60;
      setContainerHeight(`${newContainerHeight}px`);
    };

    updateContainerHeight();
    window.addEventListener("resize", updateContainerHeight);
    return () => window.removeEventListener("resize", updateContainerHeight);
  }, []);

  return (
    <HomeWrapper style={{ height: containerHeight }}>
      <Flex justify={"space-around"} mt="3rem" flexWrap={"wrap"}>
        <IconBtns src="https://cdn-icons-png.flaticon.com/128/2417/2417733.png">
          아파트
        </IconBtns>
        <IconBtns src="https://cdn-icons-png.flaticon.com/512/984/984123.png">
          빌라
        </IconBtns>
        <IconBtns src="https://cdn-icons-png.flaticon.com/512/994/994294.png">
          오피스텔
        </IconBtns>
        <IconBtns src="https://cdn-icons-png.flaticon.com/512/489/489405.png">
          원룸
        </IconBtns>
        <IconBtns src="https://cdn-icons-png.flaticon.com/512/9567/9567116.png">
          고시원
        </IconBtns>
        <IconBtns src="https://cdn-icons-png.flaticon.com/512/602/602175.png">
          그 외
        </IconBtns>
      </Flex>

      <DivideLine />

      <HomeContainer>
        <HeadFont>최근 본 방</HeadFont>
        <RecentList />

        <DivideLine />

        <HeadFont>찜한 방</HeadFont>
        <LikedList />
      </HomeContainer>
    </HomeWrapper>
  );
}

