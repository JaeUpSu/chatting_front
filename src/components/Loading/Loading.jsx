import { Spinner, Flex } from "@chakra-ui/react";
import React from "react";

const Loading = () => {
  return (
    <Flex justify="center" align="center" mt="16rem">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color={"red.200"}
        size="xl"
      />
    </Flex>
  );
};

export default Loading;
