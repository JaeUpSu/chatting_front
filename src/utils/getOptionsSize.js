import { optionsMenu } from "../services/data";

export const getOptionsSize = (options) => {
  let size = 0;
  optionsMenu.map((op) => {
    if (options[op.eng] != "" && options[op.eng] != "[]") {
      size++;
    }
  });
  return size;
};
