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
  const cell = localStorage.getItem("cellKind");

  if (isVal(cell) && !isNoMatter(cell)) {
    return cell;
  }

  return "";
};
const getRoomCounts = () => {
  const roomCounts = localStorage.getItem("room_counts");

  if (isVal(roomCounts) && !isNoMatter(roomCounts)) {
    return "방" + roomCounts;
  }

  return "";
};

const getToiletCounts = () => {
  const toiletCounts = localStorage.getItem("toilet_counts");
  if (isVal(toiletCounts) && !isNoMatter(toiletCounts)) {
    return "화장실" + toiletCounts;
  }
  return "";
};

const getIsStationArea = () => {
  const isStationArea = localStorage.getItem("isStationArea");

  if (isVal(isStationArea) && !isNoMatter(isStationArea)) {
    return "역세권";
  }
  return "";
};

const getPy = (options) => {
  const py = localStorage.getItem("py");

  if (isVal(py) && !isNoMatter(py)) {
    const pyList = py.split(",");
    pyList.forEach((val) => options.py.push(val));
  }
  return options;
};
const getPriceArr = (options) => {
  const priceArr = localStorage.getItem("priceArr");

  if (isVal(priceArr) && !isNoMatter(priceArr)) {
    const priceList = priceArr.split(",");
    priceList.forEach((val) => options.priceArr.push(val));
  }

  return options;
};

export const initLocal = () => {
  const cellKind = localStorage.getItem("cellKind");
  if (!isVal(cellKind)) {
    localStorage.removeItem("cellKind");
    localStorage.setItem("cellKind", options.cellKind[0]);
    localStorage.setItem("room_counts", options.room_counts[0]);
    localStorage.setItem("toilet_counts", options.toilet_counts[0]);
    localStorage.setItem("isStationArea", options.isStationArea[0]);
  }
};

export const getAddress = () => {
  let _address = "";

  addressKinds.forEach((item, idx) => {
    const placeNum = localStorage.getItem(item);
    if (isVal(placeNum)) {
      _address += Address[item][placeNum];
      if (idx < 2) {
        _address += " ";
      }
    }
    localStorage.removeItem(item);
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
