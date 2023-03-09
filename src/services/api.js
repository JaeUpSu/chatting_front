import axios from "axios";
import Cookie from "js-cookie";
import Login from "../pages/Login/Login";

// https://izuna.pythonanywhere.com/redoc

// 객체 만들기
const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  withCredentials: true,
});

// myinfo 에서 data 가져오기
export const getUserInfo = () =>
  instance.get("users/myinfo").then((response) => response.data);

// 로그인.
export const login = ({ username, password }) => {
  return instance.post(
    "users/login",
    { username, password },
    {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    }
  );
};

// 로그아웃
export const logout = () => {
  instance
    .post("users/logout", "", {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

// 가입
export const signup = ({ username, password, email }) => {
  instance
    .post(
      "users/signup",
      { username, password, email },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
};

// 채팅리스트 가져오기
export const getChatList = () =>
  instance.get("/chat/list").then((response) => response.data);

// 채팅리스트 가져오기
export const getChat = ({ id }) =>
  instance.get(`/chat/${id}/chatlist`).then((response) => response.data);

// 모든 집 가져오기
export const getAllHouses = () =>
  instance.get(`/houses/`).then((response) => response.data);

// 해당 집 가져오기
export const getHouse = ({ id }) =>
  instance.get(`/houses/${id}`).then((response) => response.data);

// 모든 구 가져오기
export const getGuList = () =>
  instance.get(`/houses/gulist`).then((response) => response.data);

// 해당 구 가져오기
export const getGu = ({ id }) =>
  instance.get(`/houses/gulist/${id}`).then((response) => response.data);

// 해당 구 가져오기
export const getWishLists = () =>
  instance.get(`/wishlists/`).then((response) => response.data);
