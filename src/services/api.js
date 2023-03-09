import axios from "axios";
import Cookie from "js-cookie";
import Login from "../pages/Login/Login";

// https://izuna.pythonanywhere.com/redoc

// 객체 만들기
const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  withCredentials: true,
});

export const comment = ({ caption, _user, _feed }) => {
  const user = _user;
  const feed = _feed;

  console.log({ feed, caption, user });
  console.log(Cookie.get("csrftoken"));
  instance
    .post(
      "reviews/",
      { feed, caption, user },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const getCommentsByFeedId = ({ queryKey }) => {
  const feed_id = queryKey[1];
  return instance.get(`reviews/feedid/${feed_id}`).then((response) => {
    console.log(response.data);
    return response.data;
  });
};

// myinfo 에서 data 가져오기
export const getUserInfo = () =>
  instance.get("users/myinfo").then((response) => response.data);

// 로그인
export const logIn = ({ username, password }) => {
  console.log(username, password);
  return instance
    .post(
      `users/login`,
      { username, password },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
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

// // 가입
// export const signup = ({ username, password, email }) => {
//   instance
//     .post(
//       "users/signup",
//       { username, password, email },
//       {
//         headers: {
//           "X-CSRFToken": Cookie.get("csrftoken") || "",
//         },
//       }
//     )
//     .then((response) => response.data);
// };

// // 전체 피드
export const getAllFeeds = () =>
  instance.get(`feeds/`).then((response) => response.data);

// 유저
export const getUserFeeds = ({ queryKey }) => {
  const username = queryKey[1];
  return instance.get(`feeds/${username}`).then((response) => {
    return response.data;
  });
};
// // 유저
export const getUser = (username) =>
  instance.get(`users/${username}`).then((response) => response.data);
