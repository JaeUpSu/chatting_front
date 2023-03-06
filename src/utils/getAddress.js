import { addressKinds } from "../services/data";
import { isLocal } from "../services/local";
import { Address } from "../services/data";

export const getAddress = () => {
  let address = "";

  addressKinds.forEach((item, idx) => {
    const placeNum = localStorage.getItem(item);
    if (isLocal(placeNum)) {
      address += address[item][placeNum];
    }

    if (idx < 2) {
      address += " ";
    }
  });
  return address;
};
