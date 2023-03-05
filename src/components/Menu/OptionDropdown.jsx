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
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";

import { options, optionsMenu } from "../../services/data";
import { getOptions } from "../../services/local";
import { getOptionsUrl } from "../../utils/getOptionsUrl";
import { getAddressByUrl } from "../../utils/getAddressByUrl";
import DataRadioCard from "../Radio/RadioCard";

function OptionDropdown() {
  const navigate = useNavigate();
  const params = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [address, setAddress] = useState("");

  const onOptions = () => {
    navigate(`/houselist/${params.address}/${getOptionsUrl(getOptions())}`);
  };

  const onMenuClose = () => {
    localStorage.setItem("isOption", true);
    onOptions();
    onClose();
  };

  useEffect(() => {
    setAddress(getAddressByUrl(params.address));
  }, []);

  return (
    <>
      {" "}
      <FontAwesomeIcon
        size={"2x"}
        icon={faSliders}
        onClick={onOpen}
        cursor="pointer"
      />
      <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent h="560px">
          <DrawerHeader borderBottomWidth="1px">
            <Heading lineHeight="tall" w="600px">
              <Highlight
                query={address}
                styles={{
                  mx: "10",
                  px: "2",
                  py: "1",
                  rounded: "full",
                  bg: "red.100",
                  fontSize: "23px",
                }}
              >
                {`House Option ${address}`}
              </Highlight>
            </Heading>
          </DrawerHeader>

          <DrawerBody>
            <Grid gap="10px">
              {optionsMenu.map((op, idx) => {
                if (idx < 5 && idx > 0) {
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
                } else {
                  return "";
                }
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
