const routes = {
  home: "/",
  login: "login",
  signUp: "signup",
  profile: "profile/:userId",
  chatList: "chatList/:isOwner",
  chat: "chatList/:isOwner/chat/:chatId",
  houseList: "houseList/:options",
  house: "houseList/:options/house/:houseId",
};

export default routes;
