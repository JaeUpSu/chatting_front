import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function SellHistory() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const tabMap = {
    "": 0,
    notsell: 1,
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
      defaultIndex={selectedTabIndex}
      onChange={changeTab}
    >
      <TabList borderTopRadius={"3xl"}>
        <Tab
          borderTopRadius={"sm"}
          bg={"gray.200"}
          _selected={{ color: "white", bg: "#ff535e" }}
        >
          판매중
        </Tab>
        <Tab
          borderTopRadius={"sm"}
          bg={"gray.200"}
          _selected={{ color: "white", bg: "#ff535e" }}
        >
          판매완료
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Outlet />
        </TabPanel>
        <TabPanel>
          <Outlet />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
