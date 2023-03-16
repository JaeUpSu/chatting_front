import { SellKindsToFront } from "../services/data";
export const getSaleContents = (sell_kind, deposit, monthly_rent, sale) => {
  let contents = ``;

  if (SellKindsToFront[sell_kind] == "월세") {
    contents += `보증금 ${deposit}만 / 월 ${monthly_rent}만`;
  } else if (SellKindsToFront[sell_kind] == "전세") {
    contents += `보증금 ${deposit}만`;
  } else {
    contents += `매매가 ${sale}억`;
  }
  return contents;
};
