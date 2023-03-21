import { useQuery } from "@tanstack/react-query";
import { getHouseLists } from "../../services/api";
import styled from "styled-components";
import {
  VStack,
  Card,
  CardBody,
  Image,
  Flex,
  Text,
  Box,
} from "@chakra-ui/react";
import { SellKindsToFront, RoomKindsToFront } from "../../services/data";

const ViewCont = styled.div`
  display: flex;
  flex-direction: row;
  height: 80vh;
  overflow-y: scroll;
`;

export default function RecentView() {
  const { data } = useQuery(["recently_views"], getHouseLists);

  return (
    <Flex wrap={"wrap"}>
      {data?.map((item, index) => {
        return (
          <Card w="250px" m="20px">
            <Image src={item.recently_views.thumnail} h="150px" />
            <CardBody>
              <Flex justify={"space-between"}>
                <Box fontWeight={600}>{item.recently_views.title}</Box>
                {RoomKindsToFront[item.recently_views.room_kind]}
              </Flex>

              <Flex justify={"space-around"}>
                <Box>{SellKindsToFront[item.recently_views.sell_kind]}</Box>
                {item?.recently_views.deposit !== 0
                  ? item?.recently_views.deposit
                  : item?.recently_views.sale !== 0
                  ? item?.recently_views.sale
                  : null}
                <Box>
                  {item?.recently_views.monthly_rent !== 0
                    ? item?.recently_views.monthly_rent
                    : null}
                </Box>
              </Flex>
            </CardBody>
          </Card>
        );
      })}
    </Flex>
  );
}
