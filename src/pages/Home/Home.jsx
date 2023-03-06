import { Flex, Button } from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";
import Header from "./../../components/Header/Header";
import { useQuery } from "@tanstack/react-query";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeadFont = styled.h3`
  font-weight: 600;
  font-style: normal;
  margin-left: 50px;
`;

const HouseImg = styled.img`
  max-width: 200px;
  margin-right: 40px;
  overflow: hidden;
`;

const DivideLine = styled.div`
  border-top: 2px solid lightgray;
  margin: 40px auto;
  margin-bottom: 70px;
  width: 600px;
`;

const FontFam = styled.p`
  font-weight: 600;
  margin-right: 10px;
`;

export default function Home() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["list"],
    queryFn: () =>
      fetch(`http://localhost:5000/list`).then((res) => res.json()),
  });
  console.log(data);

  const recentList = data && data.filter((item) => item.isRecent);

  const likedList = data && data.filter((item) => item.isLike);

  const viewList = () => {};

  const handleRoomDetail = () => {};

  return (
    <HomeContainer>
      <Header />
      <Flex m="70px" justify={"space-around"}>
        <Button onClick={viewList}>아파트</Button>
        <Button onClick={viewList}>빌라</Button>
        <Button onClick={viewList}>오피스텔</Button>
        <Button onClick={viewList}>원룸</Button>
        <Button onClick={viewList}>고시원</Button>
        <Button onClick={viewList}>공유주택</Button>
      </Flex>
      <DivideLine />
      <HeadFont>최근 본 방</HeadFont>
      <Flex m="10px 0px 50px 50px" onClick={handleRoomDetail} cursor="pointer">
        {recentList &&
          recentList.map((item) => (
            <div key={item.id}>
              <HouseImg src={item.img} />
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

      <DivideLine />

      <HeadFont>찜한 방 </HeadFont>
      <Flex m="10px 50px 50px 50px" onClick={handleRoomDetail} cursor="pointer">
        {likedList &&
          likedList.map((item) => (
            <div key={item.id}>
              <HouseImg src={item.img}></HouseImg>
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
    </HomeContainer>
  );
}
