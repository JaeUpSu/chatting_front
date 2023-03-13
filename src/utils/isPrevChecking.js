import { isVal } from "../services/local";

export const isPrevChecking = (list, name) => {
  const index = list.indexOf(name) - 1;

  const val = sessionStorage.getItem(list[index]);

  if (isVal(val) || index < 0) {
    return true;
  } else {
    return false;
  }
};
