import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
  useDisclosure,
  Heading,
  Highlight,
  Grid,
  GridItem,
  IconButton,
  ButtonGroup,
} from "@chakra-ui/react";
import { HiOutlineAdjustments } from "react-icons/hi";

import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { options, optionsMenu, filterMenu } from "../../services/data";
import { getOptions } from "../../services/local";
import { getOptionsUrl } from "../../utils/getOptionsUrl";

import DataRadioCard from "../Radio/RadioCard";

function OptionDropdown() {
  const navigate = useNavigate();
  const params = useParams();

  const [address, setAddress] = useState("서울");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onOptions = () => {
    navigate(`/houselist/${params.address}/${getOptionsUrl(getOptions())}`);
  };

  const onMenuClose = () => {
    sessionStorage.setItem("isOption", true);
    onOptions();
    onClose();
  };

  useEffect(() => {
    const gugunsi = sessionStorage.getItem("gugunsi");
    const ebmyeondong = sessionStorage.getItem("ebmyeondong");

    setAddress(`서울 ${gugunsi} ${ebmyeondong}`);
  }, [params]);

  return (
    <>
      <IconButton
        aria-label="Filter"
        variant="outline"
        colorScheme="white"
        borderWidth="2px"
        onClick={onOpen}
        icon={<HiOutlineAdjustments size="sm" color="black" />}
      />
      <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent h="560px">
          <DrawerHeader borderBottomWidth="1px">
            <Heading lineHeight="tall" w="600px">
              <Highlight
                query={address ? address : ""}
                styles={{
                  mx: "10",
                  px: "2",
                  py: "1",
                  rounded: "full",
                  bg: "red.100",
                  fontSize: "23px",
                }}
              >
                {`House Option ${address ? address : ""}`}
              </Highlight>
            </Heading>
          </DrawerHeader>

          <DrawerBody>
            <Grid gap="10px">
              {filterMenu.map((op, idx) => {
                return (
                  <GridItem key={idx}>
                    <br />
                    <DataRadioCard
                      name={op.kor}
                      valueName={op.eng}
                      data={options[op.eng]}
                    />
                  </GridItem>
                );
              })}
              <br />
            </Grid>
          </DrawerBody>
          <br />

          <Button fontWeight="700" onClick={onMenuClose}>
            S e a r c h
          </Button>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default OptionDropdown;
