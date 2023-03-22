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

import { getHouse, putHouse } from "../../services/api";

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
  const [images, setImages] = useState([]);
  const [updatedHouse, setUpdatedHouse] = useState({});
  const [updatedData, setUpdatedData] = useState({});

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

  const onSubmit = () => {
    console.log(updatedData);
    mutate({ id, updatedData });
  };

  useEffect(() => {
    if (house.data && initHouse) {
      console.log("init", house);
      setSellKind(house.data?.sell_kind);
      setUpdatedHouse(house.data);
      setInitHouse(false);
    }
  }, [house]);

  // useEffect(() => {
  //   console.log("house", updatedHouse);
  // }, [updatedHouse]);
  useEffect(() => {
    console.log("data", updatedData);
  }, [updatedData]);

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
            setUpdatedData={setUpdatedData}
            values={updatedHouse?.Image}
            name="Image"
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
