import {
  Modal,
  ModalOverlay,
  ModalContent,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";

function SelectModal({ valName, list }) {
  const [btnName, setBtnName] = useState(valName);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSelect = (e) => {
    const selectedVal = e.currentTarget.getAttribute("value");
    setBtnName(selectedVal);
    localStorage.setItem(valName, selectedVal);
    onClose();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        variant="ghost"
        border="1px solid rgb(6, 6, 6, 0.3)"
        color="#656565"
      >
        {btnName}
      </Button>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {list.map((item, idx) => {
            return (
              <Button key={idx} variant="ghost" value={item} onClick={onSelect}>
                {item}
              </Button>
            );
          })}
        </ModalContent>
      </Modal>
    </>
  );
}

export default SelectModal;
