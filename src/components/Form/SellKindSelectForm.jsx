import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Text,
  Select,
  FormErrorMessage,
} from "@chakra-ui/react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { SellKindsToFront } from "../../services/data";
import { HouseRegisterValues } from "../../services/data";

const SellKindSelectForm = ({
  setUpdatedHouse,
  setUpdatedData,
  setSellKind,
  sellKind,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isModify, setIsModify] = useState(false);

  const sellKindOptions = ["SALE", "CHARTER", "MONTHLY_RENT"].map(
    (sellKind) => ({
      value: sellKind,
      label: SellKindsToFront[sellKind],
    })
  );

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

  const handleSellKindSelectChange = (event) => {
    const selectedSellKindVal = event.currentTarget.value;
    setSellKind(selectedSellKindVal);
  };

  const onModify = () => {
    setIsModify(!isModify);
  };

  return (
    <>
      <FormLabel marginBottom="0" fontWeight="600" w="40vw" minW="450px" my="2">
        거래 종류
      </FormLabel>
      {isModify ? (
        <form onSubmit={handleSubmit(onEnter)}>
          <FormControl isInvalid={errors.sell_kind} id="sell_kind" my="1">
            <HStack w="40vw" minW="450px">
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
              <HStack>
                <Button type="submit" w="5vw">
                  입력
                </Button>
                <Button onClick={onModify} w="5vw">
                  취소
                </Button>
              </HStack>
            </HStack>
            <FormErrorMessage>{`거래 종류를 선택해주세요`}</FormErrorMessage>
          </FormControl>
        </form>
      ) : (
        <HStack justifyContent="space-between" w="100%" my="4" h="5.3vh">
          <Text>{sellKind ? SellKindsToFront[sellKind] : ""}</Text>
          <Button onClick={onModify} w="5.5vw">
            수정
          </Button>
        </HStack>
      )}
    </>
  );
};

export default SellKindSelectForm;
