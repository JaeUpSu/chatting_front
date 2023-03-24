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
        <Image
          src={src}
          w="8vw"
          h="10vh"
          minW="84px"
          minH="80px"
          cursor="pointer"
          onClick={onOpen}
        />
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose} w="45vw">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="red.400">BangSam</ModalHeader>
          <ModalCloseButton />
          <ModalBody w="100%" display="flex" justifyContent="center">
            <Image src={src} maxW="30vw" maxH="30vh" />
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
