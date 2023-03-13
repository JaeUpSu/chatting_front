import { filterMenu } from "../services/data";

// room_counts: "",
// toilet_counts: "",
// isStationArea: "",
export const getOptionsUrl = (options) => {
  let optionsUrl = "";
  const currentOpts = options;

  filterMenu.forEach((op) => {
    if (
      typeof currentOpts[op.eng] == "object" &&
      currentOpts[op.eng].length < 1
    ) {
      optionsUrl += op.eng + "=" + "[]" + "&";
    } else {
      optionsUrl += op.eng + "=" + currentOpts[op.eng] + "&";
    }
    localStorage.removeItem(op.eng);
  });

  return optionsUrl;
};
