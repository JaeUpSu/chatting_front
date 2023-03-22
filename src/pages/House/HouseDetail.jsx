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
  VStack,
  Divider,
  Card,
  CardBody,
  Stack,
  CardFooter,
} from "@chakra-ui/react";
import { SellKindsToFront, RoomKindsToFront } from "../../services/data";
import useUser from "../../hooks/useUser";
import { useDidMountEffect } from "../../hooks/useDidMoutEffect";
import { FaHeart, FaSink } from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import { BiBed, BiCloset } from "react-icons/bi";
import { GiConverseShoe, GiWashingMachine } from "react-icons/gi";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import RoomOption from "../../components/Badge/RoomOption";
import SafetyOption from "../../components/Badge/SafetyOption";
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
    setIsLike(likeData?.result);
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

  const onLike = (event) => {
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
              width={"90%"}
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

          <VStack ml="3vw" spacing="10" position={"relative"} mt="3vw">
            {!data?.is_host ? (
              <Box
                position={"absolute"}
                zIndex={"10"}
                right={"15%"}
                top={"10"}
                boxShadow="2xl"
              >
                <Card maxW="md" p={"5"} pl="10" pr="10">
                  <CardBody>
                    <Stack spacing="5">
                      <VStack
                        alignItems="flex-start"
                        justifyContent={"space-between"}
                      >
                        <Heading>{SellKindsToFront[data?.sell_kind]}</Heading>
                        <Text fontSize={"sm"} as="span">
                          조회수 {data?.visited}{" "}
                        </Text>
                      </VStack>
                      <Heading size="md">
                        {`${getSaleContents(
                          data?.sell_kind,
                          data?.deposit,
                          data?.monthly_rent,
                          data?.sale
                        )}`}
                        {" / "}
                        관리비 월 {data?.maintenance_cost / 10000}만
                      </Heading>
                      <HStack>
                        <VStack alignItems={"flex-start"} minW="80px">
                          <Text fontWeight={"bold"}> 방 종류 </Text>
                          <Text fontWeight={"bold"}> 전용 면적 </Text>
                          <Text fontWeight={"bold"}>방 </Text>
                          <Text fontWeight={"bold"}>화장실 </Text>
                        </VStack>
                        <VStack alignItems={"flex-start"}>
                          <Text>{RoomKindsToFront[data?.room_kind]}</Text>
                          <Text>{data?.pyeongsu} 평</Text>
                          <Text>{data?.room} 개</Text>
                          <Text>{data?.toilet} 개</Text>
                        </VStack>
                      </HStack>
                      <Divider />
                      <Text color="black" fontSize="lg">
                        {data?.host.name}{" "}
                        <Text as="span" fontWeight="bold">
                          공인중개사
                        </Text>
                      </Text>
                    </Stack>
                  </CardBody>
                  <Button
                    variant="solid"
                    size="lg"
                    w={"100%"}
                    colorScheme="red"
                    bgColor={"#ff404c"}
                    onClick={goChat}
                    // mt="5"
                    mb={"5"}
                  >
                    채팅하기
                  </Button>
                </Card>
              </Box>
            ) : null}
            <VStack
              w="90%"
              alignItems={"flex-start"}
              spacing="5"
              position={"absolute"}
            >
              <HStack justifyContent={"space-between"} width="95%">
                <HStack alignItems={"flex-end"}>
                  <Heading
                    fontWeight={"normal"}
                    fontSize="3xl"
                    display="flex"
                    alignItems="center"
                  >
                    {data?.title}
                  </Heading>
                  <Text fontSize={"lg"} color="red.400" fontWeight={"bold"}>
                    {data?.is_sale ? "판매중" : "판매 완료"}
                  </Text>
                </HStack>
                {data?.is_host ? (
                  <ButtonGroup gap={0}>
                    <Button colorScheme="gray" size="md" onClick={onSoldOut}>
                      판매 상태 변경
                    </Button>
                    <Button colorScheme="gray" size="md" onClick={onEdit}>
                      수정하기
                    </Button>
                    <Button colorScheme="gray" size="md" onClick={onDel}>
                      삭제하기
                    </Button>
                  </ButtonGroup>
                ) : null}
              </HStack>
              <Text fontSize={"lg"}>
                서울시 {data?.gu} {data?.dong.name} {data?.address}
              </Text>
              <Divider w={"100%"} />

              <Text fontSize="2xl">
                {RoomKindsToFront[data?.room_kind]}{" "}
                {SellKindsToFront[data?.sell_kind]}{" "}
              </Text>
              <Text fontSize="xl">
                {`${getSaleContents(
                  data?.sell_kind,
                  data?.deposit,
                  data?.monthly_rent,
                  data?.sale
                )}`}
                {" / "}
                관리비 월 {data?.maintenance_cost / 10000}만
              </Text>
              <Divider w={"100%"} />

              <Text fontSize="2xl">옵션</Text>
              <HStack mb="4" fontSize="17" spacing={5}>
                {["에어컨", "tv", "전자레인지"].map((value, idx) => {
                  return <RoomOption type={value} key={idx} />;
                })}
              </HStack>

              <Divider w={"100%"} />

              <Text fontSize="2xl">보안</Text>
              <HStack mb="4" fontSize="17" spacing={5}>
                {["cctv", "화재경보기", "공동현관"].map((value, idx) => {
                  return <SafetyOption type={value} key={idx} />;
                })}
              </HStack>

              <Divider w={"100%"} />

              <Text fontSize="2xl">소개</Text>
              <Text
                fontSize="lg"
                bg="rgb(233,239,244)"
                borderRadius="md"
                p={"5"}
                w="100%"
              >
                {data?.description}
              </Text>
            </VStack>
          </VStack>
        </Box>
      ) : (
        <Skeleton h={"100vh"} />
      )}
    </>
  );
}

export default House;
