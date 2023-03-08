export const getPrices = (values) => {
  const prices = values.replaceAll("원", "").split(" ~ ");
  return prices;
};
