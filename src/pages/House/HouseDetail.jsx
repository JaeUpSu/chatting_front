import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSaleContents } from "../../utils/getSaleContents";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  checkLiked,
  getHouse,
  getWishLists,
  makeChatRoom,
  setWishLists,
} from "../../services/api";

import { faHeart } from "@fortawesome/free-regular-svg-icons";
import * as Solid from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  HStack,
  useToast,
  Skeleton,
  ButtonGroup,
  Image,
} from "@chakra-ui/react";
import { SellKindsToFront, RoomKindsToFront } from "../../services/data";
import useUser from "../../hooks/useUser";
import { useDidMountEffect } from "../../hooks/useDidMoutEffect";
import { FaHeart } from "react-icons/fa";

function House() {
  const params = useParams();
  const id = params.houseId;
  const toast = useToast();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery(["house", id], getHouse);
  const { data: likeData, isLoading: likeLoading } = useQuery(
    ["isLiked", id],
    checkLiked
  );
  const [isLike, setIsLike] = useState(likeData?.result ?? true);
  const queryClient = useQueryClient();
  const { userLoading, isLoggedIn } = useUser();
  const mutation = useMutation(makeChatRoom, {
    onSuccess: () => {
      navigate("/chatlist");
    },
  });
  useDidMountEffect(() => {
    setIsLike(likeData.result);
    console.log("check");
  }, [likeLoading]);
  const likeMutation = useMutation(setWishLists, {
    onSuccess: () => {
      queryClient.refetchQueries(["isLiked", id], {
        onSuccess: () => setIsLike(() => likeData.result),
      });
    },
  });
  const goChat = () => {
    if (!userLoading && isLoggedIn) {
      mutation.mutate(id);
    } else {
      toast({
        title: "로그인을 해야 사용가능합니다.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  const onEdit = () => {
    setTimeout(() => {
      navigate(`/edit/${id}`);
    }, 0);
  };
  const onDel = () => {};
  const onSoldOut = () => {};

  const onLike = () => {
    setIsLike(!isLike);
    if (!userLoading && isLoggedIn && id > 0) {
      likeMutation.mutate(id);
    }
  };

  return (
    <>
      {!isLoading ? (
        <Box
          overflowY="scroll"
          overflowX="hidden"
          scrollbarWidth="thin"
          h={"85vh"}
          display="flex"
          flexDirection="column"
          px="5vw"
        >
          <Center m={"3vw"} mb="0">
            <Grid
              width={"100%"}
              borderRadius={"30px"}
              overflow="hidden"
              // mt="3vh"
              templateRows="repeat(2, 1fr)"
              templateColumns="repeat(4, 1fr)"
            >
              {data?.Image.map((item, idx) => {
                return (
                  <GridItem
                    colSpan={idx === 0 ? 2 : 1}
                    rowSpan={idx === 0 ? 2 : 1}
                    key={idx}
                    p={"0.5"}
                    height={idx === 0 ? "60vh" : "30vh"}
                    position="relative"
                  >
                    {!userLoading && isLoggedIn && idx === 2 ? (
                      <Box
                        position={"absolute"}
                        right="6"
                        top={"5"}
                        onClick={onLike}
                        cursor={"pointer"}
                        color={isLike ? "red" : "white"}
                      >
                        <FaHeart size={"25"} />
                      </Box>
                    ) : (
                      ""
                    )}
                    <Image src={item.url} w="100%" h="100%" />
                  </GridItem>
                );
              })}
            </Grid>
          </Center>

          <Center m={"3vw"} mt="md" border={"1px solid blue"}>
            <Box w="100%" h="100px" mt="40px">
              <Heading
                as="h1"
                fontSize="3xl"
                mb="4"
                display="flex"
                alignItems="center"
              >
                <HStack w={"100vw"}>
                  <Text>{`${data?.address} ${data?.title}`}</Text>
                  <Text fontSize="21" px="5vw">
                    방문자수 {data?.visited}
                  </Text>
                </HStack>{" "}
              </Heading>
              <Text mb="6" fontSize="22">
                {`${getSaleContents(
                  data?.sell_kind,
                  data?.deposit,
                  data?.monthly_rent,
                  data?.sale
                )}`}
                {" / "}
                관리비 월 {data?.maintenance_cost / 10000}만
              </Text>
              <Text fontSize="22" mb="20px" border={"1px solid blue"}>
                {data?.description}
              </Text>
              <Heading as="h1" fontSize="3xl" mb="4" border={"1px solid blue"}>
                상세정보
              </Heading>
              <List mb="4" fontSize="17" border={"1px solid blue"}>
                <ListItem>판매 : {SellKindsToFront[data?.sell_kind]}</ListItem>
                <ListItem>동네 : {data?.dong.name}</ListItem>
                <ListItem>
                  방종류 : {RoomKindsToFront[data?.room_kind]}
                </ListItem>
                <ListItem>전용면적 : {data?.pyeongsu} 평</ListItem>
                <ListItem>방 수 : {data?.room}개 </ListItem>
                <ListItem> 화장실 수 : {data?.toilet}개</ListItem>
              </List>

              <Heading as="h1" fontSize="3xl" mb="4" border={"1px solid blue"}>
                옵션
              </Heading>
              <List mb="4" fontSize="17" spacing={5} border={"1px solid blue"}>
                <ListItem>에어컨 / 세탁기 / 옷장 / 냉장고 / 인덕션</ListItem>
              </List>

              <Heading as="h1" fontSize="3xl" mb="4" border={"1px solid blue"}>
                보안/안전시설
              </Heading>
              <List mb="4" fontSize="17" border={"3px solid blue"}>
                <ListItem>
                  비디오폰 / 공동현관 / CCTV / 카드키 / 화재경보기
                </ListItem>
              </List>
              {isLoggedIn && !userLoading ? (
                data?.is_host ? (
                  <ButtonGroup
                    position={"fixed"}
                    bottom={10}
                    right={10}
                    gap={5}
                  >
                    <Button colorScheme="orange" size="lg" onClick={onSoldOut}>
                      판매완료
                    </Button>
                    <Button colorScheme="blackAlpha" size="lg" onClick={onEdit}>
                      수정하기
                    </Button>
                    <Button colorScheme="green" size="lg" onClick={onDel}>
                      삭제하기
                    </Button>
                  </ButtonGroup>
                ) : (
                  <Button
                    colorScheme="red"
                    size="lg"
                    position={"fixed"}
                    bottom={10}
                    right={10}
                    onClick={goChat}
                  >
                    채팅하기
                  </Button>
                )
              ) : null}
            </Box>
          </Center>
        </Box>
      ) : null}
    </>
  );
}

export default House;
