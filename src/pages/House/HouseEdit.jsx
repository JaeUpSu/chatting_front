import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  Textarea,
  VStack,
  Center,
  HStack,
  Divider,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

import { getDongList, getGuList, getHouse, putHouse } from "../../services/api";
import { RoomKindsToFront, SellKindsToFront } from "../../services/data";

const inputFileStyle = {
  display: "none",
};

const uploadButtonStyle = {
  border: "1px solid",
  borderRadius: "md",
  cursor: "pointer",
  px: 4,
  py: 2,
};

const HouseEdit = () => {
  const { id } = useParams();
  const house = useQuery(["house", id], getHouse);
  const fileInputRef = useRef();

  const [guIdx, setGuIdx] = useState(0);
  const [sellKind, setSellKind] = useState("");
  const [images, setImages] = useState([]);

  const guListData = useQuery(["gulist"], getGuList);
  const dongListData = useQuery(["donglist", guIdx], getDongList);

  const roomKindOptions = [
    "ONE_ROOM",
    "HOME",
    "APART",
    "VILLA",
    "OFFICETEL",
    "SHARE_HOUSE",
  ].map((roomKind) => ({ value: roomKind, label: RoomKindsToFront[roomKind] }));

  const sellKindOptions = ["SALE", "CHARTER", "MONTHLY_RENT"].map(
    (sellKind) => ({
      value: sellKind,
      label: SellKindsToFront[sellKind],
    })
  );

  const guList = guListData?.data?.map((gu) => ({
    label: gu.name,
    value: gu.name,
    index: gu.pk,
  }));

  const dongList = dongListData?.data?.map((dong) => ({
    label: dong.name,
    value: dong.name,
    index: dong.pk,
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate } = useMutation((formData) => putHouse(id, formData), {
    onSuccess: () => {
      console.log("update house!");
    },
    onError: () => {
      console.log("don't update house!");
    },
  });

  const onSubmit = (formData) => {
    mutate(formData);
  };

  const handleGuSelectChange = (event) => {
    const selectedGuVal = event.currentTarget.value;
    const selectedGu = guList?.find((item) => item.value == selectedGuVal);
    setGuIdx(selectedGu?.index);
  };

  const handleSellKindSelectChange = (event) => {
    const selectedSellKindVal = event.currentTarget.value;
    setSellKind(selectedSellKindVal);
  };

  useEffect(() => {
    console.log("check");
  }, []);

  useEffect(() => {
    console.log("data", house);
    const selectedGu = guList?.find((item) => item.value == house.data?.gu);
    setGuIdx(selectedGu?.index);
    setSellKind(house.data?.sell_kind);
  }, [house]);

  return (
    <VStack>
      <Center
        pb="5vh"
        pt="50vh"
        w="120vw"
        borderWidth="1px"
        borderRadius="lg"
        overflowY="scroll"
        maxHeight="90vh"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.title} id="title" my="1" w="70vw">
            <FormLabel>제목</FormLabel>
            <Input
              type="text"
              defaultValue={house.data?.title}
              {...register("title", { required: true })}
            />
            <FormErrorMessage>{`제목을 입력하세요`}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.images} id="images">
            <FormLabel>이미지 ( 5개 ) </FormLabel>{" "}
            <Input
              type="file"
              defaultValue={house.data?.Image}
              multiple
              onChange={(e) => {
                const files = e.target.files;
                console.log(files.length);
                setImages((list) => {
                  const imgs = [];
                  list.map((item) => {
                    imgs.push(item);
                  });
                  imgs.push(files);
                  return imgs;
                });
              }}
            />
          </FormControl>
          <Divider borderWidth="1.2px" my="5" borderColor="blackAlpha.400" />
          <HStack w="70vw">
            <FormControl isInvalid={errors.gu} id="gu" my="1">
              <FormLabel>구</FormLabel>
              <Select
                {...register("gu", { required: true })}
                placeholder="구를 선택해주세요"
                fontSize="14px"
                onChange={handleGuSelectChange}
              >
                {guList?.map((option) => (
                  <option
                    key={option.value}
                    index={option.index}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{`구를 선택해주세요`}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.dong} id="dong" my="1">
              <FormLabel>동</FormLabel>
              <Select
                {...register("dong", { required: true })}
                placeholder="동을 선택해주세요"
                fontSize="14px"
                isDisabled={guIdx > 0 ? false : true}
              >
                {dongList?.map((option) => (
                  <option
                    key={option.value}
                    index={option.index}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{`동을 선택해주세요`}</FormErrorMessage>
            </FormControl>
          </HStack>

          <FormControl isInvalid={errors.address} id="address" my="1">
            <FormLabel>상세주소</FormLabel>
            <Input
              type="text"
              defaultValue={house.data?.address}
              {...register("address", { required: true })}
            />
            <FormErrorMessage>{`상세주소를 입력하세요`}</FormErrorMessage>
          </FormControl>

          <Divider borderWidth="1.2px" my="5" borderColor="blackAlpha.400" />
          <HStack w="70vw">
            <FormControl isInvalid={errors.room_kind} id="room_kind" my="1">
              <FormLabel>방 종류</FormLabel>
              <Select
                {...register("room_kind", { required: true })}
                placeholder="방 종류를 선택해주세요"
                fontSize="14px"
              >
                {roomKindOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{`방 종류를 선택해주세요`}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.sell_kind} id="sell_kind" my="1">
              <FormLabel>거래 종류</FormLabel>
              <Select
                {...register("sell_kind", { required: true })}
                placeholder="거래 종류를 선택해주세요"
                fontSize="14px"
                onChange={handleSellKindSelectChange}
              >
                {sellKindOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{`거래 종류를 선택해주세요`}</FormErrorMessage>
            </FormControl>
          </HStack>
          <HStack w="70vw">
            <FormControl isInvalid={errors.room} id="room" my="1">
              <FormLabel>방 개수</FormLabel>
              <Input
                type="number"
                defaultValue={house.data?.room}
                {...register("room", { required: true })}
              />
              <FormErrorMessage>{`방 수를 입력하세요`}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.toilet} id="toilet" my="1">
              <FormLabel>화장실 개수</FormLabel>
              <Input
                type="number"
                defaultValue={house.data?.toilet}
                {...register("toilet", { required: true })}
              />
              <FormErrorMessage>{`화장실 수 입력하세요`}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.pyeongsu} id="pyeongsu" my="1">
              <FormLabel>평수</FormLabel>
              <Input
                type="number"
                defaultValue={house.data?.pyeongsu}
                {...register("pyeongsu", { required: true })}
              />
              <FormErrorMessage>{`평수를 입력하세요`}</FormErrorMessage>
            </FormControl>
          </HStack>
          <Divider borderWidth="1.2px" my="5" borderColor="blackAlpha.400" />

          <HStack>
            <FormControl
              isInvalid={errors.sale}
              id="sale"
              my="1"
              isDisabled={sellKind == "SALE" ? false : true}
            >
              <FormLabel>매매가</FormLabel>
              <Input
                type="number"
                defaultValue={house.data?.sale}
                {...register("sale", {
                  required: sellKind == "SALE" ? true : false,
                })}
              />
              <FormErrorMessage>{`매매가를 입력하세요`}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={errors.deposit}
              id="deposit"
              my="1"
              isDisabled={
                sellKind == "CHARTER" || sellKind == "MONTHLY_RENT"
                  ? false
                  : true
              }
            >
              <FormLabel>보증금</FormLabel>
              <Input
                type="number"
                defaultValue={house.data?.deposit}
                {...register("deposit", {
                  required:
                    sellKind == "CHARTER" || sellKind == "MONTHLY_RENT"
                      ? true
                      : false,
                })}
              />
              <FormErrorMessage>{`보증금을 입력하세요`}</FormErrorMessage>
            </FormControl>
          </HStack>
          <HStack>
            <FormControl
              isInvalid={errors.monthly_rent}
              id="monthly_rent"
              my="1"
              isDisabled={sellKind == "MONTHLY_RENT" ? false : true}
            >
              <FormLabel>월세</FormLabel>
              <Input
                type="number"
                defaultValue={house.data?.monthly_rent}
                {...register("monthly_rent", {
                  required: sellKind == "MONTHLY_RENT" ? true : false,
                })}
              />
              <FormErrorMessage>{`월세를 입력하세요`}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={errors.maintenance_cost}
              id="maintenance_cost"
              my="1"
            >
              <FormLabel>관리비</FormLabel>
              <Input
                type="number"
                defaultValue={house.data?.maintenance_cost}
                {...register("maintenance_cost", { required: true })}
              />
              <FormErrorMessage>{`관리비를 입력하세요`}</FormErrorMessage>
            </FormControl>
          </HStack>

          <Divider borderWidth="1.2px" my="5" borderColor="blackAlpha.400" />

          <FormControl isInvalid={errors.description} id="description" my="1">
            <FormLabel>설명</FormLabel>
            <Textarea
              type="text"
              defaultValue={house.data?.description}
              {...register("description", { required: true })}
            />
            <FormErrorMessage>{`설명을 입력하세요`}</FormErrorMessage>
          </FormControl>
          <Divider borderWidth="1.2px" my="5" borderColor="blackAlpha.400" />
          <Text mb="8">옵션</Text>
          <FormControl
            isInvalid={errors.distance_to_station}
            id="distance_to_station"
            my="1"
          >
            <FormLabel>역까지 거리</FormLabel>
            <Input
              type="number"
              defaultValue={house.data?.distance_to_station}
              {...register("distance_to_station")}
            />
            <FormErrorMessage>{`역까지 거리를 입력하세요`}</FormErrorMessage>
          </FormControl>
          <Flex justifyContent="flex-end">
            <Button my="5" type="submit" isLoading={mutate.isLoading}>
              수정하기
            </Button>
          </Flex>
        </form>
      </Center>
    </VStack>

    // <Box p={4}>
    //   <form onSubmit={handleSubmit(onSubmit)}>
    //     <FormControl isInvalid={errors.title}>
    //       <FormLabel>Title</FormLabel>
    //       <Input
    //         defaultValue={house.data?.title}
    //         {...register("title", { required: true })}
    //       />
    //       {errors.title && (
    //         <FormErrorMessage>건물이름을 꼭 적어주세요</FormErrorMessage>
    //       )}
    //     </FormControl>
    //     <FormControl isInvalid={errors.description}>
    //       <FormLabel>Description</FormLabel>
    //       <Textarea
    //         defaultValue={house.data?.description}
    //         {...register("description", { required: true })}
    //       />
    //       {errors.description && (
    //         <FormErrorMessage>
    //           최소한의 설명이라도 꼭 적어주세요
    //         </FormErrorMessage>
    //       )}
    //     </FormControl>
    //     <FormControl isInvalid={errors.price}>
    //       <FormLabel>Price</FormLabel>
    //       <Input
    //         type="number"
    //         defaultValue={house.data?.price}
    //         {...register("price", { required: true })}
    //       />
    //       {errors.price && (
    //         <FormErrorMessage>매매가를 입력해주세요</FormErrorMessage>
    //       )}
    //     </FormControl>
    //     <Button type="submit" isLoading={house?.isLoading}>
    //       Update
    //     </Button>
    //   </form>
    // </Box>
  );
};

export default HouseEdit;
