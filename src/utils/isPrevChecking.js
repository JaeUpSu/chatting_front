import { isLocal } from "../services/local";

export const isPrevChecking = (list, name) => {
  const index = list.indexOf(name) - 1;

  const val = localStorage.getItem(list[index]);

  if (isLocal(val) || index < 0) {
    return true;
  } else {
    return false;
  }
};
