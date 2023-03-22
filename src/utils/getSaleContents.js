import { SellKindsToFront } from "../services/data";
export const getSaleContents = (sell_kind, deposit, monthly_rent, sale) => {
  let contents = ``;

  if (SellKindsToFront[sell_kind] == "월세") {
    if (deposit >= 100000000) {
      contents += `보증금 ${Math.round(
        deposit / 100000000
      )} 억 / 월 ${Math.round(monthly_rent / 10000)} 만`;
    } else {
      contents += `보증금 ${Math.round(deposit / 10000)} 만 / 월 ${Math.round(
        monthly_rent / 10000
      )}만`;
    }
  } else if (SellKindsToFront[sell_kind] == "전세") {
    if (deposit >= 100000000) {
      contents += `보증금 ${Math.round(deposit / 100000000)} 억`;
    } else {
      contents += `보증금 ${Math.round(deposit / 10000)} 만`;
    }
  } else {
    if (sale >= 100000000) {
      contents += `매매가 ${Math.round(sale / 100000000)} 억`;
    } else {
      contents += `매매가 ${Math.round(sale / 10000)} 만`;
    }
  }
  return contents;
};
