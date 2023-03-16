import { useEffect } from "react";
import {
  Box,
  Button,
  VStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { IoIosArrowDown } from "react-icons/io";

import { options } from "../../services/data";

import DataRadioCard from "../Radio/RadioCard";

function FilterMenu({ names, onUpdate }) {
  return (
    <Menu>
      <MenuButton
        as={Button}
        colorScheme="red"
        p="15px"
        rightIcon={<IoIosArrowDown />}
      >
        {names.kor}
      </MenuButton>
      <MenuList>
        <MenuItem>추가필터</MenuItem>
      </MenuList>
    </Menu>
  );
}
export default FilterMenu;
