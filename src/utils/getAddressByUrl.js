import { Address } from "../services/data";

export const getAddressByUrl = (url) => {
  let newAddress = "";
  const addressArr = url.split("&");
  addressArr.forEach((item, idx) => {
    const place = item.split("=");
    if (place[1] != "" && place[1] > -1) {
      newAddress += Address[place[0]][place[1]];
      if (idx < 2) {
        newAddress += " ";
      }
    }
  });
  return newAddress;
};
