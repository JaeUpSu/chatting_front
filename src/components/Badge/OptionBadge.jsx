import { Badge, Center, Text } from "@chakra-ui/react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function OptionBadge({ name, option }) {
  return (
    <>
      <Badge
        fontSize="18px"
        colorScheme="red.300"
        backgroundColor="blue.300"
        color="white"
        borderRadius="10px"
        p="5px 15px"
        mr="3px"
        ml="10px"
        position="relative"
        textAlign="center"
        name={name}
        value={option}
      >
        {option}
        <Center
          w="100%"
          borderRadius="10px"
          h="100%"
          backgroundColor="transparent"
          color="black"
          fontWeight="700"
          cursor="pointer"
          opacity="0"
          position="absolute"
          top="0px"
          left="0px"
          _hover={{
            backgroundColor: "blue.800",
            opacity: 1,
            boxShadow: "0px 0px 1px 1px black",
            transition: "all 0.2s",
          }}
        >
          <FontAwesomeIcon size="lg" color="white" icon={faTrash} />
        </Center>
      </Badge>
    </>
  );
}

export default OptionBadge;
