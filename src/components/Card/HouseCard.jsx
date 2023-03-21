import {
  Card,
  Box,
  CardBody,
  Text,
  Heading,
  VStack,
  IconButton,
  Button,
  HStack,
  useToast,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RoomKindsToFront, SellKindsToFront } from "../../services/data";
import { getSaleContents } from "../../utils/getSaleContents";
import styled from "styled-components";
import { useQuery, useMutation } from "@tanstack/react-query";

import { faHeart } from "@fortawesome/free-regular-svg-icons";
import * as Solid from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getWishLists, setWishLists } from "../../services/api";
import useUser from "../../hooks/useUser";

const BoxAction = styled.div`
  background-color: transparent;
  position: absolute;
  right: 2vw;
  top: 2vw;
`;

function HouseCard({
  thumnail,
  address,
  sell_kind,
  description,
  room_kind,
  id,
  deposit,
  monthly_rent,
  sale,
}) {
  const navigation = useNavigate();
  const toast = useToast();
  const { userLoading, isLoggedIn } = useUser();
  const [isLike, setIsLike] = useState(false);
  const [isLikeInit, setIsLikeInit] = useState(true);
  const wishlists = useQuery(["wish"], getWishLists);

  const likeMutation = useMutation(setWishLists, {
    onMutate: () => {
      console.log("like mutation");
    },
    onSuccess: () => {
      console.log(isLike ? `like house ${id}` : `like cancel house ${id}`);
    },
  });

  const onLike = (event) => {
    event.stopPropagation();
    if (isLike) {
      toast({
        title: "좋아요 -1",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: "좋아요 +1",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
    setIsLike(!isLike);
    if (!userLoading && isLoggedIn && id > 0) {
      likeMutation.mutate(id);
    }
  };

  const onHouseDetail = () => {
    navigation(`house/${id}`);
  };

  useEffect(() => {
    if (isLikeInit && wishlists.data !== undefined) {
      const savedLike = wishlists.data?.find((item) => {
        if (item.house === Number(id)) {
          return true;
        }
      });
      setIsLike(savedLike);
      setIsLikeInit(false);
    }
  }, [wishlists]);

  return (
    <Card
      w="100%"
      boxShadow="0px"
      flexGrow={1}
      _hover={{ backgroundColor: "rgb(140,140,140,0.1)" }}
    >
      <CardBody onClick={onHouseDetail} cursor="pointer" h="auto">
        <VStack>
          <Box
            backgroundImage={thumnail}
            backgroundSize="cover"
            backgroundRepeat="no-repeat"
            backgroundPosition="center"
            minW="21vw"
            maxW="23vw"
            width="100%"
            alt="house"
            borderRadius="lg"
            boxShadow="0px 0px 1px 1px gray"
            css={{
              aspectRatio: "2 / 1",
            }}
          />
          <Box top="10px" spacing="3" position="relative">
            <Box w="22vw">
              <Heading
                w="100%"
                size="sm"
                mb="5px"
                fontSize="1.5em"
                color="blackAlpha.800"
              >
                {address}
              </Heading>
              <Text
                h="auto"
                w="100%"
                color="blackAlpha.800"
                fontSize="1.1em"
                mb="4"
              >
                {description.length > 17
                  ? description.substring(0, 17) + "..."
                  : description}
              </Text>
              <HStack alignItems="center">
                <Text
                  mt="5px"
                  color="blackAlpha.800"
                  fontSize="1.4em"
                  fontWeight="600"
                >
                  {`${RoomKindsToFront[room_kind]} ${SellKindsToFront[sell_kind]}`}
                </Text>
                {!userLoading && isLoggedIn ? (
                  <Box onClick={onLike}>
                    <FontAwesomeIcon
                      size="lg"
                      color="red"
                      icon={isLike ? Solid.faHeart : faHeart}
                    />
                  </Box>
                ) : (
                  ""
                )}
              </HStack>
              <Text mt="5px" color="red.400" fontSize="1.3em" fontWeight="600">
                {`${getSaleContents(sell_kind, deposit, monthly_rent, sale)}`}
              </Text>
            </Box>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  );
}
export default HouseCard;
