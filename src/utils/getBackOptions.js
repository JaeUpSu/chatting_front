import {
  CellKinds,
  filterMenu,
  options,
  optionsMenu,
  Prices,
  RoomKinds,
} from "../services/data";
import { getPriceRange } from "./getPriceRange";

const getBackPrices = (name, prices) => {
  let backPrices = [];

  backPrices[0] = Number(
    String(prices[0]).replace("만", "0000").replace("억", "00000000")
  );

  const isBillion = String(prices[1]).includes("억");
  backPrices[1] = Number(
    String(prices[1])
      .replace("만", "0000")
      .replace("억", "")
      .replace("무제한", "")
  );

  backPrices[1] = isBillion ? backPrices[1] * 100000000 : backPrices[1];

  if (backPrices[0] == "0") {
    backPrices.reverse().pop();
  }

  if (backPrices[1] == "") {
    backPrices.pop();
  }
  return backPrices;
};

const getBackFilter = (filterVal) => {
  return filterVal
    .replace("화장실", "")
    .replace("방", "")
    .replace("개", "")
    .replace(" ", "")
    .replace("이상", "");
};

const getBackPy = (py) => {
  if (options.py[1] == py) {
    return 0;
  } else {
    const index = options.py.findIndex((val) => val == py);
    return (index - 1) * 10;
  }
};

export const getBackOptions = (_options) => {
  let backOptions = {};
  // { eng: "roomKind", kor: "방 종류" },
  // { eng: "cellKind", kor: "매매 종류" },
  optionsMenu.forEach((op, idx) => {
    if (_options[op.eng] !== "전체") {
      if (idx == 0) {
        backOptions[op.eng] = RoomKinds[_options[op.eng]];
      } else if (idx == 1) {
        backOptions[op.eng] = CellKinds[_options[op.eng]];
      } else if (idx == 2) {
        backOptions[op.eng] = getBackPy(_options[op.eng]);
      } else if (idx < 5) {
        backOptions[op.eng] = getBackFilter(_options[op.eng]);
      } else {
        const isSameOne = (element) => element == "전체";
        const isSameTwo = (element) => element == "0";
        const isSameThree = (element) => element == "30";
        if (
          _options[op.eng].findIndex(isSameOne) == -1 &&
          (_options[op.eng].findIndex(isSameTwo) == -1 ||
            _options[op.eng].findIndex(isSameThree) == -1)
        ) {
          if (idx == 5) {
            backOptions[op.eng] = getBackPrices(op.eng, _options[op.eng]);
          } else {
            Prices.forEach((item) => {
              if (_options.cellKind == item.name) {
                item.list.forEach((item) => {
                  if (item == op.eng) {
                    backOptions[op.eng] = getBackPrices(
                      op.eng,
                      _options[op.eng]
                    );
                  }
                });
              }
            });
          }
        }
      }
    }
  });
  return backOptions;
};
