export const getPriceDisplay = (_price) => {
  let price = String(_price);
  if (price == "전체") {
    return "";
  } else if (_price[0] == _price[1]) {
    return _price[0];
  } else {
    if (price.includes("0,")) {
      price.replace("0", "");
    }
    return price.replace(",", "~").replace("무제한", "");
  }
};
