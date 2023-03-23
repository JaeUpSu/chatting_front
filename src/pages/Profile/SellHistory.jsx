import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function SellHistory() {
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
      w="79vw"
      p="2"
      variant="unstyled"
      defaultIndex={selectedTabIndex}
      onChange={changeTab}
    >
      <TabList borderTopRadius={"3xl"} w="100%">
        <Tab
          borderWidth="3px"
          borderColor="white"
          bg={"gray.200"}
          _selected={{ color: "white", bg: "#ff535e" }}
        >
          모두보기
        </Tab>
        <Tab
          borderWidth="3px"
          borderColor="white"
          bg={"gray.200"}
          _selected={{ color: "white", bg: "#ff535e" }}
        >
          판매중
        </Tab>
        <Tab
          borderWidth="3px"
          borderColor="white"
          bg={"gray.200"}
          _selected={{ color: "white", bg: "#ff535e" }}
        >
          판매완료
        </Tab>
      </TabList>
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
    </Tabs>
  );
}
