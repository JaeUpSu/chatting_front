import { Badge } from "@chakra-ui/react";
function PassiveBadge() {
  return (
    <Badge
      position="absolute"
      fontSize="8px"
      colorScheme="gray"
      top="-25%"
      right="-20%"
    >
      Off
    </Badge>
  );
}

export default PassiveBadge;
