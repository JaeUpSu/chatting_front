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
  useToast,
} from "@chakra-ui/react";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  getHouse,
  putHouse,
  getUploadURL,
  uploadImage,
} from "../../services/api";

import SingleForm from "../../components/Form/SingleForm";
import AddressSelectForm from "../../components/Form/AddressSelectForm";
import KindSelectForm from "../../components/Form/KindSelectForm";
import TripleForm from "../../components/Form/TripleForm";
import PriceForm from "../../components/Form/PriceForm";
import ImageForm from "../../components/Form/ImageForm";
import SingleTextAreaForm from "../../components/Form/SingleTextAreaForm";

const HouseEdit = () => {
  const { id } = useParams();
  const house = useQuery(["house", id], getHouse);
  const navigate = useNavigate();
  const toast = useToast();

  const [initHouse, setInitHouse] = useState(true);
  const [sellKind, setSellKind] = useState("");
  const [uploadUrls, setUploadUrls] = useState([]);
  const [imageBackUrls, setImageBackUrls] = useState([]);
  const [updatedHouse, setUpdatedHouse] = useState({});
  const [updatedData, setUpdatedData] = useState({});
  const [updatedImage, setUpdatedImage] = useState([]);
  const [isUpdatedImage, setIsUpdatedImage] = useState([]);

  // putHouse
  const { mutate } = useMutation(putHouse, {
    onMutate: (d) => {
      console.log("update", d);
    },
    onSuccess: () => {
      toast({
        title: "수정을 완료했습니다!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate(`/houseList/house/${id}`);
    },
    onError: () => {
      console.log("don't update house!");
    },
  });

  // putHouse 실행 버튼
  const onSubmit = () => {
    if (isUpdatedImage?.length > 0) {
      console.log("checking", updatedImage, updatedData, isUpdatedImage);

      for (let i = 0; i < isUpdatedImage?.length; i++) {
        uploadURLMutation.mutate();
      }
    } else {
      console.log(updatedData);
      const processData = updatedData;
      mutate({ id, processData });
    }
  };

  // url 에 image 넣기 mutate => uploadImage
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
    onMutate: (d) => {},
    onError: (e) => {},
  });

  // updatedImage 개수만큼 mutate => getUploadUrl
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
    onMutate: (d) => {},
    onError: (e) => {},
  });

  // 초기화
  useEffect(() => {
    if (house.data && initHouse) {
      setSellKind(house.data?.sell_kind);
      setUpdatedHouse(house.data);
      setInitHouse(false);
    }
  }, [house]);

  // isUpdatedImage 개수만큼 uploadUrls 에 uploadImage mutate
  useEffect(() => {
    if (
      uploadUrls?.length === isUpdatedImage?.length &&
      uploadUrls?.length > 0
    ) {
      for (let i = 0; i < isUpdatedImage?.length; i++) {
        uploadImageMutation.mutate({
          uploadURL: uploadUrls[i],
          file: updatedImage[isUpdatedImage[i]],
        });
      }
    }
  }, [uploadUrls]);

  // 가공한 이미지가 5개가 되면 putHouse mutate
  useEffect(() => {
    if (
      imageBackUrls?.length === isUpdatedImage?.length &&
      isUpdatedImage?.length > 0
    ) {
      let imgs = updatedHouse?.Image;
      isUpdatedImage.forEach((item, idx) => {
        console.log(item, imgs[item], imageBackUrls[idx]);
        imgs[item] = imageBackUrls[idx];
      });
      console.log("lastImg", imgs);
      const processData = { ...updatedData, Image: imgs };
      mutate({ id, processData });
    }
    // console.log("data", updatedData);
  }, [imageBackUrls, updatedImage]);

  return (
    <VStack
      pt="30vh"
      pb="10vh"
      borderWidth="1px"
      borderRadius="lg"
      overflowY="scroll"
      overflowX="hidden"
      maxHeight="85vh"
      justifyContent="center"
    >
      <Center>
        <VStack>
          <Text fontWeight="600" fontSize="23px" mt="50px" w="70vw">
            기본
          </Text>
          <SingleForm
            setUpdatedHouse={setUpdatedHouse}
            setUpdatedData={setUpdatedData}
            value={updatedHouse?.title}
            name="title"
            label="제목"
          />
          <ImageForm
            setUpdatedHouse={setUpdatedHouse}
            setUpdatedImage={setUpdatedImage}
            setUpdated={setIsUpdatedImage}
            values={updatedHouse?.Image}
            name="images"
            label="이미지"
          />
          <Divider borderWidth="1.2px" my="5" borderColor="blackAlpha.400" />
          <AddressSelectForm
            setUpdatedHouse={setUpdatedHouse}
            setUpdatedData={setUpdatedData}
            savedGu={updatedHouse?.gu}
            savedDong={updatedHouse?.dong}
          />
          <SingleForm
            setUpdatedHouse={setUpdatedHouse}
            value={updatedHouse?.address}
            name="address"
            label="상세주소"
            setUpdatedData={setUpdatedData}
          />
          <Divider borderWidth="1.2px" my="5" borderColor="blackAlpha.400" />
          <KindSelectForm
            setUpdatedHouse={setUpdatedHouse}
            setUpdatedData={setUpdatedData}
            setSellKind={setSellKind}
            sellKind={updatedHouse?.sell_kind}
            roomKind={updatedHouse?.room_kind}
          />
          <TripleForm
            setUpdatedHouse={setUpdatedHouse}
            setUpdatedData={setUpdatedData}
            values={[
              updatedHouse?.room,
              updatedHouse?.toilet,
              updatedHouse?.pyeongsu,
            ]}
            names={["room", "toilet", "pyeongsu"]}
            labeles={["방 개수", "화장실 개수", "평수"]}
          />
          <Divider borderWidth="1.2px" my="5" borderColor="blackAlpha.400" />
          <PriceForm
            setUpdatedHouse={setUpdatedHouse}
            setUpdatedData={setUpdatedData}
            sellKind={sellKind}
            values={[
              updatedHouse?.sale,
              updatedHouse?.deposit,
              updatedHouse?.monthly_rent,
              updatedHouse?.maintenance_cost,
            ]}
            names={["sale", "deposit", "monthly_rent", "maintenance_cost"]}
            labeles={["매매가", "보증금", "월세", "관리비"]}
          />
          <Divider borderWidth="1.2px" my="5" borderColor="blackAlpha.400" />

          <SingleTextAreaForm
            setUpdatedHouse={setUpdatedHouse}
            value={updatedHouse?.description}
            name="description"
            label="설명"
            setUpdatedData={setUpdatedData}
          />
          <Flex justifyContent="flex-end">
            <Button
              my="5"
              isLoading={mutate.isLoading}
              colorScheme="green"
              size="lg"
              position={"fixed"}
              bottom={5}
              right={20}
              onClick={onSubmit}
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
