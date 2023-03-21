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
  const [isModify, setIsModify] = useState(new Array(12).fill(false));
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

  const onModify = (e) => {
    const idx = Number(e.currentTarget.getAttribute("idx"));
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
          <Text fontWeight="600" fontSize="23px" my="4">
            기본
          </Text>
          <FormControl isInvalid={errors.title} id="title" my="1" w="70vw">
            <FormLabel fontWeight="600">제목</FormLabel>
            {isModify[0] ? (
              <HStack>
                <Input
                  type="text"
                  defaultValue={house.data?.title}
                  {...register("title", { required: true })}
                />
                <Button>입력</Button>
                <Button onClick={onModify} idx={0}>
                  취소
                </Button>
              </HStack>
            ) : (
              <HStack my="4">
                <Text>{house.data?.title}</Text>
                <Button
                  position="absolute"
                  right="1%"
                  onClick={onModify}
                  idx={0}
                >
                  수정
                </Button>
              </HStack>
            )}
            <FormErrorMessage>{`제목을 입력하세요`}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.images} id="images">
            <FormLabel fontWeight="600">이미지 ( 5개 ) </FormLabel>{" "}
            {isModify[1] ? (
              <HStack>
                <Input
                  type="file"
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
                <Button>입력</Button>
                <Button onClick={onModify} idx={1}>
                  취소
                </Button>
              </HStack>
            ) : (
              <HStack my="4">
                <HStack>
                  {house.data?.Image.map((item, idx) => {
                    return (
                      <Image
                        key={idx}
                        w="8vw"
                        h="6vh"
                        backgroundImage={`url(${item.url})`}
                        backgroundSize="cover"
                        backgroundPosition="center"
                      />
                    );
                  })}
                </HStack>
                <Button
                  position="absolute"
                  right="1%"
                  onClick={onModify}
                  idx={1}
                >
                  수정
                </Button>
              </HStack>
            )}
          </FormControl>
          <Divider borderWidth="1.2px" my="5" borderColor="blackAlpha.400" />
          <HStack w="70vw">
            <FormControl isInvalid={errors.gu} id="gu" my="1">
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
                  <Text>{house.data?.gu}</Text>
                </HStack>
              )}
              <FormErrorMessage>{`구를 선택해주세요`}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.dong} id="dong" my="1">
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
                  <Button>입력</Button>
                  <Button onClick={onModify} idx={2}>
                    취소
                  </Button>
                </HStack>
              ) : (
                <HStack my="4">
                  <Text>{house.data?.dong.name}</Text>
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

          <FormControl isInvalid={errors.address} id="address" my="1">
            <FormLabel fontWeight="600">상세주소</FormLabel>
            {isModify[3] ? (
              <HStack>
                <Input
                  type="text"
                  defaultValue={house.data?.address}
                  {...register("address", { required: true })}
                />
                <Button>입력</Button>
                <Button onClick={onModify} idx={3}>
                  취소
                </Button>
              </HStack>
            ) : (
              <HStack my="4">
                <Text>{house.data?.address}</Text>
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

          <Divider borderWidth="1.2px" my="5" borderColor="blackAlpha.400" />
          <HStack w="70vw">
            <FormControl isInvalid={errors.room_kind} id="room_kind" my="1">
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
                  <Text>{RoomKindsToFront[house.data?.room_kind]}</Text>
                </HStack>
              )}
              <FormErrorMessage>{`방 종류를 선택해주세요`}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.sell_kind} id="sell_kind" my="1">
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
                  <Button>입력</Button>
                  <Button onClick={onModify} idx={4}>
                    취소
                  </Button>
                </HStack>
              ) : (
                <HStack my="4">
                  <Text>{SellKindsToFront[house.data?.sell_kind]}</Text>
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
          <HStack w="70vw">
            <FormControl isInvalid={errors.room} id="room" my="1">
              <FormLabel fontWeight="600">방 개수</FormLabel>
              {isModify[6] ? (
                <HStack>
                  <Input
                    type="number"
                    defaultValue={house.data?.room}
                    {...register("room", { required: true })}
                  />
                </HStack>
              ) : (
                <HStack my="4">
                  <Text> {house?.data?.room}</Text>
                </HStack>
              )}
              <FormErrorMessage>{`방 수를 입력하세요`}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.toilet} id="toilet" my="1">
              <FormLabel fontWeight="600">화장실 개수</FormLabel>
              {isModify[6] ? (
                <HStack>
                  <Input
                    type="number"
                    defaultValue={house.data?.toilet}
                    {...register("toilet", { required: true })}
                  />{" "}
                </HStack>
              ) : (
                <HStack my="4">
                  <Text> {house?.data?.room}</Text>
                </HStack>
              )}
              <FormErrorMessage>{`화장실 수 입력하세요`}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.pyeongsu} id="pyeongsu" my="1">
              <FormLabel fontWeight="600">평수</FormLabel>
              {isModify[6] ? (
                <HStack>
                  <Input
                    type="number"
                    defaultValue={house.data?.pyeongsu}
                    {...register("pyeongsu", { required: true })}
                  />
                  <Button>입력</Button>
                  <Button onClick={onModify} idx={6}>
                    취소
                  </Button>
                </HStack>
              ) : (
                <HStack my="4">
                  <Text> {house?.data?.pyeongsu}</Text>
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
          <Divider borderWidth="1.2px" my="5" borderColor="blackAlpha.400" />

          <HStack>
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
                    defaultValue={house.data?.sale}
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
                    defaultValue={house.data?.deposit}
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
                  <Text> {house?.data?.deposit}</Text>
                </HStack>
              )}
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
              <FormLabel fontWeight="600">월세</FormLabel>
              {isModify[7] ? (
                <HStack>
                  <Input
                    type="number"
                    defaultValue={house.data?.monthly_rent}
                    {...register("monthly_rent", {
                      required: sellKind == "MONTHLY_RENT" ? true : false,
                    })}
                  />
                </HStack>
              ) : (
                <HStack my="4">
                  <Text> {house?.data?.monthly_rent}</Text>
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
                    defaultValue={house.data?.maintenance_cost}
                    {...register("maintenance_cost", { required: true })}
                  />
                  <Button>입력</Button>
                  <Button onClick={onModify} idx={7}>
                    취소
                  </Button>
                </HStack>
              ) : (
                <HStack my="4">
                  <Text> {house?.data?.maintenance_cost}</Text>
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

          <Divider borderWidth="1.2px" my="5" borderColor="blackAlpha.400" />

          <FormControl isInvalid={errors.description} id="description" my="1">
            <FormLabel fontWeight="600">설명</FormLabel>
            {isModify[8] ? (
              <HStack>
                <Textarea
                  type="text"
                  defaultValue={house.data?.description}
                  {...register("description", { required: true })}
                />
                <Button>입력</Button>
                <Button onClick={onModify} idx={8}>
                  취소
                </Button>
              </HStack>
            ) : (
              <HStack my="4">
                <Text> {house?.data?.description}</Text>
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
          <Divider borderWidth="1.2px" my="5" borderColor="blackAlpha.400" />
          <Text fontWeight="600" fontSize="23px" mb="8">
            옵션
          </Text>
          <FormControl
            isInvalid={errors.distance_to_station}
            id="distance_to_station"
            my="1"
          >
            <FormLabel fontWeight="600">역까지 거리</FormLabel>

            {isModify[9] ? (
              <HStack>
                <Input
                  type="number"
                  defaultValue={house?.data?.distance_to_station}
                  {...register("distance_to_station")}
                />
                <Button>입력</Button>
                <Button onClick={onModify} idx={9}>
                  취소
                </Button>
              </HStack>
            ) : (
              <HStack my="4">
                <Text> {house?.data?.distance_to_station}</Text>
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
          <Flex justifyContent="flex-end">
            <Button
              my="5"
              type="submit"
              isLoading={mutate.isLoading}
              colorScheme="green"
              size="sm"
              position={"fixed"}
              bottom={10}
              right={10}
            >
              등록하기
            </Button>
          </Flex>
        </form>
      </Center>
    </VStack>
  );
};

export default HouseEdit;
