import {
  Center,
  Grid,
  GridItem,
  VStack,
  Box,
  Skeleton,
} from "@chakra-ui/react";
import { getSellLists } from "../../services/api";
import { useQuery } from "@tanstack/react-query";
import Pagination from "react-js-pagination";
import styled from "styled-components";
import { useState, useEffect } from "react";
import MyHouseCard from "../../components/Card/MyHouseCard";

const PagenationBox = styled.div`
  .pagination {
    margin-top: 1vh;
    display: flex;
    justify-content: center;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }
  ul.pagination li a {
    text-decoration: none;
    color: #337ab7;
    font-size: 1rem;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: #337ab7;
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: blue;
  }
`;

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
          <VStack w="100%" h="68vh" overflowY={"scroll"}>
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
                >
                  {data?.results?.map((item, idx) => {
                    return (
                      <GridItem key={idx}>
                        <MyHouseCard key={idx} {...item} />
                      </GridItem>
                    );
                  })}
                </Grid>
              </>
            )}
          </VStack>
          <PagenationBox>
            <Pagination
              activePage={page}
              itemsCountPerPage={24}
              totalItemsCount={total ?? 0}
              pageRangeDisplayed={5}
              prevPageText="<"
              nextPageText=">"
              onChange={pageChange}
            />
          </PagenationBox>
        </>
      ) : (
        <Skeleton h={"74vh"} w="100%" />
      )}
    </VStack>
  );
}
