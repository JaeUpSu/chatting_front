import { Badge } from "@chakra-ui/react";
function ActiveBadge() {
  return (
    <Badge
      position="absolute"
      fontSize="8px"
      colorScheme="green"
      top="-25%"
      right="-20%"
    >
      On
    </Badge>
  );
}

export default ActiveBadge;
