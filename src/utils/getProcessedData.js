import { HouseRegisterValues } from "../services/data";
import { getOptionFormat } from "./getOptionFormat";

export const getProcessedData = (data, images, addition, safety) => {
  let processedData = {};

  HouseRegisterValues.forEach((item, idx) => {
    if (data[item.eng] !== "") {
      if (idx > 5 && idx < 10) {
        if (data[item.eng] === undefined) {
          processedData[item.eng] = 0;
        } else {
          processedData[item.eng] = Number(data[item.eng]) * 10000;
        }
      } else if (idx > 9 && idx < 13) {
        processedData[item.eng] = Number(data[item.eng]);
      } else {
        processedData[item.eng] = data[item.eng];
      }
    }
    if (item.eng === "Image") {
      processedData["Image"] = images;
    }
    if (addition.length > 0) {
      processedData["option"] = getOptionFormat(addition);
    }
    if (safety.length > 0) {
      processedData["Safetyoption"] = getOptionFormat(safety);
    }
  });
  return processedData;
};
