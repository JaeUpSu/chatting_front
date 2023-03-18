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
  console.log(1);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const tabMap = {
    "": 0,
    wishlist: 1,
    recentView: 2,
    sellHistory: 3,
  };
  const selectedTabIndex = tabMap[pathname.split("/").slice(-1)[0]];
  const params = useParams();
  const changeTab = (index) => {
    navigate(`./${Object.keys(tabMap)[index]}`);
  };

  return (
    <OnlyMePage>
      <Tabs
        isLazy
        isFitted
        variant="enclosed"
        mt="45px"
        defaultIndex={selectedTabIndex}
        onChange={changeTab}
      >
        <TabList>
          <Tab _selected={{ color: "white", bg: "#ff535e" }}>회원정보</Tab>
          <Tab _selected={{ color: "white", bg: "#ff535e" }}>WishList</Tab>
          <Tab _selected={{ color: "white", bg: "#ff535e" }}>최근 본 방</Tab>
          <Tab _selected={{ color: "white", bg: "#ff535e" }}>판매내역</Tab>
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
