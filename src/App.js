import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "./apollo";
import routes from "./routes";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Profile from "./pages/Profile/Profile";
import Chat from "./pages/Chat/Chat";
import ChatList from "./pages/Chat/ChatList";
import House from "./pages/House/HouseDetail";
import HouseList from "./pages/House/HouseList";
import Layout from "./components/Layout";

function App() {
  // 전역
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <Router>
      <Routes>
        <Route
          path={routes.home}
          element={
            isLoggedIn ? (
              <Layout>
                <Home />
              </Layout>
            ) : (
              <Login />
            )
          }
        />
        <Route
          path={routes.profile}
          element={
            isLoggedIn ? (
              <Layout>
                <Profile />
              </Layout>
            ) : null
          }
        />
        <Route
          path={routes.chat}
          element={
            isLoggedIn ? (
              <Layout>
                <Chat />
              </Layout>
            ) : null
          }
        />
        <Route
          path={routes.chatList}
          element={
            isLoggedIn ? (
              <Layout>
                <ChatList />
              </Layout>
            ) : null
          }
        />
        <Route
          path={routes.house}
          element={
            isLoggedIn ? (
              <Layout>
                <House />
              </Layout>
            ) : null
          }
        />
        <Route
          path={routes.houseList}
          element={
            isLoggedIn ? (
              <Layout>
                <HouseList />
              </Layout>
            ) : null
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/signup"
          element={
            <Layout>
              <SignUp />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
