import { Flex } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

const HouseImg = styled.img`
  max-width: 200px;
  margin-right: 40px;
  cursor: pointer;
`;

const FontFam = styled.p`
  font-weight: 600;
  margin-right: 10px;
`;

const HandleCarousel = styled.div`
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
  transform: translateX(0%);
`;

const RecentList = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["list"],
    queryFn: () =>
      fetch(`http://localhost:5000/list`).then((res) => res.json()),
  });
  const recentList = data && data.filter((item) => item.isRecent);
  const handleRoomDetail = () => {};

  return (
    <HandleCarousel>
      <Flex justify="center">
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
    </HandleCarousel>
  );
};

export default RecentList;
