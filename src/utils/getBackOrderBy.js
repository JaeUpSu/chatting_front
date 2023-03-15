const orders = {
  최근순: "row_price",
  조회순: "visited",
  낮은가격순: "lastest",
};
export const getBackOrderBy = (order) => {
  return orders[order];
};
