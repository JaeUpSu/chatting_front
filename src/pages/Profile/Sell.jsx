import { Center, Grid, GridItem, VStack, Skeleton } from "@chakra-ui/react";
import { getSellLists } from "../../services/api";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import MyHouseCard from "../../components/Card/MyHouseCard";
import scrollbarStyle from "../../styles/scroll_bar";
import PaginationCont from "../../components/Pagination/PaginationCont";

export default function SellAll() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery(["sellHouse", page ?? 0], getSellLists);
  const pageChange = (page) => {
    setPage(page);
  };

  const total = data?.count;

  return (
    <VStack>
      {!isLoading ? (
        <>
          <VStack w="100%" h="68vh" overflowY={"scroll"} sx={scrollbarStyle}>
            {data?.results?.length < 1 ? (
              <Center h="100%" w="100%" alignItems="center" fontWeight="600">
                비어있습니다.
              </Center>
            ) : (
              <>
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
                  px="3"
                  w="100%"
                >
                  {data?.results?.map((item, idx) => {
                    return (
                      <GridItem key={idx}>
                        <MyHouseCard {...item} />
                      </GridItem>
                    );
                  })}
                </Grid>
              </>
            )}
          </VStack>
          <PaginationCont
            activePage={page}
            itemsCountPerPage={24}
            totalItemsCount={total ?? 0}
            pageRangeDisplayed={5}
            onChange={pageChange}
          />
        </>
      ) : (
        <Skeleton h={"74vh"} w="100%" />
      )}
    </VStack>
  );
}
