const orders = {
  최근순: "lastest",
  조회순: "visited",
  낮은가격순: "row_price",
};
export const getBackOrderBy = (order) => {
  return orders[order];
};
