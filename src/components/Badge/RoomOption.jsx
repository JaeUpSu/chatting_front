import { Text, VStack } from "@chakra-ui/react";
import { BiBed, BiCloset } from "react-icons/bi";
import {
  GiBurningEmbers,
  GiChickenOven,
  GiConverseShoe,
  GiWashingMachine,
} from "react-icons/gi";
import { FaBurn, FaSink } from "react-icons/fa";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { MdComputer, MdMicrowave } from "react-icons/md";
import { RiComputerLine } from "react-icons/ri";
import { FiWifi } from "react-icons/fi";
import { TbAirConditioning } from "react-icons/tb";

export default function RoomOption({ type }) {
  const option = {
    에어컨: <TbAirConditioning size={"40"} />,
    옷장: <BiCloset size={"40"} />,
    세탁기: <GiWashingMachine size="40" />,
    침대: <BiBed size="40" />,
    싱크대: <FaSink size="40" />,
    신발장: <GiConverseShoe size="40" />,
    냉장고: <CgSmartHomeRefrigerator size="40" />,
    전자레인지: <MdMicrowave size="40" />,
    tv: <RiComputerLine size="40" />,
    무선인터넷: <FiWifi size="40" />,
    컴퓨터: <MdComputer size="40" />,
    인덕션: <FaBurn size="40" />,
    가스레인지: <GiBurningEmbers size="40" />,
    오븐: <GiChickenOven size="40" />,
  };
  return (
    <VStack>
      {option[type?.name.replace(" ", "")]}
      <Text>{type?.name}</Text>
    </VStack>
  );
}
