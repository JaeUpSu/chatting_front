import axios from "axios";
import Cookie from "js-cookie";

// https://izuna.pythonanywhere.com/redoc

// 객체 만들기
export const instance = axios.create({
  baseURL: "https://izuna.pythonanywhere.com/api/v1/",
  withCredentials: true, // 서로 다른 도메인 요청일 때도 credential 데이터를 담아보내겠다 + 쿠키 데이터 담아서 보내겠다.
});

// myinfo 에서 data 가져오기
export const getUserInfo = () =>
  instance.get("users/myinfo").then((response) => response.data);

// 로그인
export const login = ({ username, password }) => {
  return instance
    .post(
      "users/login",
      { username, password },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((res) => res.data);
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
