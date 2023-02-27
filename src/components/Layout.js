import styled from "styled-components";
import Header from "./Header/Header";

const Content = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 1000px;
`;
function Layout({ children }) {
  // children 에 Home 들어와있음
  return (
    <>
      <Header />
      <Content>{children}</Content>
    </>
  );
}

export default Layout;
