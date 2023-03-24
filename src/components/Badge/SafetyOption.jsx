import { Text, VStack } from "@chakra-ui/react";
import { BiCctv } from "react-icons/bi";
import { FaFireExtinguisher } from "react-icons/fa";
import { GiStaticGuard } from "react-icons/gi";
import { MdDoorbell } from "react-icons/md";
import { RiAlarmWarningLine } from "react-icons/ri";
import { BsBuildingFillLock, BsHouseLockFill } from "react-icons/bs";

export default function SafetyOption({ type }) {
  const option = {
    공동현관: <BsBuildingFillLock size={"40"} />,
    cctv: <BiCctv size="40" />,
    일산화탄소경보기: <RiAlarmWarningLine size="40" />,
    화재경보기: <FaFireExtinguisher size="40" />,
    경비실: <GiStaticGuard size="40" />,
    도어락: <BsHouseLockFill size="40" />,
  };
  //   const Aircon = () => <TbAirConditioning size={"40"} />;

  return (
    <VStack>
      {option[type?.name.replace(" ", "")]}
      <Text>{type?.name}</Text>
    </VStack>
  );
}
