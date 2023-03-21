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
  Image,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { getDongList, getGuList, getHouse, putHouse } from "../../services/api";
import {
  HouseRegisterValues,
  RoomKindsToFront,
  SellKindsToFront,
} from "../../services/data";

import SingleForm from "../../components/Form/SingleForm";
import AddressSelectForm from "../../components/Form/AddressSelectForm";

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
  const [initHouse, setInitHouse] = useState(true);
  const [sellKind, setSellKind] = useState("");
  const [isModify, setIsModify] = useState(new Array(12).fill(false));
  const [images, setImages] = useState([]);
  const [updatedHouse, setUpdatedHouse] = useState({});

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

  const guList = guListData.data?.map((gu) => ({
    label: gu.name,
    value: gu.name,
    index: gu.pk,
  }));

  const dongList = dongListData.data?.map((dong) => ({
    label: dong.name,
    value: dong.name,
    index: dong.pk,
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate } = useMutation(putHouse, {
    onSuccess: () => {
      console.log("update house!");
    },
    onError: () => {
      console.log("don't update house!");
    },
  });

  const onSubmit = (formData) => {
    console.log(formData);
    //mutate(formData);
  };

  const switchModify = (idx) => {
    setIsModify((list) => {
      let modifyArr = [];
      list.forEach((item, index) => {
        if (idx == index) {
          modifyArr.push(!item);
        } else {
          modifyArr.push(item);
        }
      });
      return modifyArr;
    });
  };

  const onModify = (e) => {
    const idx = Number(e.currentTarget.getAttribute("idx"));
    switchModify(idx);
  };

  const onEnter = (data) => {
    console.log("check", data);
    let nextHouse = {};
    setUpdatedHouse((prevHouse) => {
      HouseRegisterValues.forEach((item) => {
        if (prevHouse[item.eng]) {
          if (data[item.eng]) {
            nextHouse[item.eng] = data[item.eng];
          } else {
            nextHouse[item.eng] = prevHouse[item.eng];
          }
        }
      });
      return nextHouse;
    });
    const idx = HouseRegisterValues.findIndex((item) => data[item.eng]);
    console.log("idx", idx);
    // const idx = Number(e.currentTarget.getAttribute("idx"));
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
    if (house.data && initHouse) {
      console.log("init", house);
      const selectedGu = guList?.find((item) => item.value == house.data?.gu);
      setGuIdx(selectedGu?.index);
      setSellKind(house.data?.sell_kind);
      setUpdatedHouse(house.data);
      setInitHouse(false);
    }
  }, [house]);

  useEffect(() => {
    console.log("house", updatedHouse);
  }, [updatedHouse]);

  return (
    <VStack
      pt="40vh"
      pb="5vh"
      borderWidth="1px"
      borderRadius="lg"
      overflowY="scroll"
      overflowX="hidden"
      maxHeight="85vh"
      justifyContent="center"
    >
      <Center>
        <VStack>
          <Text fontWeight="600" fontSize="23px" mt="50px" w="60vw">
            기본
          </Text>
          <SingleForm
            setUpdatedHouse={setUpdatedHouse}
            value={updatedHouse?.title}
            name="title"
            label="제목"
          />
          <Divider borderWidth="1.2px" my="5" borderColor="blackAlpha.400" />
          <AddressSelectForm
            setUpdatedHouse={setUpdatedHouse}
            savedGu={updatedHouse?.gu}
            savedDong={updatedHouse?.dong}
          />
          {/* <form onSubmit={handleSubmit(onEnter)}>
            <HStack w="60vw">
              <FormControl isInvalid={errors.gu} id="gu" my="1" w="60vw">
                <FormLabel fontWeight="600">구</FormLabel>
                {isModify[2] ? (
                  <HStack>
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
                  </HStack>
                ) : (
                  <HStack my="4">
                    <Text>{updatedHouse?.gu}</Text>
                  </HStack>
                )}
                <FormErrorMessage>{`구를 선택해주세요`}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.dong} id="dong" my="1" w="60vw">
                <FormLabel fontWeight="600">동</FormLabel>
                {isModify[2] ? (
                  <HStack>
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
                    <Button onClick={onEnter} idx={0}>
                      입력
                    </Button>
                    <Button onClick={onModify} idx={2}>
                      취소
                    </Button>
                  </HStack>
                ) : (
                  <HStack my="4">
                    <Text>{updatedHouse?.dong?.name}</Text>
                    <Button
                      position="absolute"
                      right="1%"
                      onClick={onModify}
                      idx={2}
                    >
                      수정
                    </Button>
                  </HStack>
                )}
                <FormErrorMessage>{`동을 선택해주세요`}</FormErrorMessage>
              </FormControl>
            </HStack>
          </form> */}
          <form onSubmit={handleSubmit(onEnter)}>
            <FormControl
              isInvalid={errors.address}
              id="address"
              my="1"
              w="60vw"
            >
              <FormLabel fontWeight="600">상세주소</FormLabel>
              {isModify[3] ? (
                <HStack>
                  <Input
                    type="text"
                    defaultValue={updatedHouse?.address}
                    {...register("address", { required: true })}
                  />
                  <Button onClick={onEnter} idx={0}>
                    입력
                  </Button>
                  <Button onClick={onModify} idx={3}>
                    취소
                  </Button>
                </HStack>
              ) : (
                <HStack my="4">
                  <Text>{updatedHouse?.address}</Text>
                  <Button
                    position="absolute"
                    right="1%"
                    onClick={onModify}
                    idx={3}
                  >
                    수정
                  </Button>
                </HStack>
              )}

              <FormErrorMessage>{`상세주소를 입력하세요`}</FormErrorMessage>
            </FormControl>
          </form>
          <Divider borderWidth="1.2px" my="5" borderColor="blackAlpha.400" />
          <form onSubmit={handleSubmit(onEnter)}>
            <HStack w="60vw">
              <FormControl
                isInvalid={errors.room_kind}
                id="room_kind"
                my="1"
                w="60vw"
              >
                <FormLabel fontWeight="600">방 종류</FormLabel>
                {isModify[4] ? (
                  <HStack>
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
                  </HStack>
                ) : (
                  <HStack my="4">
                    <Text>{RoomKindsToFront[updatedHouse?.room_kind]}</Text>
                  </HStack>
                )}
                <FormErrorMessage>{`방 종류를 선택해주세요`}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={errors.sell_kind}
                id="sell_kind"
                my="1"
                w="60vw"
              >
                <FormLabel fontWeight="600">거래 종류</FormLabel>
                {isModify[4] ? (
                  <HStack>
                    <Select
                      {...register("sell_kind", { required: true })}
                      placeholder="거래 종류를 선택해주세요"
                      fontSize="14px"
                      onChange={handleSellKindSelectChange}
                    >
                      {sellKindOptions?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                    <Button onClick={onEnter} idx={0}>
                      입력
                    </Button>
                    <Button onClick={onModify} idx={4}>
                      취소
                    </Button>
                  </HStack>
                ) : (
                  <HStack my="4">
                    <Text>{SellKindsToFront[updatedHouse?.sell_kind]}</Text>
                    <Button
                      position="absolute"
                      right="1%"
                      onClick={onModify}
                      idx={4}
                    >
                      수정
                    </Button>
                  </HStack>
                )}
                <FormErrorMessage>{`거래 종류를 선택해주세요`}</FormErrorMessage>
              </FormControl>
            </HStack>
            <HStack w="60vw">
              <FormControl isInvalid={errors.room} id="room" my="1" w="60vw">
                <FormLabel fontWeight="600">방 개수</FormLabel>
                {isModify[6] ? (
                  <HStack>
                    <Input
                      type="number"
                      defaultValue={updatedHouse?.room}
                      {...register("room", { required: true })}
                    />
                  </HStack>
                ) : (
                  <HStack my="4">
                    <Text> {updatedHouse?.room}</Text>
                  </HStack>
                )}
                <FormErrorMessage>{`방 수를 입력하세요`}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={errors.toilet}
                id="toilet"
                my="1"
                w="60vw"
              >
                <FormLabel fontWeight="600">화장실 개수</FormLabel>
                {isModify[6] ? (
                  <HStack>
                    <Input
                      type="number"
                      defaultValue={updatedHouse?.toilet}
                      {...register("toilet", { required: true })}
                    />{" "}
                  </HStack>
                ) : (
                  <HStack my="4">
                    <Text> {updatedHouse?.toilet}</Text>
                  </HStack>
                )}
                <FormErrorMessage>{`화장실 수 입력하세요`}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={errors.pyeongsu}
                id="pyeongsu"
                my="1"
                w="60vw"
              >
                <FormLabel fontWeight="600">평수</FormLabel>
                {isModify[6] ? (
                  <HStack>
                    <Input
                      type="number"
                      defaultValue={updatedHouse?.pyeongsu}
                      {...register("pyeongsu", { required: true })}
                    />
                    <Button onClick={onEnter} idx={0}>
                      입력
                    </Button>
                    <Button onClick={onModify} idx={6}>
                      취소
                    </Button>
                  </HStack>
                ) : (
                  <HStack my="4">
                    <Text> {updatedHouse?.pyeongsu}</Text>
                    <Button
                      position="absolute"
                      right="1%"
                      onClick={onModify}
                      idx={6}
                    >
                      수정
                    </Button>
                  </HStack>
                )}

                <FormErrorMessage>{`평수를 입력하세요`}</FormErrorMessage>
              </FormControl>
            </HStack>
          </form>
          <Divider borderWidth="1.2px" my="5" borderColor="blackAlpha.400" />
          <form onSubmit={handleSubmit(onEnter)}>
            <HStack w="60vw">
              <FormControl
                isInvalid={errors.sale}
                id="sale"
                my="1"
                isDisabled={sellKind == "SALE" ? false : true}
              >
                <FormLabel fontWeight="600">매매가</FormLabel>
                {isModify[7] ? (
                  <HStack>
                    <Input
                      type="number"
                      defaultValue={updatedHouse?.sale}
                      {...register("sale", {
                        required: sellKind == "SALE" ? true : false,
                      })}
                    />{" "}
                  </HStack>
                ) : (
                  <HStack my="4">
                    <Text> {house?.data?.sale}</Text>
                  </HStack>
                )}
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
                <FormLabel fontWeight="600">보증금</FormLabel>
                {isModify[7] ? (
                  <HStack>
                    <Input
                      type="number"
                      defaultValue={updatedHouse?.deposit}
                      {...register("deposit", {
                        required:
                          sellKind == "CHARTER" || sellKind == "MONTHLY_RENT"
                            ? true
                            : false,
                      })}
                    />
                  </HStack>
                ) : (
                  <HStack my="4">
                    <Text> {updatedHouse?.deposit}</Text>
                  </HStack>
                )}
                <FormErrorMessage>{`보증금을 입력하세요`}</FormErrorMessage>
              </FormControl>
            </HStack>
          </form>
          <form onSubmit={handleSubmit(onEnter)}>
            <HStack w="60vw">
              <FormControl
                isInvalid={errors.monthly_rent}
                id="monthly_rent"
                my="1"
                isDisabled={sellKind == "MONTHLY_RENT" ? false : true}
              >
                <FormLabel fontWeight="600">월세</FormLabel>
                {isModify[7] ? (
                  <HStack>
                    <Input
                      type="number"
                      defaultValue={updatedHouse?.monthly_rent}
                      {...register("monthly_rent", {
                        required: sellKind == "MONTHLY_RENT" ? true : false,
                      })}
                    />
                  </HStack>
                ) : (
                  <HStack my="4">
                    <Text> {updatedHouse?.monthly_rent}</Text>
                  </HStack>
                )}
                <FormErrorMessage>{`월세를 입력하세요`}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={errors.maintenance_cost}
                id="maintenance_cost"
                my="1"
              >
                <FormLabel fontWeight="600">관리비</FormLabel>
                {isModify[7] ? (
                  <HStack>
                    <Input
                      type="number"
                      defaultValue={updatedHouse?.maintenance_cost}
                      {...register("maintenance_cost", { required: true })}
                    />
                    <Button onClick={onEnter} idx={0}>
                      입력
                    </Button>
                    <Button onClick={onModify} idx={7}>
                      취소
                    </Button>
                  </HStack>
                ) : (
                  <HStack my="4">
                    <Text> {updatedHouse?.maintenance_cost}</Text>
                    <Button
                      position="absolute"
                      right="1%"
                      onClick={onModify}
                      idx={7}
                    >
                      수정
                    </Button>
                  </HStack>
                )}

                <FormErrorMessage>{`관리비를 입력하세요`}</FormErrorMessage>
              </FormControl>
            </HStack>
          </form>
          <Divider borderWidth="1.2px" my="5" borderColor="blackAlpha.400" />
          <form onSubmit={handleSubmit(onEnter)}>
            <FormControl
              isInvalid={errors.description}
              id="description"
              my="1"
              w="60vw"
            >
              <FormLabel fontWeight="600">설명</FormLabel>
              {isModify[8] ? (
                <HStack>
                  <Textarea
                    type="text"
                    defaultValue={updatedHouse?.description}
                    {...register("description", { required: true })}
                  />
                  <Button onClick={onEnter} idx={0}>
                    입력
                  </Button>
                  <Button onClick={onModify} idx={8}>
                    취소
                  </Button>
                </HStack>
              ) : (
                <HStack my="4">
                  <Text> {updatedHouse?.description}</Text>
                  <Button
                    position="absolute"
                    right="1%"
                    onClick={onModify}
                    idx={8}
                  >
                    수정
                  </Button>
                </HStack>
              )}
              <FormErrorMessage>{`설명을 입력하세요`}</FormErrorMessage>
            </FormControl>
          </form>
          <Divider borderWidth="1.2px" my="5" borderColor="blackAlpha.400" />
          <Text fontWeight="600" fontSize="23px" mb="20" w="60vw">
            옵션
          </Text>
          <form onSubmit={handleSubmit(onEnter)}>
            <FormControl
              isInvalid={errors.distance_to_station}
              id="distance_to_station"
              my="1"
              w="60vw"
            >
              <FormLabel fontWeight="600">역까지 거리</FormLabel>

              {isModify[9] ? (
                <HStack>
                  <Input
                    type="number"
                    defaultValue={updatedHouse?.distance_to_station}
                    {...register("distance_to_station")}
                  />
                  <Button onClick={onEnter} idx={0}>
                    입력
                  </Button>
                  <Button onClick={onModify} idx={9}>
                    취소
                  </Button>
                </HStack>
              ) : (
                <HStack my="4">
                  <Text> {updatedHouse?.distance_to_station}</Text>
                  <Button
                    position="absolute"
                    right="1%"
                    onClick={onModify}
                    idx={9}
                  >
                    수정
                  </Button>
                </HStack>
              )}
              <FormErrorMessage>{`역까지 거리를 입력하세요`}</FormErrorMessage>
            </FormControl>
          </form>
          <Flex justifyContent="flex-end">
            <Button
              my="5"
              type="submit"
              isLoading={mutate.isLoading}
              colorScheme="green"
              size="lg"
              position={"fixed"}
              bottom={5}
              right={20}
            >
              등록하기
            </Button>
          </Flex>
        </VStack>
      </Center>
    </VStack>
  );
};

export default HouseEdit;
