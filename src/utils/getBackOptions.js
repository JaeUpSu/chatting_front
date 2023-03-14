import { filterMenu, optionsMenu } from "../services/data";

const getBackPrices = (prices) => {
  let backPrices = [];
  //   backPrices[0] = Number(
  //     String(prices[0]).replace("만", "0000").replace("억", "100000000")
  //   );
  //   backPrices[1] = Number(
  //     prices[1]
  //       .replace("만", "0000")
  //       .replace("억", "100000000")
  //       .replace("무제한", "")
  //   );

  if (backPrices[1] == "") {
    backPrices.pop();
  }
  return backPrices;
};

const getBackFilter = (filterVal) => {
  return filterVal.replace("화장실", "").replace("방", "").replace("개", "");
};

export const getBackOptions = (_options) => {
  let backOptions = {};
  //   { eng: "toilet_counts", kor: "화장실" },
  //   { eng: "room_counts", kor: "방" },
  //   { eng: "isStationArea", kor: "역세권" },
  optionsMenu.forEach((op, idx) => {
    if (idx < 2 || idx == 3) {
      backOptions[op.eng] = _options[op.eng];
    } else if (_options[op.eng][0] != "전체") {
      backOptions[op.eng] = getBackPrices(_options[op.eng]);
    }
  });
  filterMenu.forEach((filter, idx) => {
    backOptions[filter.eng] = getBackFilter(_options[filter.eng]);
  });
};
