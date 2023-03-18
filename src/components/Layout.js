import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header/Header";

const Content = styled.div`
  margin: 0 auto;
  width: 100%;
`;
function Layout() {
  // children 에 Home 들어와있음
  return (
    <>
      <Header />
      <Outlet />
      {/* <Content>{children}</Content> */}
    </>
  );
}

export default Layout;
