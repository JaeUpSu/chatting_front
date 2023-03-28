import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSaleContents } from "../../utils/getSaleContents";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  checkLiked,
  getHouse,
  delHouse,
  makeChatRoom,
  setWishLists,
  soldOutHouse,
} from "../../services/api";

import {
  Box,
  Heading,
  Text,
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
} from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import styles from "../../styles/HouseList.module.css";

import useUser from "../../hooks/useUser";
import { useDidMountEffect } from "../../hooks/useDidMoutEffect";

import RoomOption from "../../components/Badge/RoomOption";
import SafetyOption from "../../components/Badge/SafetyOption";
import { SellKindsToFront, RoomKindsToFront } from "../../services/data";
import scrollbarStyle from "../../styles/scroll_bar";
import { Helmet } from "react-helmet";

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
  const [isLike, setIsLike] = useState(likeData?.result ?? false);
  const [isSale, setIsSale] = useState(data?.is_sale ?? true);
  const queryClient = useQueryClient();
  const { userLoading, isLoggedIn } = useUser();
  const mutation = useMutation(makeChatRoom, {
    onSuccess: (d) => {
      if (d.id) {
        navigate(`/chatlist/${d.id}`);
      } else {
        navigate("/chatlist");
      }
    },
  });

  const delMutation = useMutation(delHouse, {
    onSuccess: () => {
      window.history.go(-1);
    },
  });

  const soldOutMutation = useMutation(soldOutHouse, {
    onSuccess: () => {
      queryClient.refetchQueries(["house", id], {
        onSuccess: () => setIsSale(() => data?.is_sale),
      });
    },
  });

  const likeMutation = useMutation(setWishLists, {
    onSuccess: () => {
      queryClient.refetchQueries(["isLiked", id], {
        onSuccess: () => setIsLike(() => likeData.result),
      });
    },
  });
  useDidMountEffect(() => {
    setIsLike(likeData?.result);
  }, [likeLoading]);
  useDidMountEffect(() => {
    setIsSale(data?.is_sale);
  }, [isLoading]);
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
  const onDel = () => {
    delMutation.mutate(id);
  };
  const onSellStateChange = () => {
    setIsSale(!isSale);
    if (isSale) {
      toast({
        title: "판매 완료!",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: "판매 시작!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
    const is_sale = !data?.is_sale;
    soldOutMutation.mutate({ id, is_sale });
  };

  const onLike = () => {
    setIsLike(!isLike);
    if (!userLoading && isLoggedIn && id > 0) {
      likeMutation.mutate(id);
    }
  };
  return (
    <>
      <Box
        overflowY="scroll"
        overflowX="hidden"
        scrollbarWidth="thin"
        h={"85vh"}
        display="flex"
        flexDirection="column"
        px="5vw"
        sx={scrollbarStyle}
      >
        <Helmet>
          <title>{data ? data.title : "Loading..."}</title>
        </Helmet>

        <Center mx={"3vw"} my="3vh" mb="0">
          <Grid
            width={"90%"}
            overflow="hidden"
            borderRadius={"30px"}
            templateColumns={{
              sm: "repeat(2,1fr)",
              lg: "repeat(4,1fr)",
            }}
          >
            {!isLoading
              ? data?.Image.map((item, idx) => {
                  return (
                    <GridItem
                      key={idx}
                      position="relative"
                      colSpan={idx === 0 ? 2 : 1}
                      rowSpan={idx === 0 ? 2 : 1}
                      border="4px solid transparent"
                      height={idx === 0 ? "60vh" : "30vh"}
                    >
                      {!userLoading && isLoggedIn && idx === 0 ? (
                        <Box
                          top="5"
                          left="6"
                          w="3vw"
                          h="3vh"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          onClick={onLike}
                          cursor="pointer"
                          position="absolute"
                          color={isLike ? "red" : "transparent"}
                          className={
                            isLike
                              ? styles.heart_animation
                              : styles.reverse_heart_animation
                          }
                        >
                          <Box w="28px" h="28px" pos="absolute">
                            <svg
                              viewBox="0 0 32 32"
                              role="like"
                              style={{
                                display: isLike ? "none" : "block",
                                fill: "rgba(0, 0, 0, 0.5)",
                                stroke: "rgb(255,255,255,0.8)",
                                strokeWidth: 2,
                                overflow: "visible",
                              }}
                            >
                              <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
                            </svg>
                          </Box>
                          <FaHeart size={"25"} />
                        </Box>
                      ) : (
                        ""
                      )}
                      <Image src={item.url} w="100%" h="100%" />
                    </GridItem>
                  );
                })
              : Array.from({ length: 5 }).map((v, idx) => {
                  return (
                    <GridItem
                      key={idx}
                      border="4px solid transparent"
                      position="relative"
                      colSpan={idx === 0 ? 2 : 1}
                      rowSpan={idx === 0 ? 2 : 1}
                      height={idx === 0 ? "60vh" : "30vh"}
                    >
                      <Skeleton w="100%" h="100%" />
                    </GridItem>
                  );
                })}
          </Grid>
        </Center>
        <VStack ml="5.1vw" spacing="10" position={"relative"} mt="3vw">
          {!isLoading && !data?.is_host ? (
            <Box
              position={"absolute"}
              zIndex={"10"}
              right={"10%"}
              top={"10"}
              boxShadow="md"
            >
              <Card maxW="md" p={"5"} pl="10" pr="10">
                <CardBody>
                  <Stack spacing="5">
                    <VStack alignItems="flex-start" spacing="5">
                      <Heading>{SellKindsToFront[data?.sell_kind]}</Heading>
                      <Text pl={"1"} fontSize={"sm"} as="span">
                        조회수 {data?.visited}{" "}
                      </Text>
                    </VStack>
                    <Heading size="md" color={"#ff404c"}>
                      {`${getSaleContents(
                        data?.sell_kind,
                        data?.deposit,
                        data?.monthly_rent,
                        data?.sale
                      )}`}
                      {" / "}
                      관리비 월 {Math.round(data?.maintenance_cost / 10000)}만
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
                  mb={"5"}
                  // isLoading={mutation.isLoading}
                >
                  채팅하기
                </Button>
              </Card>
            </Box>
          ) : null}
          <VStack
            w="90%"
            alignItems={"flex-start"}
            spacing="7"
            position={"absolute"}
          >
            <HStack w={"95%"} rowGap="4" justifyContent={"space-between"}>
              <HStack alignItems={"flex-end"} flexWrap="wrap">
                {data ? (
                  <Heading
                    fontWeight={"semibold"}
                    fontSize={{
                      sm: "xl",
                      md: "2xl",
                    }}
                    display="flex"
                    alignItems="center"
                  >
                    {data?.title}
                  </Heading>
                ) : (
                  <Skeleton
                    mt="2"
                    fontWeight={"semibold"}
                    fontSize="2xl"
                    display="flex"
                    alignItems="center"
                    variant={"text"}
                  >
                    loading.....
                  </Skeleton>
                )}
                <Text
                  fontSize={{
                    xs: "sm",
                    sm: "md",
                    md: "xl",
                  }}
                  color="red.400"
                  fontWeight={"bold"}
                >
                  {!isLoading ? (
                    isSale ? (
                      "판매중"
                    ) : (
                      "판매 완료"
                    )
                  ) : (
                    <Skeleton
                      mt="10"
                      fontWeight={"semibold"}
                      fontSize={"lg"}
                      variant={"text"}
                    >
                      loading.....
                    </Skeleton>
                  )}
                </Text>
              </HStack>
              {data?.is_host ? (
                <ButtonGroup>
                  <Button
                    colorScheme="gray"
                    size={{
                      sm: "xs",
                      md: "sm",
                      lg: "md",
                    }}
                    onClick={onSellStateChange}
                  >
                    {!isLoading && isSale ? "판매종료" : "판매하기"}
                  </Button>
                  <Button
                    colorScheme="gray"
                    size={{
                      sm: "xs",
                      md: "sm",
                      lg: "md",
                    }}
                    onClick={onEdit}
                  >
                    수정하기
                  </Button>
                  <Button
                    colorScheme="gray"
                    size={{
                      sm: "xs",
                      md: "sm",
                      lg: "md",
                    }}
                    onClick={onDel}
                  >
                    삭제하기
                  </Button>
                </ButtonGroup>
              ) : null}
            </HStack>
            <Text fontSize={"lg"}>
              {!isLoading ? (
                `서울시 ${data?.gu} ${data?.dong.name} ${data?.address}`
              ) : (
                <Skeleton fontSize={"lg"} variant={"text"}>
                  loading..... loading..... loading..... loading.....
                </Skeleton>
              )}
            </Text>
            <Divider w={"95%"} />

            <Text fontSize="xl" fontWeight={"semibold"}>
              {RoomKindsToFront[data?.room_kind]}{" "}
              {SellKindsToFront[data?.sell_kind]}{" "}
            </Text>
            <Text fontSize="lg">
              {`${getSaleContents(
                data?.sell_kind,
                data?.deposit,
                data?.monthly_rent,
                data?.sale
              )}`}
              {" / "}
              관리비 월 {Math.round(data?.maintenance_cost / 10000)}만
            </Text>
            <Divider w={"95%"} />
            <Text fontSize="xl" fontWeight={"semibold"}>
              상세 정보
            </Text>
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
            <Divider w={"95%"} />

            <Text fontSize="xl" fontWeight={"semibold"}>
              옵션
            </Text>
            <HStack mb="4" fontSize="12" spacing={3}>
              {data?.option.map((value, idx) => {
                return <RoomOption type={value} key={idx} />;
              })}
            </HStack>

            <Divider w={"95%"} />

            <Text fontSize="xl" fontWeight={"semibold"}>
              보안
            </Text>
            <HStack mb="4" fontSize="12" spacing={5}>
              {data?.Safetyoption.map((value, idx) => {
                return <SafetyOption type={value} key={idx} />;
              })}
            </HStack>

            <Divider w={"95%"} />

            <Text fontSize="xl" fontWeight={"semibold"}>
              소개
            </Text>
            <Text
              fontSize="lg"
              bg="rgb(233,239,244)"
              borderRadius="md"
              p={"5"}
              w="95%"
            >
              {data?.description}
            </Text>
          </VStack>
        </VStack>
      </Box>
    </>
  );
}

export default House;
