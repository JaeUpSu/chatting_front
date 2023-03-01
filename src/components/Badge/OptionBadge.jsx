import { Badge, Text } from "@chakra-ui/react";
function OptionBadge({ option }) {
  return (
    <>
      <Badge
        fontSize="18px"
        colorScheme="red.300"
        backgroundColor="rgb(255, 247, 240)"
        color="blackAlpha.800"
        borderRadius="10px"
        p="0px 20px"
        mr="7px"
        ml="20px"
        h="30px"
        textAlign="center"
      >
        {option}
      </Badge>
      <Text color="gray" fontWeight="700" cursor="pointer">
        X
      </Text>
    </>
  );
}

export default OptionBadge;
