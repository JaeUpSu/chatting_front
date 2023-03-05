import { Badge, Text } from "@chakra-ui/react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function OptionBadge({ name, option }) {
  return (
    <>
      <Badge
        fontSize="18px"
        colorScheme="red.300"
        backgroundColor="rgb(225, 207, 240)"
        color="blackAlpha.800"
        borderRadius="10px"
        p="0px 20px"
        mr="3px"
        ml="10px"
        h="30px"
        position="relative"
        textAlign="center"
        name={name}
        value={option}
      >
        {option}
        <Text
          w="100%"
          borderRadius="10px"
          h="100%"
          backgroundColor="transparent"
          color="black"
          fontWeight="700"
          cursor="pointer"
          opacity="0"
          p="0px 20px"
          position="absolute"
          top="0px"
          left="0px"
          _hover={{
            backgroundColor: "red.400",
            opacity: 1,
            boxShadow: "0px 0px 1px 1px black",
            transition: "all 0.2s",
          }}
        >
          <FontAwesomeIcon size="lg" icon={faTrash} />
        </Text>
      </Badge>
    </>
  );
}

export default OptionBadge;
