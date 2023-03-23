import { Card, CardBody, Image, Flex, Text, Box } from "@chakra-ui/react";
import { getWishLists } from "../../services/api";
import { useQuery } from "@tanstack/react-query";
import { SellKindsToFront, RoomKindsToFront } from "../../services/data";
import Pagination from "react-js-pagination";
import styled from "styled-components";
import { getSaleContents } from "../../utils/getSaleContents";
import { Link } from "react-router-dom";
import { useState } from "react";

const WishListWrap = styled.div`
  height: 60vh;
  overflow-y: scroll;
  max-width: 75vw;
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

export default function WishList() {
  const { error, data } = useQuery(["house"], getWishLists);
  const [page, setPage] = useState(1);
  const pageChange = (page) => {
    setPage(page);
  };

  const startIdx = (page - 1) * 12;
  const endIdx = startIdx + 12;
  const currentPageData = data?.slice(startIdx, endIdx);

  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }

  if (!data) {
    return <div>로딩 중입니다.</div>;
  }

  return (
    <WishListWrap>
      <Flex flexWrap={"wrap"}>
        {currentPageData?.map((item, index) => {
          return (
            <Card w="15vw" m="10px" key={index} overflow={"hidden"} ml="2rem">
              <Link to={`/houseList/house/${item.house.id}`}>
                <Image src={item.house.thumnail} w="20rem" h="12rem" />
              </Link>
              <CardBody>
                <Box fontWeight={600}>{item.house.title}</Box>
                <Flex fontSize={"sm"}>
                  <Text mr="0.5rem">
                    {RoomKindsToFront[item.house.room_kind]}
                  </Text>
                  <Text>{SellKindsToFront[item.house.sell_kind]}</Text>
                </Flex>

                <Flex fontSize={"sm"} color={"#ff404c"}>
                  <Text>
                    {`${getSaleContents(
                      item.house.sell_kind,
                      item.house.deposit,
                      item.house.monthly_rent,
                      item.house.sale
                    )}`}
                  </Text>
                </Flex>
              </CardBody>
            </Card>
          );
        })}
      </Flex>
      <PagenationBox>
        <Pagination
          activePage={page}
          itemsCountPerPage={12}
          totalItemsCount={data?.length ?? 0}
          pageRangeDisplayed={5}
          prevPageText="<"
          nextPageText=">"
          onChange={pageChange}
        ></Pagination>
      </PagenationBox>
    </WishListWrap>
  );
}
