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
} from "@chakra-ui/react";
import { CellKindsToFront, RoomKindsToFront } from "../../services/data";

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
  return (
    <>
      <Box
        overflowY="scroll"
        overflowX="hidden"
        h="90vh"
        scrollbarWidth="thin"
        display="flex"
        flexDirection="column"
        px="5vw"
      >
        <Center>
          <Grid
            mt="3vh"
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(5, 1fr)"
            gap={2}
          >
            {data?.Image.map((item, idx) => {
              return (
                <GridItem rowSpan={idx == 0 ? 2 : 1} colSpan={idx == 0 ? 0 : 2}>
                  <Box
                    w={idx > 0 ? "20vw" : "50vw"}
                    h={idx > 0 ? "25vh" : "50vh"}
                    backgroundImage={`url(${item.url})`}
                    backgroundSize="cover"
                    backgroundPosition="center"
                    borderLeftRadius={idx == 0 ? "20px" : "0px"}
                    borderTopRightRadius={
                      (idx > 0) & (idx == 2) ? "20px" : "0px"
                    }
                    borderBottomRightRadius={
                      (idx > 0) & (idx == 4) ? "20px" : "0px"
                    }
                    boxShadow="0px 4px 4px -3px black"
                    border="2px solid white"
                  />
                </GridItem>
              );
            })}
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
              {data?.is_sale ? "" : "팔렸습니다"}
              <br />
              <br />
              {`${data?.address} ${data?.title}`}
              <Text fontSize="21" ml="5%">
                방문자수 {data?.visited}
              </Text>
            </Heading>
            <Text mb="6" fontSize="22">
              {`${getSaleContents(
                data?.cell_kind,
                data?.deposit,
                data?.monthly_rent,
                data?.sale
              )}`}
              {" / "}
              관리비 월 {data?.maintenance_cost}
            </Text>
            <Text fontSize="22" mb="20px">
              {data?.description}
            </Text>
            <Heading as="h1" fontSize="3xl" mb="4">
              상세정보
            </Heading>
            <List mb="4" fontSize="17">
              <ListItem>판매 : {CellKindsToFront[data?.cell_kind]}</ListItem>
              <br />
              <ListItem>동네 : {data?.dong.name}</ListItem>
              <br />
              <ListItem>방종류 : {RoomKindsToFront[data?.room_kind]}</ListItem>
              <br />
              <ListItem>전용면적 : {data?.pyeongsu} 평</ListItem>
              <br />
              <ListItem>방 수 : {data?.room}개 </ListItem>
              <br />
              <ListItem> 화장실 수 : {data?.toilet}개</ListItem>
              <br />
              <ListItem>
                역세권 : {data?.distance_to_station < 250 ? "YES" : "NO"}
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
