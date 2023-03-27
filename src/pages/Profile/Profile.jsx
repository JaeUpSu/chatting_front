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
import useUser from "../../hooks/useUser";
import { Helmet } from "react-helmet";

function Profile() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, userLoading, isLoggedIn } = useUser();
  const tabMap = {
    "": 0,
    recentView: 1,
    wishlist: 2,
    sellHistory: 3,
  };
  const selectedTabIndex = tabMap[pathname.split("/").slice(-1)[0]];
  const changeTab = (index) => {
    navigate(`./${Object.keys(tabMap)[index]}`);
  };

  return (
    <OnlyMePage>
      <Helmet>
        <title>마이페이지</title>
      </Helmet>
      <Tabs
        m={"10%"}
        isLazy
        isFitted
        variant="unstyled"
        mt="4vh"
        justifyContent="center"
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
            최근 본 방
          </Tab>
          <Tab
            m={"1px"}
            borderTopRadius={"xl"}
            bg={"gray.200"}
            _selected={{ color: "white", bg: "#ff535e" }}
          >
            찜한 방
          </Tab>
          {user?.is_host ? (
            <Tab
              m={"1px"}
              borderTopRadius={"xl"}
              bg={"gray.200"}
              _selected={{ color: "white", bg: "#ff535e" }}
            >
              판매내역
            </Tab>
          ) : null}
        </TabList>
        <TabPanels>
          <TabPanel p="0px">
            <Outlet />
          </TabPanel>
          <TabPanel p="0px">
            <Outlet />
          </TabPanel>
          <TabPanel p="0px">
            <Outlet />
          </TabPanel>
          <TabPanel p="0px">
            <Outlet />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </OnlyMePage>
  );
}

export default Profile;
