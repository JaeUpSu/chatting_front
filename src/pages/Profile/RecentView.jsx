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
  CardFooter,
} from "@chakra-ui/react";
import { SellKindsToFront, RoomKindsToFront } from "../../services/data";
import { getSaleContents } from "../../utils/getSaleContents";
import { Link } from "react-router-dom";

const ViewCont = styled.div`
  display: flex;
  flex-direction: row;
  height: 80vh;
  overflow-y: scroll;
`;

export default function RecentView() {
  const { error, data } = useQuery(["recently_views"], getHouseLists);
  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }

  if (!data) {
    return <div>로딩 중입니다.</div>;
  }

  return (
    <Flex wrap={"wrap"} h="60vh" overflowY="scroll">
      {data?.map((item, index) => {
        return (
          <Card w="70vh" m="20px" ml="3rem;">
            <Link to={`/houseList/house/${item.recently_views.id}`}>
              <Image src={item.recently_views.thumnail} w="24.9rem" h="15rem" />
            </Link>

            <CardBody>
              <Box fontWeight={600}>{item.recently_views.title}</Box>

              <Flex>
                <Text mr="0.5rem">
                  {" "}
                  {RoomKindsToFront[item.recently_views.room_kind]}
                </Text>
                <Text>{SellKindsToFront[item.recently_views.sell_kind]}</Text>
              </Flex>

              <Flex>
                <Text>
                  {`${getSaleContents(
                    item.recently_views.sell_kind,
                    item.recently_views.deposit,
                    item.recently_views.monthly_rent,
                    item.recently_views.sale
                  )}`}
                </Text>
              </Flex>
            </CardBody>
          </Card>
        );
      })}
    </Flex>
  );
}
