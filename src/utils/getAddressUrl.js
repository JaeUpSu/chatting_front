import { addressKinds } from "../services/data";
import { isLocal } from "../services/local";
import { Address } from "../services/data";

export const getAddressUrl = (_address) => {
  let url = "";

  const addressArr = _address.split(" ");
  addressKinds.forEach((item, idx) => {
    url += item + "=";
    if (isLocal(addressArr[idx])) {
      url += Address[item].findIndex((val) => val === addressArr[idx]);
    }
    if (idx < 2) {
      url += "&";
    }
  });

  return url;
};
