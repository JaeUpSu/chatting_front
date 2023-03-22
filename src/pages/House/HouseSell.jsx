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
  Image,
  useColorModeValue,
} from "@chakra-ui/react";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getDongList,
  getGuList,
  postHouse,
  getUploadURL,
  uploadImage,
} from "../../services/api";
import { RoomKindsToFront, SellKindsToFront } from "../../services/data";

import { getProcessedData } from "../../utils/getProcessedData";
import { useNavigate } from "react-router-dom";

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

const HouseSell = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const fileInputRef = useRef();

  const [guIdx, setGuIdx] = useState(0);
  const [sellKind, setSellKind] = useState("");
  const [images, setImages] = useState([]);
  const [uploadUrls, setUploadUrls] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageBackUrls, setImageBackUrls] = useState([]);

  const [isError, setError] = useState({
    title: null,
    images: null,
    address: null,
    room: null,
    toilet: null,
    pyeongsu: null,
    sale: null,
    deposit: null,
    monthly_rent: null,
    maintenance_cost: null,
    description: null,
    distance_to_station: null,
  });

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
  const navigate = useNavigate();
  const { mutate } = useMutation(postHouse, {
    onMutate: (d) => console.log("1", d),
    onSuccess: ({ id }) => {
      navigate(`../houseList/house/${id}`);

      console.log("created house!");
    },
    onError: () => {
      console.log("failed to create house!");
    },
  });

  const onSubmit = (formData) => {
    let processedData = getProcessedData(formData, imageBackUrls);
    mutate(processedData);
  };

  const handleValidate = (event) => {};

  const handleGuSelectChange = (event) => {
    const selectedGuVal = event.currentTarget.value;
    const selectedGu = guList?.find((item) => item.value == selectedGuVal);
    setGuIdx(selectedGu.index);
  };

  const handleSellKindSelectChange = (event) => {
    const selectedSellKindVal = event.currentTarget.value;
    setSellKind(selectedSellKindVal);
  };

  const uploadImageMutation = useMutation(uploadImage, {
    onSuccess: ({ result }) => {
      setImageBackUrls((imgs) => {
        const newImgBack = [];
        imgs?.map((item) => {
          newImgBack.push(item);
        });
        newImgBack.push({ url: result.variants[0] });
        return newImgBack;
      });
      console.log(watch());
    },
  });

  const uploadURLMutation = useMutation(getUploadURL, {
    onSuccess: (data) => {
      setUploadUrls((imgs) => {
        const newImgBack = [];
        imgs?.map((item) => {
          newImgBack.push(item);
        });
        newImgBack.push(data.uploadURL);
        return newImgBack;
      });
    },
  });

  useEffect(() => {
    if (images.length === 5) {
      const readerPromises = [];

      for (let i = 0; i < images.length; i++) {
        const file = images[i][0];
        const reader = new FileReader();

        readerPromises.push(
          new Promise((resolve, reject) => {
            reader.onload = () => {
              resolve(reader.result);
            };
            reader.onerror = () => {
              reject(reader.error);
            };
            reader.readAsDataURL(file);
          })
        );
      }

      Promise.all(readerPromises)
        .then((results) => {
          setImageUrls((imgUrls) => {
            const nextImgUrls = [...imgUrls, ...results];
            return nextImgUrls;
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [images]);

  useEffect(() => {
    for (let i = 0; i < images.length; i++) {
      uploadURLMutation.mutate();
    }
  }, [imageUrls]);

  useEffect(() => {
    if (uploadUrls?.length === 5) {
      for (let i = 0; i < 5; i++) {
        uploadImageMutation.mutate({
          uploadURL: uploadUrls[i],
          file: images[i],
        });
      }
    }
  }, [uploadUrls]);

  useEffect(() => {
    if (imageBackUrls?.length === 5) {
      console.log("back", imageBackUrls);
    }
  }, [imageBackUrls]);

  return (
    <VStack>
      <Center
        pb="5vh"
        pt="80vh"
        w="120vw"
        borderWidth="1px"
        borderRadius="lg"
        overflowY="scroll"
        maxHeight="90vh"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.title} id="title" my="1" w="70vw">
            <FormLabel fontWeight="600">제목</FormLabel>
            <Input type="text" {...register("title", { required: true })} />
            {<FormErrorMessage>{`제목을 입력하세요`}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={errors.images} id="images">
            <FormLabel fontWeight="600">
              이미지 ( {images.length} / 5 ){" "}
            </FormLabel>{" "}
            <Input
              type="file"
              multiple
              onChange={(e) => {
                const files = e.target.files;
                console.log(files);
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
            <HStack>
              {imageUrls?.map((item, idx) => {
                if (idx < 5) {
                  return <Image key={idx} src={item} w="6vw" h="4vh" />;
                }
              })}
            </HStack>
          </FormControl>
          <Divider borderWidth="1.2px" my="5" borderColor="blackAlpha.400" />
          <HStack w="70vw">
            <FormControl isInvalid={errors.gu} id="gu" my="1">
              <FormLabel fontWeight="600">구</FormLabel>
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
              <FormLabel fontWeight="600">동</FormLabel>
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
            <FormLabel fontWeight="600">상세주소</FormLabel>
            <Input type="text" {...register("address", { required: true })} />
            <FormErrorMessage>{`상세주소를 입력하세요`}</FormErrorMessage>
          </FormControl>

          <Divider borderWidth="1.2px" my="5" borderColor="blackAlpha.400" />
          <HStack w="70vw">
            <FormControl isInvalid={errors.room_kind} id="room_kind" my="1">
              <FormLabel fontWeight="600">방 종류</FormLabel>
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
              <FormLabel fontWeight="600">거래 종류</FormLabel>
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
              <FormLabel fontWeight="600">방 개수</FormLabel>
              <Input type="number" {...register("room", { required: true })} />
              <FormErrorMessage>{`방 수를 입력하세요`}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.toilet} id="toilet" my="1">
              <FormLabel fontWeight="600">화장실 개수</FormLabel>
              <Input
                type="number"
                {...register("toilet", { required: true })}
              />
              <FormErrorMessage>{`화장실 수 입력하세요`}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.pyeongsu} id="pyeongsu" my="1">
              <FormLabel fontWeight="600">평수</FormLabel>
              <Input
                type="number"
                {...register("pyeongsu", { required: true })}
              />
              <FormErrorMessage>{`평수를 입력하세요`}</FormErrorMessage>
            </FormControl>
          </HStack>
          <Divider borderWidth="1.2px" my="5" borderColor="blackAlpha.400" />

          <Flex justifyContent="flex-end">(만원)</Flex>
          <HStack>
            <FormControl
              isInvalid={errors.sale}
              id="sale"
              my="1"
              isDisabled={sellKind == "SALE" ? false : true}
            >
              <FormLabel fontWeight="600">매매가</FormLabel>
              <Input
                type="number"
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
              <FormLabel fontWeight="600">보증금</FormLabel>
              <Input
                type="number"
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
              <FormLabel fontWeight="600">월세</FormLabel>
              <Input
                type="number"
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
              <FormLabel fontWeight="600">관리비</FormLabel>
              <Input
                type="number"
                {...register("maintenance_cost", { required: true })}
              />
              <FormErrorMessage>{`관리비를 입력하세요`}</FormErrorMessage>
            </FormControl>
          </HStack>

          <Divider borderWidth="1.2px" my="5" borderColor="blackAlpha.400" />

          <FormControl isInvalid={errors.description} id="description" my="1">
            <FormLabel fontWeight="600">설명</FormLabel>
            <Textarea
              type="text"
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
            <FormLabel fontWeight="600">역까지 거리 (m)</FormLabel>
            <Input type="number" {...register("distance_to_station")} />
            <FormErrorMessage>{`역까지 거리를 입력하세요`}</FormErrorMessage>
          </FormControl>
          <Flex justifyContent="flex-end">
            <Button my="5" type="submit" isLoading={mutate.isLoading}>
              판매 등록
            </Button>
          </Flex>
        </form>
      </Center>
    </VStack>
  );
};
export default HouseSell;
