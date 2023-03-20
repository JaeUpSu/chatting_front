import React, { useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import RecentList from "../Home/RecentList";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import ProtectedPage from "../../components/auth/ProtectedPage";
import OnlyMePage from "../../components/auth/OnlyMePage";

function Profile() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const tabMap = {
    "": 0,
    wishlist: 1,
    recentView: 2,
    sellHistory: 3,
  };
  const selectedTabIndex = tabMap[pathname.split("/").slice(-1)[0]];
  const changeTab = (index) => {
    navigate(`./${Object.keys(tabMap)[index]}`);
  };

  return (
    <OnlyMePage>
      <Tabs
        m={"10%"}
        isLazy
        isFitted
        variant="unstyled"
        mt="45px"
        defaultIndex={selectedTabIndex}
        onChange={changeTab}
      >
        <TabList borderTopRadius={"3xl"}>
          <Tab
            m={"1px"}
            borderTopRadius={"xl"}
            bg={"gray.200"}
            _selected={{ color: "white", bg: "#ff535e" }}
          >
            내 정보
          </Tab>
          <Tab
            m={"1px"}
            borderTopRadius={"xl"}
            bg={"gray.200"}
            _selected={{ color: "white", bg: "#ff535e" }}
          >
            찜한 방
          </Tab>
          <Tab
            m={"1px"}
            borderTopRadius={"xl"}
            bg={"gray.200"}
            _selected={{ color: "white", bg: "#ff535e" }}
          >
            최근 본 방
          </Tab>
          <Tab
            m={"1px"}
            borderTopRadius={"xl"}
            bg={"gray.200"}
            _selected={{ color: "white", bg: "#ff535e" }}
          >
            판매내역
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Outlet />
          </TabPanel>
          <TabPanel>
            <Outlet />
          </TabPanel>
          <TabPanel>
            <Outlet />
          </TabPanel>
          <TabPanel>
            <Outlet />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </OnlyMePage>
  );
}

export default Profile;
