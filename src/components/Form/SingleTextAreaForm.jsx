import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  ButtonGroup,
  Text,
  FormErrorMessage,
  VStack,
  Textarea,
} from "@chakra-ui/react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { HouseRegisterValues } from "../../services/data";

const SingleTextAreaForm = ({
  setUpdatedHouse,
  setUpdatedData,
  value,
  name,
  label,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isModify, setIsModify] = useState(false);

  const onEnter = (data) => {
    let nextHouse = {};
    let nextData = {};
    let isChange = false;
    setUpdatedHouse((prevHouse) => {
      HouseRegisterValues.forEach((item) => {
        if (data[item.eng]) {
          if (data[item.eng] !== prevHouse[item.eng]) {
            nextHouse[item.eng] = data[item.eng];
            isChange = true;
          } else {
            nextHouse[item.eng] = prevHouse[item.eng];
          }
        } else {
          nextHouse[item.eng] = prevHouse[item.eng];
        }
      });
      return nextHouse;
    });
    setUpdatedData((prevData) => {
      HouseRegisterValues.forEach((item) => {
        if (data[item.eng]) {
          nextData[item.eng] = data[item.eng];
        } else if (prevData[item.eng]) {
          nextData[item.eng] = prevData[item.eng];
        }
      });
      return nextData;
    });
    if (isChange) {
      setIsModify(false);
    }
  };

  const onModify = () => {
    setIsModify(!isModify);
  };

  return (
    <>
      <FormLabel marginBottom="0px" w="40vw" fontWeight="600" minW="450px">
        {label}
      </FormLabel>
      {isModify ? (
        <form onSubmit={handleSubmit(onEnter)}>
          <FormControl
            isInvalid={errors[name]}
            id={name}
            my="1"
            w="40vw"
            minW="450px"
          >
            <VStack>
              <Textarea
                type="text"
                defaultValue={value}
                {...register(name, { required: true })}
              />
              <ButtonGroup justifyContent="flex-end" w="40vw" minW="450px">
                <Button type="submit" w="5vw">
                  입력
                </Button>
                <Button onClick={onModify} w="5vw">
                  취소
                </Button>
              </ButtonGroup>
            </VStack>
            <FormErrorMessage>{`${label}을 적어주세요`}</FormErrorMessage>
          </FormControl>
        </form>
      ) : (
        <HStack w="40vw" minW="450px" justifyContent="space-between">
          <VStack justifyContent="flex-start">
            <Text w="100%">{value}</Text>
          </VStack>
          <Button onClick={onModify} w="5.5vw">
            수정
          </Button>
        </HStack>
      )}
    </>
  );
};

export default SingleTextAreaForm;
