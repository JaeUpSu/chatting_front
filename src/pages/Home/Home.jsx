import { Flex, Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import styled from "styled-components";
import IconBtns from "./IconBtns";
import RecentList from "./RecentList";
import LikedList from "./LikedList";
import { isLoggedInVar } from "./../../apollo";

const HomeWrapper = styled.div`
  overflow-y: scroll;
  height: 80vh;
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const DivideLine = styled.div`
  border-top: 2px solid lightgray;
  margin: 40px auto;
  margin-bottom: 70px;
  width: 600px;
`;

export default function Home() {
  return (
    <HomeWrapper>
      <Box>
        <Flex justify={"space-around"} mt="3rem" ml="3rem" flexWrap={"wrap"}>
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

        {isLoggedInVar() ? (
          <HomeContainer>
            <Text as="b" fontSize={"2xl"} ml="8rem">
              최근 본 방
            </Text>
            <RecentList />

            <DivideLine />

            <Text as="b" fontSize={"2xl"} ml="8rem">
              찜한 방
            </Text>
            <LikedList />
          </HomeContainer>
        ) : null}
      </Box>
    </HomeWrapper>
  );
}
