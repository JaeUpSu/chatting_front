import { Card, CardBody, VStack, HStack, Skeleton } from "@chakra-ui/react";

function LoadingHouseCard() {
  return (
    <Card
      w="100%"
      boxShadow="0px"
      _hover={{ backgroundColor: "rgb(140,140,140,0.1)" }}
      display={"flex"}
      alignItems="center"
      justifyContent={"center"}
    >
      <CardBody
        display={"flex"}
        alignItems="center"
        justifyContent={"center"}
        w={"100%"}
        cursor="pointer"
      >
        <VStack w={"100%"} alignItems="flex-start" spacing={"5"}>
          <Skeleton
            width="100%"
            alt="house"
            borderRadius="lg"
            css={{
              aspectRatio: "1 / 1",
            }}
          />
          <VStack alignItems={"flex-start"} pl="3">
            <Skeleton
              size="sm"
              fontSize="1.4em"
              color="transparent"
              noOfLines={1}
            >
              Loadng.... Loadng....
            </Skeleton>
            <Skeleton
              h="auto"
              color="transparent"
              fontSize="0.5em"
              noOfLines={1}
            >
              Loadng....
            </Skeleton>
            <VStack spacing={"3"} alignItems={"flex-start"}>
              <HStack alignItems="center">
                <Skeleton color="transparent" fontSize="0.9em">
                  Loading....
                </Skeleton>
              </HStack>
              <Skeleton fontSize="0.9em" color={"transparent"}>
                Loading....Loading....Loading....
              </Skeleton>
            </VStack>
          </VStack>
        </VStack>
      </CardBody>
    </Card>
  );
}
export default LoadingHouseCard;
