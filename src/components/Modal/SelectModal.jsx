import {
  Modal,
  ModalOverlay,
  ModalContent,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { addressKinds } from "../../services/data";

function SelectModal({ valName, list, name, active, onNextActive }) {
  const [btnName, setBtnName] = useState(valName);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (name == addressKinds[0]) {
      setBtnName("서울");
      localStorage.setItem(name, list.indexOf("서울"));
    }
    console.log(active);
  }, []);

  const onSelect = (e) => {
    const selectedVal = e.currentTarget.getAttribute("value");
    setBtnName(selectedVal);
    onNextActive();
    localStorage.setItem(name, list.indexOf(selectedVal));
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
