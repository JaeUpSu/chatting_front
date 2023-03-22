import {
  Modal,
  ModalOverlay,
  ModalContent,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { addressKinds } from "../../services/data";
import { getObjListIndexByName } from "../../utils/getIndex";

function SelectModal({
  valName,
  list,
  name,
  active,
  onNextActive,
  onSetAddress,
}) {
  const [btnName, setBtnName] = useState(valName);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (name == addressKinds[0]) {
      setBtnName("서울");
      sessionStorage.setItem(name, "서울");
    }
  }, []);

  const onSelect = (e) => {
    const selectedVal = e.currentTarget.getAttribute("value");
    const selectedIdx = e.currentTarget.getAttribute("idx");
    setBtnName(selectedVal);
    onNextActive();
    sessionStorage.setItem(name, selectedVal);
    sessionStorage.setItem(name + "Idx", selectedIdx);

    if (name.includes("gugunsi")) {
      sessionStorage.setItem("ebmyeondong", "nothing");
    }

    onSetAddress((items) => {
      let nextAddress = [0, 0, 0];
      items.forEach((item, idx) => {
        if (name == addressKinds[idx]) {
          nextAddress[idx] = selectedVal;
        } else {
          nextAddress[idx] = item;
        }
      });
      return nextAddress;
    });
    onClose();
  };

  return (
    <>
      {active ? (
        <Button
          onClick={onOpen}
          variant="ghost"
          border="2px solid rgb(6, 6, 6, 0.5)"
          color="#454545"
        >
          {btnName}
        </Button>
      ) : (
        <Button
          variant="ghost"
          border="1px solid rgb(6, 6, 6, 0.3)"
          color="#656565"
          isDisabled
        >
          {name == addressKinds[0] ? "서울" : btnName}
        </Button>
      )}
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          height="50%"
          overflowY="auto"
          css={{
            "&::-webkit-scrollbar": {
              width: "10px",
            },
            "&::-webkit-scrollbar-track": {
              width: "12px",
              background: "rgb(55,55,55,0.1)",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "rgb(55,55,55,0.5)",
              borderRadius: "20px",
            },
          }}
        >
          {list.map((item, idx) => {
            return (
              <Button
                key={idx}
                variant="ghost"
                value={item.name}
                idx={item.pk}
                onClick={onSelect}
                fontSize="20px"
                p="10px"
              >
                {item.name}
              </Button>
            );
          })}
        </ModalContent>
      </Modal>
    </>
  );
}

export default SelectModal;
