import axios from "axios";
import Cookie from "js-cookie";

// 객체 만들기
const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:8000/api/v1"
      : "https://backend.bangsam.site/api/v1",
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
export const findId = (data) =>
  instance
    .post("users/find/id", data, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
export const findPassword = (data) =>
  instance
    .post("users/find/password", data, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
export const newPassword = (data) =>
  instance
    .put("users/new-password", data, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
export const changePassword = (data) =>
  instance
    .put("users/changepassword/", data, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((res) => res.status);

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

// 해당 집 제거하기
export const delHouse = (id) => {
  return instance
    .delete(`houses/${id}`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

// 해당 집 가져오기
export const getHouse = ({ queryKey }) => {
  const [_, id] = queryKey;
  return instance.get(`houses/${id}`).then((response) => response.data);
};

// 해당 집 등록하기
export const postHouse = (house) => {
  return instance
    .post(`houses/`, house, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};
// 해당 집 수정하기
export const putHouse = (house) => {
  console.log(house);
  return instance
    .put(`houses/${house.id}`, house.processData, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((res) => res.data);
};
// 해당 집 판매완료
export const soldOutHouse = (house) => {
  return instance
    .put(
      `houses/${house.id}`,
      { is_sale: house.is_sale },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((res) => res.data);
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
  return instance
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
};

export const getAllSellLists = ({ queryKey }) => {
  const [_, page] = queryKey;
  return instance
    .get(`users/selllist/all?page=${page}`)
    .then((res) => res.data);
};
export const getNotSellLists = ({ queryKey }) => {
  const [_, page] = queryKey;
  return instance
    .get(`users/selllist/notsell?page=${page}`)
    .then((response) => response.data);
};
export const getSellLists = ({ queryKey }) => {
  const [_, page] = queryKey;
  return instance
    .get(`users/selllist/sell?page=${page}`)
    .then((response) => response.data);
};
export const getHouseLists = () =>
  instance.get(`houselists/`).then((response) => response.data);

export const getChatRoomList = () =>
  instance.get("chatlist/").then((res) => res.data);

export const getAdditionalOptions = () =>
  instance.get(`houses/options`).then((response) => response.data);

export const getSafetyOptions = () =>
  instance.get("houses/safety-options").then((res) => res.data);

export const editUser = (value) =>
  instance
    .put("users/me/", value, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const checkLiked = ({ queryKey }) => {
  const [_, pk] = queryKey;
  return instance.get(`wishlists/islike/${pk}`).then((res) => res.data);
};

export const getTopViewHouse = () =>
  instance.get("houses/topview").then((res) => res.data);
