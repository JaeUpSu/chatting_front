import {
  Button,
  VStack,
  Center,
  Divider,
  Flex,
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
  getAdditionalOptions,
  getSafetyOptions,
} from "../../services/api";

import SingleForm from "../../components/Form/SingleForm";
import AddressSelectForm from "../../components/Form/AddressSelectForm";
import CheckboxForm from "../../components/Form/CheckboxForm";
import TripleForm from "../../components/Form/TripleForm";
import PriceForm from "../../components/Form/PriceForm";
import ImageForm from "../../components/Form/ImageForm";
import SingleTextAreaForm from "../../components/Form/SingleTextAreaForm";
import {
  getMatchSellKindPrice,
  matchSellKindPrice,
} from "../../utils/matchSellKindPrice";
import RoomKindSelectForm from "../../components/Form/RoomKindSelectForm";
import SellKindSelectForm from "../../components/Form/SellKindSelectForm";

const HouseEdit = () => {
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  const house = useQuery(["house", id], getHouse, {
    retry: false,
    refetchOnWindowFocus: false,
    onError: (error) =>
      error.response.status === 404 ? navigate("../errorpage") : null,
  });

  const [initHouse, setInitHouse] = useState(true); // 초기화
  const [sellKind, setSellKind] = useState(""); // sell_kind 별 flag 를 만들기 위한 변수
  const [uploadUrls, setUploadUrls] = useState([]); // Back 에서 만든 Image 를 저장할 url 리스트
  const [imageBackUrls, setImageBackUrls] = useState([]); // Back 입력할 가공한 Image 리스트
  const [updatedHouse, setUpdatedHouse] = useState({}); // 바뀐 데이터를 포함한 house data / display 용도
  const [updatedData, setUpdatedData] = useState({}); // 바뀐 데이터만 저장한 리스트
  const [updatedImage, setUpdatedImage] = useState([]); // 바뀐 이미지 저장 리스트
  const [isUpdatedImage, setIsUpdatedImage] = useState([]); // 바뀐 이미지의 순서 저장 리스트

  // putHouse
  const { mutate } = useMutation(putHouse, {
    onMutate: () => {
      toast({
        title: "수정중...",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
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
    // sell_kind 와 price match
    if (!matchSellKindPrice(updatedData, house?.data)) {
      alert(
        "\n매매를 선택하는 경우 매매가\n전세를 선택하는 경우 보증금\n월세를 선택하는 경우 월세/보증금\n\n필수로 적어주세요"
      );
    } else if (isUpdatedImage?.length > 0) {
      for (let i = 0; i < isUpdatedImage?.length; i++) {
        uploadURLMutation.mutate();
      }
    } else {
      const processData = getMatchSellKindPrice(updatedData, house?.data);
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
        imgs[item] = imageBackUrls[idx];
      });
      const processData = {
        ...getMatchSellKindPrice(updatedData, house?.data),
        Image: imgs,
      };
      mutate({ id, processData });
    }
  }, [imageBackUrls, updatedImage]);

  return (
    <VStack h="90vh" overflowY="scroll" pb="10vh">
      <Center pt="2vh">
        <VStack>
          <ImageForm
            setUpdatedHouse={setUpdatedHouse}
            setUpdatedImage={setUpdatedImage}
            setUpdated={setIsUpdatedImage}
            values={updatedHouse?.Image}
            name="images"
            label="이미지"
          />
          <SingleForm
            setUpdatedHouse={setUpdatedHouse}
            setUpdatedData={setUpdatedData}
            value={updatedHouse?.title}
            name="title"
            label="제목"
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

          <RoomKindSelectForm
            setUpdatedHouse={setUpdatedHouse}
            setUpdatedData={setUpdatedData}
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
          <SellKindSelectForm
            setUpdatedHouse={setUpdatedHouse}
            setUpdatedData={setUpdatedData}
            setSellKind={setSellKind}
            sellKind={updatedHouse?.sell_kind}
          />
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

          <CheckboxForm
            setUpdatedHouse={setUpdatedHouse}
            setUpdatedData={setUpdatedData}
            values={updatedHouse?.option}
            name="option"
            label="추가 옵션"
            api={getAdditionalOptions}
          />
          <Divider borderWidth="1.2px" my="5" borderColor="blackAlpha.400" />
          <CheckboxForm
            setUpdatedHouse={setUpdatedHouse}
            setUpdatedData={setUpdatedData}
            values={updatedHouse?.Safetyoption}
            name="Safetyoption"
            label="안전 옵션"
            api={getSafetyOptions}
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
              업데이트
            </Button>
          </Flex>
        </VStack>
      </Center>
    </VStack>
  );
};

export default HouseEdit;
