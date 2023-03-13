import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getHouse } from "../../services/api";
import { getSaleContents } from "../../utils/getSaleContents";

import {
  Box,
  Heading,
  Text,
  List,
  ListItem,
  Button,
  Grid,
  GridItem,
  Center,
  Container,
} from "@chakra-ui/react";
import { CellKinds, RoomKinds } from "../../services/data";

function House() {
  const params = useParams();
  const id = params.houseId;
  const { data, isLoading } = useQuery(["house", id], getHouse);

  useEffect(() => {
    console.log("Detail", id);
  }, [id]);

  useEffect(() => {
    console.log("Detail", data);
  }, [data]);
  // {
  //   "id": 3,
  //     "is_sale": true,
  //     "is_owner": false,
  //     "owner": 1,
  //     "realtor": null,
  //       "dong": 1
  // }
  return (
    <>
      <Box
        overflowY="scroll"
        overflowX="hidden"
        h="90vh"
        scrollbarWidth="thin"
        display="flex"
        flexDirection="column"
      >
        {/* 스크롤이 필요한 컨텐츠 */}
        <Center>
          <Grid
            mt="40px"
            w="100%"
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(5, 1fr)"
            gap={2}
          >
            <GridItem
              w="650px"
              h="450px"
              rowSpan={2}
              colSpan={1}
              backgroundImage={`url(${"https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"})`}
              backgroundSize="cover"
            ></GridItem>
            <GridItem
              w="360px"
              h="220px"
              colSpan={2}
              backgroundImage={`url(${"https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"})`}
              backgroundSize="cover"
            />
            <GridItem
              w="360px"
              h="220px"
              colSpan={2}
              backgroundImage={`url(${"https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"})`}
              backgroundSize="cover"
            />
            <GridItem
              w="360px"
              h="220px"
              colSpan={2}
              backgroundImage={`url(${"https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"})`}
              backgroundSize="cover"
            />
            <GridItem
              w="360px"
              h="220px"
              colSpan={2}
              backgroundImage={`url(${"https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"})`}
              backgroundSize="cover"
            />
          </Grid>
        </Center>

        <Center>
          <Box w="100%" h="100px" mt="40px">
            <Heading
              as="h1"
              fontSize="3xl"
              mb="4"
              display="flex"
              alignItems="center"
            >
              {data.is_sale ? "팔렸습니다" : ""}
              <br />
              <br />
              {`${data.address} ${data.title}`}
              <Text fontSize="21" ml="5%">
                방문자수 {data.visited}
              </Text>
            </Heading>
            <Text mb="6" fontSize="22">
              {`${getSaleContents(
                data.cell_kind,
                data.deposit,
                data.monthly_rent,
                data.sale
              )}`}
              {" / "}
              관리비 월 {data.maintenance_cost}
              {/* <br />
              <br />
              포함 : 수도,인터넷,티비 <br />
              별도 : 전기, 가스 */}
            </Text>
            <Text fontSize="22" mb="20px">
              {data.description}
            </Text>
            <Heading as="h1" fontSize="3xl" mb="4">
              상세정보
            </Heading>
            <List mb="4" fontSize="17">
              <ListItem>방종류 : {RoomKinds[data.room_kind]}</ListItem>
              <br />
              {/* <ListItem>해당층/건물층 : 2층 / 7층</ListItem> */}
              <ListItem>전용면적 : {data.pyeongsu} 평</ListItem>
              <br />
              <ListItem>방 수 : {data.room}개 </ListItem>
              <br />
              <ListItem> 화장실 수 : {data.toilet}개</ListItem>
              <br />
              <ListItem>
                역세권 : {data.distance_to_station < 50 ? "YES" : "NO"}
              </ListItem>
              <br />
            </List>

            <Heading as="h1" fontSize="3xl" mb="4">
              옵션
            </Heading>
            <List mb="4" fontSize="17">
              <ListItem>에어컨 / 세탁기 / 옷장 / 냉장고 / 인덕션</ListItem>
              <br />
            </List>

            <Heading as="h1" fontSize="3xl" mb="4">
              보안/안전시설
            </Heading>
            <List mb="4" fontSize="17">
              <ListItem>
                비디오폰 / 공동현관 / CCTV / 카드키 / 화재경보기
              </ListItem>
              <br />
            </List>

            <Button colorScheme="blue" size="lg">
              채팅하기
            </Button>
          </Box>
        </Center>
      </Box>
    </>
  );
}

export default House;
