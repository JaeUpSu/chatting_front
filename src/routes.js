const routes = {
  home: "/",
  login: "login",
  signUp: "signup",
  profile: "profile/:userId",
  chatList: "chatList/:isOwner",
  chat: "chatList/:isOwner/chat/:chatId",
  houseList: "houseList/:address",
  house: "houseList/:address/house/:houseId",
};

export default routes;
