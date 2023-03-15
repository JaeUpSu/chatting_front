import { options, Address, addressKinds } from "./data";

export const isVal = (valName) => {
  if (
    valName == "null" ||
    valName == null ||
    valName == undefined ||
    valName == "undefined"
  ) {
    return false;
  }
  return true;
};
const isNoMatter = (val) => {
  if (val == "상관없음") {
    return true;
  }
  return false;
};
const getCellKind = () => {
  const cell = sessionStorage.getItem("cellKind");

  if (isVal(cell) && !isNoMatter(cell)) {
    return cell;
  }

  return "";
};
const getRoomCounts = () => {
  const roomCounts = sessionStorage.getItem("room_counts");

  if (isVal(roomCounts) && !isNoMatter(roomCounts)) {
    return "방" + roomCounts;
  }

  return "";
};

const getToiletCounts = () => {
  const toiletCounts = sessionStorage.getItem("toilet_counts");
  if (isVal(toiletCounts) && !isNoMatter(toiletCounts)) {
    return "화장실" + toiletCounts;
  }
  return "";
};

const getIsStationArea = () => {
  const isStationArea = sessionStorage.getItem("isStationArea");

  if (isVal(isStationArea) && !isNoMatter(isStationArea)) {
    return "역세권";
  }
  return "";
};

const getPy = (options) => {
  const py = sessionStorage.getItem("py");

  if (isVal(py) && !isNoMatter(py)) {
    const pyList = py.split(",");
    pyList.forEach((val) => options.py.push(val));
  }
  return options;
};
const getPriceArr = (options) => {
  const priceArr = sessionStorage.getItem("priceArr");

  if (isVal(priceArr) && !isNoMatter(priceArr)) {
    const priceList = priceArr.split(",");
    priceList.forEach((val) => options.priceArr.push(val));
  }

  return options;
};

export const initLocal = () => {
  const cellKind = sessionStorage.getItem("cellKind");
  if (!isVal(cellKind)) {
    sessionStorage.removeItem("cellKind");
    sessionStorage.setItem("cellKind", options.cellKind[0]);
    sessionStorage.setItem("room_counts", options.room_counts[0]);
    sessionStorage.setItem("toilet_counts", options.toilet_counts[0]);
    sessionStorage.setItem("isStationArea", options.isStationArea[0]);
  }
};

export const getAddress = () => {
  let _address = "";

  addressKinds.forEach((item, idx) => {
    const placeNum = sessionStorage.getItem(item);
    if (isVal(placeNum)) {
      _address += Address[item][placeNum];
      if (idx < 2) {
        _address += " ";
      }
    }
    sessionStorage.removeItem(item);
  });
  return _address;
};

export const getOptions = () => {
  let options = {
    room_counts: "",
    toilet_counts: "",
    isStationArea: "",
  };
  options.room_counts = getRoomCounts();
  options.toilet_counts = getToiletCounts();
  options.isStationArea = getIsStationArea();
  return options;
};

export const initParams = () => {
  return {
    roomKind: sessionStorage.getItem("roomKind")
      ? sessionStorage.getItem("roomKind")
      : "전체",
    cellKind: sessionStorage.getItem("cellKind")
      ? sessionStorage.getItem("cellKind")
      : "전체",
    py: sessionStorage.getItem("py") ? sessionStorage.getItem("py") : "전체",
    toilet_counts: sessionStorage.getItem("toilet_counts")
      ? sessionStorage.getItem("toilet_counts")
      : "전체",
    room_counts: sessionStorage.getItem("room_counts")
      ? sessionStorage.getItem("room_counts")
      : "전체",
    maintenanceFeeRange: sessionStorage.getItem("maintenanceFeeRange")
      ? sessionStorage.getItem("maintenanceFeeRange").split(",")
      : [0, 30],
    priceRange: sessionStorage.getItem("priceRange")
      ? sessionStorage.getItem("priceRange").split(",")
      : [0, 30],
    depositRange: sessionStorage.getItem("depositRange")
      ? sessionStorage.getItem("depositRange").split(",")
      : [0, 30],
    monthlyRentRange: sessionStorage.getItem("monthlyRentRange")
      ? sessionStorage.getItem("monthlyRentRange").split(",")
      : [0, 30],
    gu: sessionStorage.getItem("gugunsiIdx")
      ? sessionStorage.getItem("gugunsiIdx")
      : "-1",
    dong: sessionStorage.getItem("ebmyeondongIdx")
      ? sessionStorage.getItem("ebmyeondongIdx")
      : "-1",
  };
};

export const getInitOrderBy = () => {
  let initOrderBy = [];
  const ordersFront = ["최근순", "조회순", "낮은가격순"];
  const orders = {
    lastest: "최근순",
    visited: "조회순",
    row_price: "낮은가격순",
  };

  const orderBy = sessionStorage.getItem("sort_by")
    ? orders[sessionStorage.getItem("sort_by")]
    : "최근순";

  initOrderBy.push(orderBy);
  ordersFront.forEach((item, idx) => {
    if (orderBy !== item) {
      initOrderBy.push(item);
    }
  });
  return initOrderBy;
};
