import { SellKindsToFront } from "../services/data";
export const getSaleContents = (sell_kind, deposit, monthly_rent, sale) => {
  let contents = ``;

  if (SellKindsToFront[sell_kind] == "월세") {
    if (deposit >= 100000000) {
      contents += `보증금 ${deposit / 100000000}만`;
    } else {
      contents += `보증금 ${deposit / 10000}만 / 월 ${monthly_rent / 10000}만`;
    }
  } else if (SellKindsToFront[sell_kind] == "전세") {
    if (deposit >= 100000000) {
      contents += `보증금 ${deposit / 100000000}억`;
    } else {
      contents += `보증금 ${deposit / 10000}만`;
    }
  } else {
    if (sale >= 100000000) {
      contents += `매매가 ${sale / 100000000}억`;
    } else {
      contents += `매매가 ${sale / 10000}만`;
    }
  }
  return contents;
};
