import axios from "axios";
import Cookie from "js-cookie";

// https://izuna.pythonanywhere.com/redoc

// 객체 만들기
export const instance = axios.create({
  baseURL: "https://izuna.pythonanywhere.com/api/v1/",
  withCredentials: true, // 서로 다른 도메인 요청일 때도 credential 데이터를 담아보내겠다 + 쿠키 데이터 담아서 보내겠다.
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
