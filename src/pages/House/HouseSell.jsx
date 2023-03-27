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
  CheckboxGroup,
  Checkbox,
  Grid,
  useToast,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getDongList,
  getGuList,
  postHouse,
  getUploadURL,
  uploadImage,
  getAdditionalOptions,
  getSafetyOptions,
} from "../../services/api";
import {
  ErrorCheckMenu,
  RoomKindsToFront,
  SellKindsToFront,
} from "../../services/data";

import { getProcessedData } from "../../utils/getProcessedData";
import { useNavigate } from "react-router-dom";
import { validiate } from "../../services/validate";
import ImageCard from "../../components/Card/ImageCard";
import scrollbarStyle from "../../styles/scroll_bar";
import { getMatchSellKindPrice } from "../../utils/matchSellKindPrice";

const HouseSell = () => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [guIdx, setGuIdx] = useState(0);
  const [sellKind, setSellKind] = useState("");
  const [images, setImages] = useState([]);
  const [uploadUrls, setUploadUrls] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageBackUrls, setImageBackUrls] = useState([]);
  const [datas, setDatas] = useState({});
  const [isPost, setIsPost] = useState(false);
  const [addition, setAddition] = useState([]);
  const [safety, setSafety] = useState([]);

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
  });

  const guListData = useQuery(["gulist"], getGuList);
  const dongListData = useQuery(["donglist", guIdx], getDongList);
  const additionalOptionsData = useQuery(
    ["additionalOptions"],
    getAdditionalOptions
  );
  const safetyOptionsData = useQuery(["safetyOptions"], getSafetyOptions);

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
    onMutate: (d) => {
      console.log("post", d);
      toast({
        title: `[${d.title}]    등록중...`,
        status: "info",
        duration: 6000,
        isClosable: true,
      });
    },
    onSuccess: ({ id }) => {
      navigate(`../houseList/house/${id}`);
      console.log("created house!");
    },
    onError: () => {
      console.log("failed to create house!");
    },
  });

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

  const onSubmit = (formData) => {
    if (images.length === 5) {
      setDatas(formData);
      setIsPost(true);
    } else {
      alert("이미지 5개를 입력해야 등록가능합니다.");
    }
  };

  const handleValidate = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setError((items) => {
      let nextItems = {};
      ErrorCheckMenu.forEach((_name) => {
        if (name !== _name) {
          nextItems[_name] = items[_name];
        } else {
          nextItems[name] = validiate(value, name);
        }
      });
      return nextItems;
    });
  };

  const handleGuSelectChange = (event) => {
    const selectedGuVal = event.currentTarget.value;
    const selectedGu = guList?.find((item) => item.value == selectedGuVal);
    setGuIdx(selectedGu.index);
  };

  const handleSellKindSelectChange = (event) => {
    const selectedSellKindVal = event.currentTarget.value;
    setSellKind(selectedSellKindVal);
  };

  // preview 이미지 setting
  const handleImg = (_file) => {
    const readerPromises = [];

    const file = _file[0];
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
  };

  // 이미지가 5개가 되면 getUploadUrl mutate
  useEffect(() => {
    if (isPost && imageUrls.length === 5) {
      for (let i = 0; i < images.length; i++) {
        uploadURLMutation.mutate();
      }
    }
  }, [imageUrls, isPost]);

  // uploadUrls 가 5개가 만들어지면 images 첨부
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

  // 가공한 이미지가 5개가 되면 uploadUrl mutate
  useEffect(() => {
    if (imageBackUrls.length === 5) {
      let processedData = getProcessedData(
        getMatchSellKindPrice(datas),
        imageBackUrls,
        addition,
        safety
      );
      mutate(processedData);
    }
  }, [imageBackUrls, datas]);

  return (
    <VStack h="100vh" overflowY="scroll" pb="5vh" sx={scrollbarStyle}>
      <Center pt="2vh" pb="5vh">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.title} id="title" my="5" w="40vw">
            <FormLabel>제목</FormLabel>
            <Input
              type="text"
              placeholder="제목을 입력해주세요"
              {...register("title", { required: true })}
              onChange={handleValidate}
            />
            {isError["title"] && (
              <FormErrorMessage>{isError["title"]}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={errors.images} id="images" w="40vw">
            <FormLabel>
              <HStack alignItems="center">
                <Text> 이미지 ( {images.length} )</Text>
                <Text fontSize="12px">5개 필수</Text>
              </HStack>
            </FormLabel>{" "}
            <Input
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              multiple
              onChange={(e) => {
                const files = e.target.files;
                setImages((list) => {
                  const imgs = [];
                  list.map((item) => {
                    imgs.push(item);
                  });
                  imgs.push(files);
                  return imgs;
                });
                handleImg(files);
              }}
              isDisabled={images.length === 5 ? true : false}
            />
            <HStack>
              {imageUrls?.map((item, idx) => {
                if (idx < 5) {
                  return (
                    <ImageCard
                      key={idx}
                      idx={idx}
                      src={item}
                      setImageUrls={setImageUrls}
                      setImages={setImages}
                    />
                  );
                }
              })}
            </HStack>
          </FormControl>
          <HStack w="40vw" mt="3vw" justifyContent="space-between">
            <FormControl id="si" my="1" w="17vw">
              <FormLabel>시</FormLabel>
              <Input fontSize="14px" defaultValue="서울" isDisabled={true} />
            </FormControl>
            <FormControl isInvalid={errors.gu} id="gu" my="1" w="17vw">
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
            <FormControl isInvalid={errors.dong} id="dong" my="1" w="17vw">
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
          <FormControl isInvalid={errors.address} id="address" my="3" w="40vw">
            <FormLabel fontWeight="600">상세주소</FormLabel>
            <Input
              type="text"
              placeholder="상세주소를 입력해주세요"
              {...register("address", { required: true })}
              onChange={handleValidate}
            />
            {isError["address"] && (
              <FormErrorMessage>{isError["address"]}</FormErrorMessage>
            )}
          </FormControl>
          <Divider
            borderWidth="1.2px"
            my="5"
            borderColor="blackAlpha.400"
            w="42vw"
          />
          <FormControl
            isInvalid={errors.sell_kind}
            id="sell_kind"
            my="6"
            w="40vw"
          >
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
          <Flex justifyContent="flex-end" w="40vw">
            <Text mb="3">(단위 : 만원)</Text>
          </Flex>

          <HStack w="40vw">
            <FormControl
              isInvalid={errors.sale}
              id="sale"
              my="1"
              isDisabled={sellKind == "SALE" ? false : true}
            >
              <FormLabel>매매가 </FormLabel>
              <Input
                type="number"
                fontSize="12px"
                placeholder={sellKind == "SALE" ? "매매가를 입력해주세요" : ""}
                {...register("sale", {
                  required: sellKind == "SALE" ? true : false,
                })}
                onChange={handleValidate}
              />
              {isError["sale"] && (
                <FormErrorMessage>{isError["sale"]}</FormErrorMessage>
              )}
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
                fontSize="12px"
                placeholder={
                  sellKind == "CHARTER" || sellKind == "MONTHLY_RENT"
                    ? "보증금을 입력해주세요"
                    : ""
                }
                {...register("deposit", {
                  required:
                    sellKind == "CHARTER" || sellKind == "MONTHLY_RENT"
                      ? true
                      : false,
                })}
                onChange={handleValidate}
              />
              {isError["deposit"] && (
                <FormErrorMessage>{isError["deposit"]}</FormErrorMessage>
              )}
            </FormControl>
          </HStack>
          <HStack w="40vw">
            <FormControl
              isInvalid={errors.monthly_rent}
              id="monthly_rent"
              my="1"
              isDisabled={sellKind == "MONTHLY_RENT" ? false : true}
            >
              <FormLabel>월세</FormLabel>
              <Input
                type="number"
                fontSize="12px"
                placeholder={
                  sellKind == "MONTHLY_RENT" ? "월세를 입력해주세요" : ""
                }
                {...register("monthly_rent", {
                  required: sellKind == "MONTHLY_RENT" ? true : false,
                })}
                onChange={handleValidate}
              />
              {isError["monthly_rent"] && (
                <FormErrorMessage>{isError["monthly_rent"]}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              isInvalid={errors.maintenance_cost}
              id="maintenance_cost"
              my="1"
            >
              <FormLabel>관리비</FormLabel>
              <Input
                type="number"
                fontSize="12px"
                placeholder="관리비를 입력해주세요"
                {...register("maintenance_cost", { required: true })}
              />
              {isError["maintenance_cost"] && (
                <FormErrorMessage>
                  {isError["maintenance_cost"]}
                </FormErrorMessage>
              )}
            </FormControl>
          </HStack>
          <Divider
            borderWidth="1.2px"
            my="5"
            borderColor="blackAlpha.400"
            w="40vw"
          />
          <FormControl
            isInvalid={errors.room_kind}
            id="room_kind"
            mt="2"
            mb="7"
            w="40vw"
          >
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
          <HStack w="40vw">
            <FormControl isInvalid={errors.room} id="room" my="1">
              <FormLabel>방 개수</FormLabel>
              <Input
                type="number"
                fontSize="12px"
                placeholder="방 개수를 입력해주세요"
                {...register("room", { required: true })}
                onChange={handleValidate}
              />
              {isError["room"] && (
                <FormErrorMessage>{isError["room"]}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              isInvalid={errors.toilet}
              id="toilet"
              my="1"
              minW="120px"
            >
              <FormLabel>화장실 개수</FormLabel>
              <Input
                type="number"
                fontSize="12px"
                placeholder="화장실 개수를 입력해주세요"
                {...register("toilet", { required: true })}
                onChange={handleValidate}
              />
              {isError["toilet"] && (
                <FormErrorMessage>{isError["toilet"]}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={errors.pyeongsu} id="pyeongsu" my="1">
              <FormLabel>평수</FormLabel>
              <Input
                type="number"
                fontSize="12px"
                placeholder="평수를 입력해주세요"
                {...register("pyeongsu", { required: true })}
                onChange={handleValidate}
              />
              {isError["pyeongsu"] && (
                <FormErrorMessage>{isError["pyeongsu"]}</FormErrorMessage>
              )}
            </FormControl>
          </HStack>
          <Divider
            borderWidth="1.2px"
            my="5"
            borderColor="blackAlpha.400"
            w="40vw"
          />
          <FormControl id="additionalOptions" mt="2" mb="7" w="45vw">
            <FormLabel>추가옵션</FormLabel>
            <CheckboxGroup
              colorScheme="green"
              value={addition}
              onChange={(values) => setAddition(values)}
            >
              {additionalOptionsData?.data?.map((item, idx) => {
                return (
                  <Checkbox
                    key={idx}
                    value={item.name}
                    mx="3"
                    w="13vw"
                    minW="110px"
                    h="5vh"
                  >
                    {item.name}
                  </Checkbox>
                );
              })}
            </CheckboxGroup>
          </FormControl>
          <Divider
            borderWidth="1.2px"
            my="5"
            borderColor="blackAlpha.400"
            w="40vw"
          />
          <FormControl id="safetyOptions" mt="2" mb="7" w="45vw">
            <FormLabel>안전옵션</FormLabel>
            <CheckboxGroup
              colorScheme="green"
              value={safety}
              onChange={(values) => setSafety(values)}
            >
              {safetyOptionsData?.data?.map((item, idx) => {
                return (
                  <Checkbox
                    key={idx}
                    value={item.name}
                    mx="3"
                    minW="110px"
                    w="13vw"
                    h="5vh"
                  >
                    {item.name}
                  </Checkbox>
                );
              })}
            </CheckboxGroup>
          </FormControl>
          <FormControl
            isInvalid={errors.description}
            id="description"
            my="1"
            w="40vw"
          >
            <FormLabel>설명</FormLabel>
            <Textarea
              type="text"
              placeholder="설명을 입력해주세요"
              {...register("description", { required: true })}
              onChange={handleValidate}
            />
            {isError["description"] && (
              <FormErrorMessage>{isError["description"]}</FormErrorMessage>
            )}
          </FormControl>
          <Flex justifyContent="flex-end" w="40vw">
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
