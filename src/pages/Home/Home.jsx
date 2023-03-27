import { Flex, Box, Text } from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";
import IconBtns from "./IconBtns";
import RecentList from "./RecentList";
import LikedList from "./LikedList";
import useUser from "../../hooks/useUser";
import TopViewList from "./TopViewList";
import scrollbarStyle from "../../styles/scroll_bar";
import { Helmet } from "react-helmet";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const DivideLine = styled.div`
  border-top: 2px solid lightgray;
  margin: 70px auto;
  width: 600px;
`;

export default function Home() {
  const { isLoggedIn } = useUser();

  return (
    <Box
      overflowY="scroll"
      overflowX="hidden"
      height="80vh"
      sx={scrollbarStyle}
    >
      <Box>
        <Flex mt="2rem" mb="3rem">
          <IconBtns />
        </Flex>
        <Helmet>
          <title>BANGSAM</title>
        </Helmet>{" "}
        {isLoggedIn ? (
          <HomeContainer>
            <Text as="b" fontSize={"2xl"} ml="8rem" mb="2rem">
              최근 본 방
            </Text>
            <RecentList />

            <DivideLine />

            <Text as="b" fontSize={"2xl"} ml="8rem" mb="2rem">
              찜한 방
            </Text>
            <LikedList />
          </HomeContainer>
        ) : (
          <HomeContainer>
            <TopViewList />
          </HomeContainer>
        )}
      </Box>
    </Box>
  );
}
