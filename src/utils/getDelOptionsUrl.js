import { getInitOptionByName } from "./getInitOptionByName";
import { getOptionsUrl } from "./getOptionsUrl";

export const getDelOptionsUrl = (options, name) => {
  let newOption = {
    ...options,
  };
  newOption[name] = getInitOptionByName(options[name]);
  return getOptionsUrl(newOption);
};
