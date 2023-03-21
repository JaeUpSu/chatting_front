import {
  Button,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Text,
  FormErrorMessage,
  VStack,
} from "@chakra-ui/react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { HouseRegisterValues } from "../../services/data";

const TripleForm = ({ setUpdatedHouse, values, names, labeles }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isModify, setIsModify] = useState(false);

  const onEnter = (data) => {
    console.log("check", data);

    let nextHouse = {};
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
    if (isChange) {
      setIsModify(false);
    }
  };

  const onModify = () => {
    setIsModify(!isModify);
  };

  return (
    <>
      <FormLabel marginBottom="0px" w="60vw" fontWeight="600">
        {`${labeles[0]} / ${labeles[1]} / ${labeles[2]}`}
      </FormLabel>
      {isModify ? (
        <form onSubmit={handleSubmit(onEnter)}>
          <HStack w="60vw">
            <FormControl
              isInvalid={errors[names[0]]}
              id={names[0]}
              my="1"
              w="60vw"
            >
              <Input
                type="text"
                defaultValue={values[0]}
                {...register(names[0], { required: true })}
              />
              <FormErrorMessage>{`${labeles[0]}을 적어주세요`}</FormErrorMessage>
            </FormControl>{" "}
            <FormControl
              isInvalid={errors[names[1]]}
              id={names[1]}
              my="1"
              w="60vw"
            >
              <Input
                type="text"
                defaultValue={values[1]}
                {...register(names[1], { required: true })}
              />
              <FormErrorMessage>{`${labeles[1]}을 적어주세요`}</FormErrorMessage>
            </FormControl>{" "}
            <FormControl
              isInvalid={errors[names[2]]}
              id={names[2]}
              my="1"
              w="60vw"
            >
              <HStack>
                <Input
                  type="text"
                  defaultValue={values[2]}
                  {...register(names[2], { required: true })}
                />
                <Button type="submit">입력</Button>
                <Button onClick={onModify}>취소</Button>
              </HStack>
              <FormErrorMessage>{`${labeles[2]}을 적어주세요`}</FormErrorMessage>
            </FormControl>
          </HStack>
        </form>
      ) : (
        <VStack w="60vw">
          <HStack w="60vw" justifyContent="space-between">
            <Text w="20%">{values[0]}</Text>
            <Text w="20%">{values[1]}</Text>
            <Text w="30%">{values[2]}</Text>
            <Button onClick={onModify}>수정</Button>
          </HStack>
        </VStack>
      )}
    </>
  );
};

export default TripleForm;
