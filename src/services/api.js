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
export const kakaoLogin = (code) => {
  console.log(code);
  return instance
    .post(
      "users/kakao",
      { code },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.status);
};

export const naverLogin = ({ code, state }) => {
  console.log("code,state", code, state);
  return instance
    .post(
      "users/naver",
      { code, state },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.status);
};

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

export const getUploadURL = () =>
  instance
    .post(`images/geturl`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const uploadImage = ({ file, uploadURL }) => {
  const form = new FormData();
  form.append("file", file[0]);
  console.log(form);
  return axios
    .post(uploadURL, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};
export const signUpUser = ({
  username,
  password,
  email,
  name,
  gender,
  is_host,
  is_realtor,
  avatar,
  phone_number,
}) =>
  instance
    .post(
      `users/signup/`,
      // { username, password, email, name, currency, gender, language },
      {
        username,
        password,
        email,
        name,
        gender,
        is_host,
        is_realtor,
        avatar,
        phone_number,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const validateCheck = (
  { username, password, email, name, gender, is_host, is_realtor, phone_number } // currency,
) => {
  // gender,
  // language,
  return instance
    .post(
      `users/check-validate/`,
      // { username, password, email, name, currency, gender, language },
      {
        username,
        password,
        email,
        name,
        gender,
        is_host,
        is_realtor,
        phone_number,
      },
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
