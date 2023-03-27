import { Grid, GridItem, VStack, Skeleton } from "@chakra-ui/react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { getWishLists } from "../../services/api";
import scrollbarStyle from "../../styles/scroll_bar";
import ListCard from "./../../components/Card/ListCard";
import useUser from "../../hooks/useUser";
import PaginationCont from "./../../components/Pagination/PaginationCont";

export default function WishList() {
  const { isLoading, data } = useQuery(["house"], getWishLists);
  const [page, setPage] = useState(1);
  const { user } = useUser();

  const pageChange = (page) => {
    setPage(page);
  };

  const startIdx = (page - 1) * 12;
  const endIdx = startIdx + 12;
  const currentPageData = data?.slice(startIdx, endIdx);

  return (
    <>
      {!isLoading ? (
        <>
          {" "}
          <VStack height="68vh" overflowY="scroll" sx={scrollbarStyle}>
            <Helmet>
              <title>{`위시리스트 ${user?.name} - BANGSAM`}</title>
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
                {currentPageData?.map((item, index) => {
                  return (
                    <GridItem key={index}>
                      {" "}
                      <ListCard {...item.house} />
                    </GridItem>
                  );
                })}
              </Grid>
            </VStack>
          </VStack>
          <PaginationCont
            activePage={page}
            itemsCountPerPage={9}
            totalItemsCount={data?.length ?? 0}
            pageRangeDisplayed={5}
            onChange={pageChange}
          />
        </>
      ) : (
        <Skeleton h={"74vh"} w="100%" />
      )}
    </>
  );
}
