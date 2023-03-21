import axios from "axios";
import Cookie from "js-cookie";

// 객체 만들기
const instance = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
});

// myinfo 에서 data 가져오기
export const getUserInfo = () =>
  instance.get("users/me/").then((response) => response.data);

// 로그인.
export const kakaoLogin = (code) =>
  instance
    .post(
      "users/kakao/",
      { code },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => {
      // const sessionid = response.config.headers.get("sessionid");
      // console.log(Cookie.get("csrftoken"));
      // Cookie.set("csrftoken", csftToken);
      // console.log(Cookie.get("csrftoken"));

      // Cookie.set("sessionid", sessionid);
      return response.status;
    });
export const naverLogin = ({ code, state }) =>
  instance
    .post(
      "users/naver/",
      { code, state },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.status);
export const login = ({ username, password }) => {
  return instance.post(
    "users/login/",
    { username, password },
    {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    }
  );
};

// 로그아웃
export const logout = () =>
  instance
    .post(
      "users/logout/",
      {},
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
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
export const getChatList = ({ queryKey }) => {
  const [_, roomPk] = queryKey;
  return instance
    .get(`chatlist/${roomPk}/chatlist`)
    .then((response) => response.data);
};
export const makeChatRoom = (id) =>
  instance
    .post(
      `chatlist/${id}/`,
      {},
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
export const deleteChatRoom = (id) => {
  return instance
    .delete(`chatlist/${id}`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};
// 채팅리스트 가져오기
export const getChat = ({ id }) =>
  instance.get(`chat/${id}/chatlist`).then((response) => response.data);

// 모든 집 가져오기
export const getAllHouses = () => {
  return instance.get(`/houses`).then((response) => response.data);
};

// 모든 집 가져오기
export const getOptionHouses = (params) => {
  return instance
    .get("/houses", {
      params,
    })
    .then((response) => {
      const { count, results, current_page, num_pages } = response.data;
      return {
        contents: results,
        pageNumber: current_page,
        pageSize: params.size,
        num_pages,
        totalCounts: count,
        isLastPage: current_page === num_pages,
        isFirstPage: current_page === 1,
      };
    });
};

// 해당 집 가져오기
export const getHouse = ({ queryKey }) => {
  const [_, id] = queryKey;
  return instance.get(`houses/${id}`).then((response) => response.data);
};

// 해당 집 등록하기
export const postHouse = (house) =>
  instance
    .post(`houses/`, house, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
// 해당 집 수정하기
export const putHouse = (house) => {
  return instance
    .put(`houses/${house.id}`, house.updatedHouse, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => console.log("data", response.data));
};

// 모든 구 가져오기
export const getGuList = () =>
  instance.get(`houses/gulist`).then((response) => response.data);

// 모든 동 가져오기
export const getDongList = async ({ queryKey }) => {
  const [_, id] = queryKey;
  return await instance
    .get(`houses/${id}/donglist`)
    .then((response) => response.data);
};

export const getWishLists = () =>
  instance.get(`wishlists/`).then((response) => response.data);

export const setWishLists = (id) => {
  if (id !== undefined) {
    instance
      .post(
        `wishlists/`,
        { house: id },
        {
          headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
          },
        }
      )
      .then((response) => response.data);
  }
};

export const getChatRoomList = () =>
  instance.get("chatlist/").then((res) => res.data);

export const editUser = (value) =>
  instance
    .put("users/me/", value, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
