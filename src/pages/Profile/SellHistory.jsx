import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import Helmet from "react-helmet";

export default function SellHistory() {
  const { user } = useUser();

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const tabMap = {
    "": 0,
    sell: 1,
    notsell: 2,
  };
  const selectedTabIndex = tabMap[pathname.split("/").slice(-1)[0]];
  const changeTab = (index) => {
    navigate(`./${Object.keys(tabMap)[index]}`);
  };

  return (
    <Tabs
      isLazy
      isFitted
      variant="unstyled"
      onChange={changeTab}
      defaultIndex={selectedTabIndex}
    >
      <Helmet>
        <title>{`판매내역 ${user?.name} - BANGSAM`}</title>
      </Helmet>
      <HStack alignItems="flex-start">
        <Flex
          h="74vh"
          w="15vw"
          backgroundColor="rgb(233,239,244,0.5)"
          borderRadius="md"
          alignItems="flex-start"
          justifyContent="center"
          p="1"
        >
          <TabList
            mt="3vh"
            w="9vw"
            h="20vh"
            minW="55px"
            flexDirection="column"
            borderTopRadius={"3xl"}
            justifyContent="space-between"
          >
            <Tab
              borderColor="white"
              borderRadius="7px"
              fontSize={{
                sm: "xs",
                md: "sm",
                lg: "md",
              }}
              bg={"gray.200"}
              _selected={{ color: "white", bg: "#ff535e" }}
            >
              전체
            </Tab>
            <Tab
              borderColor="white"
              borderRadius="7px"
              fontSize={{
                sm: "xs",
                md: "sm",
                lg: "md",
              }}
              mt="2vh"
              bg={"gray.200"}
              _selected={{ color: "white", bg: "#ff535e" }}
            >
              판매중
            </Tab>
            <Tab
              borderColor="white"
              borderRadius="7px"
              fontSize={{
                sm: "xs",
                md: "sm",
                lg: "md",
              }}
              mt="2vh"
              bg={"gray.200"}
              _selected={{ color: "white", bg: "#ff535e" }}
            >
              판매완료
            </Tab>
          </TabList>
        </Flex>
        <TabPanels>
          <TabPanel p="2px">
            <Outlet />
          </TabPanel>
          <TabPanel p="2px">
            <Outlet />
          </TabPanel>
          <TabPanel p="2px">
            <Outlet />
          </TabPanel>
        </TabPanels>
      </HStack>
    </Tabs>
  );
}
