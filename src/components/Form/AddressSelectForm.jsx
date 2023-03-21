import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Text,
  Select,
  FormErrorMessage,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { HouseRegisterValues } from "../../services/data";
import { getDongList, getGuList } from "../../services/api";

const AddressSelectForm = ({ setUpdatedHouse, savedGu, savedDong }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [guIdx, setGuIdx] = useState(0);
  const [isModify, setIsModify] = useState(false);

  const guListData = useQuery(["gulist"], getGuList);
  const dongListData = useQuery(["donglist", guIdx], getDongList);

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

  const handleGuSelectChange = (event) => {
    const selectedGuVal = event.currentTarget.value;
    const selectedGu = guList?.find((item) => item.value == selectedGuVal);
    console.log(selectedGuVal, selectedGu?.index);
    setGuIdx(selectedGu?.index);
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
  };

  const onModify = () => {
    setIsModify(!isModify);
  };

  useEffect(() => {
    const selectedGu = guList?.find((item) => item.value == savedGu);
    setGuIdx(selectedGu?.index);
  }, [guList]);

  useEffect(() => {
    console.log(guIdx);
  }, [guIdx]);

  return (
    <form onSubmit={handleSubmit(onEnter)}>
      <HStack w="60vw">
        <FormControl isInvalid={errors.gu} id="gu" my="1" w="60vw">
          <FormLabel fontWeight="600">구</FormLabel>
          {isModify ? (
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
              <Text>{savedGu}</Text>
            </HStack>
          )}
          <FormErrorMessage>{`구를 선택해주세요`}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.dong} id="dong" my="1" w="60vw">
          <FormLabel fontWeight="600">동</FormLabel>
          {isModify ? (
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
              <Button type="submit">입력</Button>
              <Button onClick={onModify}>취소</Button>
            </HStack>
          ) : (
            <HStack my="4">
              <Text>{savedDong?.name}</Text>
              <Button position="absolute" right="1%" onClick={onModify} idx={2}>
                수정
              </Button>
            </HStack>
          )}
          <FormErrorMessage>{`동을 선택해주세요`}</FormErrorMessage>
        </FormControl>
      </HStack>
    </form>
  );
};

export default AddressSelectForm;
