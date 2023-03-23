import {
  Image,
  useDisclosure,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
  ModalContent,
  Button,
  Tooltip,
  Center,
} from "@chakra-ui/react";
function ImageCard({ setImages, setImageUrls, src, idx }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onDelete = () => {
    setImages((imgs) => {
      const newImgs = [];
      imgs.forEach((item, _idx) => {
        if (idx !== _idx) {
          newImgs.push(item);
        }
      });
      return newImgs;
    });

    setImageUrls((imgs) => {
      const newImgUrls = [];
      imgs.forEach((item, _idx) => {
        if (idx !== _idx) {
          newImgUrls.push(item);
        }
      });
      return newImgUrls;
    });
    onClose();
  };

  return (
    <>
      <Tooltip label="Delete Click">
        <Image src={src} w="11vw" h="7vh" cursor="pointer" onClick={onOpen} />
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="red.400">BangSam</ModalHeader>
          <ModalCloseButton />
          <ModalBody w="55vw">
            <Center>
              <Image src={src} maxW="40vw" maxH="30vh" />
            </Center>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onDelete}>
              Delete
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ImageCard;
