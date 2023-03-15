import {
  backParamsRangeList,
  backParamsValueList,
  CellKindsToBack,
  options,
  optionsMenu,
  Prices,
  RoomKindsToBack,
} from "../services/data";
import { getPriceRange } from "./getPriceRange";
import { getPrices } from "./getPrices";

const getBackPrices = (name, prices) => {
  let prevPrices = prices;
  let backPrices = [];

  if ((!isNaN(prevPrices[0]) && prevPrices[0] > 0) || !isNaN(prevPrices[1])) {
    prevPrices = getPrices(getPriceRange(prices, options[name].steps));
  }

  const isMinBillion = String(prevPrices[0]).includes("억");

  backPrices[0] = Number(
    String(prevPrices[0]).replace("만", "0000").replace("억", "00000000")
  );

  const isMaxBillion = String(prevPrices[1]).includes("억");
  backPrices[1] = Number(
    String(prevPrices[1])
      .replace("만", "0000")
      .replace("억", "")
      .replace("무제한", "")
  );

  backPrices[0] = Math.floor(
    isMinBillion ? backPrices[0] * 100000000 : backPrices[0]
  );
  backPrices[1] = Math.floor(
    isMaxBillion ? backPrices[1] * 100000000 : backPrices[1]
  );

  if (backPrices[0] == "0") {
    backPrices[0] = -1;
  }

  if (backPrices[1] == "") {
    backPrices[1] = -1;
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

const getParamValueName = (idx) => {
  return backParamsValueList[idx].paramName;
};
const getParamRangeName = (idx, first) => {
  if (first) {
    return backParamsRangeList[idx].paramNameStart;
  }
  return backParamsRangeList[idx].paramNameEnd;
};

export const getBackOptions = (_options) => {
  let backOptions = {};

  optionsMenu.forEach((op, idx) => {
    if (_options[op.eng] !== "전체") {
      if (idx < 5) {
        const paramName = getParamValueName(idx);
        if (idx == 0) {
          backOptions[paramName] = RoomKindsToBack[_options[op.eng]];
        } else if (idx == 1) {
          backOptions[paramName] = CellKindsToBack[_options[op.eng]];
        } else if (idx == 2) {
          backOptions[paramName] = getBackPy(_options[op.eng]);
        } else {
          backOptions[paramName] = getBackFilter(_options[op.eng]);
        }
      } else {
        const isSameOne = (element) => element == "전체";
        const isSameTwo = (element) => element == "0";
        const isSameThree = (element) => element == "30";
        if (
          _options[op.eng].findIndex(isSameOne) == -1 &&
          (_options[op.eng].findIndex(isSameTwo) == -1 ||
            _options[op.eng].findIndex(isSameThree) == -1)
        ) {
          const maxParamName = getParamRangeName(idx - 5, false);
          const minParamName = getParamRangeName(idx - 5, true);

          if (_options["cellKind"] == "전체") {
            const range = getBackPrices(op.eng, _options[op.eng]);
            if (range[0] > 0) {
              backOptions[minParamName] = range[0];
            }
            if (range[1] > 0) {
              backOptions[maxParamName] = range[1];
            }
          } else {
            if (idx == 5) {
              const range = getBackPrices(op.eng, _options[op.eng]);
              if (range[0] > 0) {
                backOptions[minParamName] = range[0];
              }
              if (range[1] > 0) {
                backOptions[maxParamName] = range[1];
              }
            } else {
              Prices.forEach((item) => {
                if (_options.cellKind == item.name) {
                  item.list.forEach((item) => {
                    if (item == op.eng) {
                      const range = getBackPrices(op.eng, _options[op.eng]);
                      if (range[0] > 0) {
                        backOptions[minParamName] = range[0];
                      }
                      if (range[1] > 0) {
                        backOptions[maxParamName] = range[1];
                      }
                    }
                  });
                }
              });
            }
          }
        }
      }
    }
  });

  if (_options["sort_by"]) {
    backOptions["sort_by"] = _options["sort_by"];
  }

  // if (sessionStorage.getItem("gugunsi") != "-1") {
  //   backOptions["gu"] = _options["gu"];
  // }
  if (_options["ebmyeongdong"] != "-1") {
    backOptions["dong"] = _options["dong"];
  }
  return backOptions;
};
