import {
  Card,
  CardBody,
  Image,
  Flex,
  Text,
  Box,
  Center,
} from "@chakra-ui/react";
import { getSellLists } from "../../services/api";
import { useQuery } from "@tanstack/react-query";
import { SellKindsToFront, RoomKindsToFront } from "../../services/data";
import Pagination from "react-js-pagination";
import styled from "styled-components";
import { getSaleContents } from "../../utils/getSaleContents";
import { Link } from "react-router-dom";
import { useState } from "react";

const SellListWrap = styled.div`
  height: 60vh;
  overflow-y: scroll;
  margin-left: 3rem;
`;

const PagenationBox = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
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

export default function SellHistory() {
  const { error, data, isLoading } = useQuery(["house"], getSellLists);
  const [page, setPage] = useState(1);
  const pageChange = (page) => {
    setPage(page);
  };

  const startIdx = (page - 1) * 9;
  const endIdx = startIdx + 9;
  const currentPageData = data?.results?.slice(startIdx, endIdx);

  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }

  if (!data) {
    return <div>로딩 중입니다.</div>;
  }

  return (
    <SellListWrap>
      {!isLoading && currentPageData?.length < 1 ? (
        <Center h="100%" alignItems="center" fontWeight="600">
          비어있습니다.
        </Center>
      ) : (
        <>
          <Flex flexWrap={"wrap"}>
            {currentPageData?.map((item, index) => {
              return (
                <Card w="20vw" m="20px" key={index}>
                  <Link to={`/houseList/house/${item?.id}`}>
                    <Image src={item?.thumnail} w="20rem" h="13rem" />
                  </Link>
                  <CardBody>
                    <Box fontWeight={600}>{item?.title}</Box>
                    <Flex>
                      <Text mr="0.5rem">
                        {RoomKindsToFront[item?.room_kind]}
                      </Text>
                      <Text>{SellKindsToFront[item?.sell_kind]}</Text>
                    </Flex>

                    <Flex>
                      <Text>
                        {`${getSaleContents(
                          item?.sell_kind,
                          item?.deposit,
                          item?.monthly_rent,
                          item?.sale
                        )}`}
                      </Text>
                    </Flex>
                  </CardBody>
                </Card>
              );
            })}
          </Flex>
          <PagenationBox>
            {/* 데이터 배열의 길이를 totalItemsCount로 설정 */}
            <Pagination
              activePage={page}
              itemsCountPerPage={9}
              totalItemsCount={data?.length ?? 0}
              pageRangeDisplayed={5}
              prevPageText="<"
              nextPageText=">"
              onChange={pageChange}
            ></Pagination>
          </PagenationBox>
        </>
      )}
    </SellListWrap>
  );
}
