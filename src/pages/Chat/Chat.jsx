import { Box, Button, Grid, Input, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

function Chat() {
  const { chatRoomPk } = useParams();

  return (
    <Box>
      <VStack spacing={5}>
        <Box
          borderWidth="1px"
          borderColor="gray.200"
          borderRadius="md"
          p={4}
          h={"65vh"}
          w={"100%"}
          overflowY="scroll"
          // ref={chatBoxRef}
        ></Box>

        <Grid
          as={"div"}
          w={"100%"}
          templateColumns={"6fr 1fr"}
          gap="5"
          alignItems="center"
        >
          <Input />
          <Button type="submit">Send</Button>
        </Grid>
      </VStack>
    </Box>
  );
}

export default Chat;
