import React, { useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import RecentList from "../Home/RecentList";

function Profile() {
  return (
    <Tabs isFitted variant="enclosed" mt="45px">
      <TabList>
        <Tab _selected={{ color: "white", bg: "#ff535e" }}>회원정보</Tab>
        <Tab _selected={{ color: "white", bg: "#ff535e" }}>WishList</Tab>
        <Tab _selected={{ color: "white", bg: "#ff535e" }}>최근 본 방</Tab>
        <Tab _selected={{ color: "white", bg: "#ff535e" }}>판매내역</Tab>
      </TabList>
      <TabPanels>
        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default Profile;
