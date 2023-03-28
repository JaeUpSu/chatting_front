import { HouseRegisterValues } from "../services/data";

// 필요없는 가격 없애기
export const getMatchModifyKindPrice = (nextData, prevData) => {
  let processedData = {};

  if (nextData["sell_kind"]) {
    HouseRegisterValues.forEach((item) => {
      if (
        nextData[item.eng] &&
        item.eng !== "sale" &&
        item.eng !== "deposit" &&
        item.eng !== "monthly_rent"
      ) {
        processedData[item.eng] = nextData[item.eng];
      }
    });

    // sell_kind 별 price 값 추가
    if (nextData["sell_kind"] == "SALE" && nextData["sale"]) {
      processedData["sale"] = nextData["sale"];
    } else if (nextData["sell_kind"] == "CHARTER" && nextData["deposit"]) {
      processedData["deposit"] = nextData["deposit"];
    } else if (
      nextData["sell_kind"] == "MONTHLY_RENT" &&
      nextData["monthly_rent"]
    ) {
      processedData["monthly_rent"] = nextData["monthly_rent"];
      if (nextData["deposit"]) {
        processedData["deposit"] = nextData["deposit"];
      }
    }
  } else {
    // sell_kind 별 price 값 추가
    if (prevData["sell_kind"] == "SALE" && nextData["sale"]) {
      processedData["sale"] = nextData["sale"];
    } else if (prevData["sell_kind"] == "CHARTER" && nextData["deposit"]) {
      processedData["deposit"] = nextData["deposit"];
    } else if (
      prevData["sell_kind"] == "MONTHLY_RENT" &&
      nextData["monthly_rent"]
    ) {
      processedData["monthly_rent"] = nextData["monthly_rent"];
      if (nextData["deposit"]) {
        processedData["deposit"] = nextData["deposit"];
      }
    }
  }

  return processedData;
};
// 필요없는 가격 없애기
export const getMatchSellKindPrice = (nextData) => {
  let processedData = {};

  HouseRegisterValues.forEach((item) => {
    if (
      nextData[item.eng] &&
      item.eng !== "sale" &&
      item.eng !== "deposit" &&
      item.eng !== "monthly_rent"
    ) {
      processedData[item.eng] = nextData[item.eng];
    }
  });

  // sell_kind 별 price 값 추가
  if (nextData["sell_kind"] == "SALE" && nextData["sale"]) {
    processedData["sale"] = nextData["sale"];
  } else if (nextData["sell_kind"] == "CHARTER" && nextData["deposit"]) {
    processedData["deposit"] = nextData["deposit"];
  } else if (
    nextData["sell_kind"] == "MONTHLY_RENT" &&
    nextData["monthly_rent"]
  ) {
    processedData["monthly_rent"] = nextData["monthly_rent"];
    if (nextData["deposit"]) {
      processedData["deposit"] = nextData["deposit"];
    }
  }

  console.log("prev", nextData);
  console.log("next", processedData);

  return processedData;
};

// sell_kind 와 price 가 잘 매치되어있는지
export const matchSellKindPrice = (nextData, prevData) => {
  // 갱신 데이터에 sell_kind 없을때
  if (!nextData["sell_kind"]) {
    return true;
  }
  // 갱신 데이터에 sell_kind 있을때
  // 이전과 동일할때
  if (nextData["sell_kind"] == prevData["sell_kind"]) {
    return true;
  }

  // sell_kind 별 price 값 추가
  if (
    nextData["sell_kind"] == "SALE" &&
    (nextData["sale"] || prevData["sale"])
  ) {
    return true;
  } else if (
    nextData["sell_kind"] == "CHARTER" &&
    (nextData["deposit"] || prevData["deposit"])
  ) {
    return true;
  } else if (
    nextData["sell_kind"] == "MONTHLY_RENT" &&
    (nextData["monthly_rent"] || prevData["monthly_rent"]) &&
    (nextData["deposit"] || prevData["deposit"])
  ) {
    return true;
  }
  return false;
};
