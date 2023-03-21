import { HouseRegisterValues } from "../services/data";

export const getProcessedData = (data, images) => {
  let processedData = {};

  HouseRegisterValues.forEach((item, idx) => {
    if (data[item.eng] !== "") {
      if (idx > 5 && idx < 10) {
        if (data[item.eng] === undefined) {
          processedData[item.eng] = 0;
        } else {
          processedData[item.eng] = Number(data[item.eng]) * 10000;
        }
      } else if (idx > 9 && idx < 14) {
        processedData[item.eng] = Number(data[item.eng]);
      } else {
        processedData[item.eng] = data[item.eng];
      }
    }
    if (item.eng === "Image") {
      processedData["Image"] = images;
    }
  });
  return processedData;
};
