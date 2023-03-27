import { useQuery } from "@tanstack/react-query";
import { getHouseLists } from "../../services/api";
import { Grid, GridItem, VStack, Skeleton } from "@chakra-ui/react";

import Helmet from "react-helmet";
import scrollbarStyle from "../../styles/scroll_bar";
import ListCard from "../../components/Card/ListCard";
import useUser from "../../hooks/useUser";

export default function RecentView() {
  const { user } = useUser();
  const { isLoading, data } = useQuery(["recently_views"], getHouseLists);

  return (
    <>
      {!isLoading ? (
        <VStack height="68vh" overflowY="scroll" sx={scrollbarStyle}>
          <Helmet>
            <title>{`최근 본 방 ${user?.name} - BANGSAM`}</title>
          </Helmet>
          <VStack>
            <Grid
              gridTemplateColumns={{
                sm: "1fr",
                md: "1fr 1fr",
                lg: "repeat(3, 1fr)",
                xl: "repeat(4, 1fr)",
              }}
              gap="2"
              columnGap="8"
              py="7"
              w="60vw"
            >
              {data?.map((item, index) => {
                return (
                  <GridItem key={index}>
                    <ListCard {...item.recently_views} />
                  </GridItem>
                );
              })}
            </Grid>
          </VStack>
        </VStack>
      ) : (
        <Skeleton h={"74vh"} w="100%" />
      )}
    </>
  );
}
