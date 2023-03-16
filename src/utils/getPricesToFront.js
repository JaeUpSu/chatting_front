export const getPricesToFront = (price) => {
  if (price >= 100000000) {
    const newPrice = price / 100000000;
    return newPrice.toFixed(1).toString() + "억";
  } else if (price >= 10000) {
    const newPrice = price / 10000;
    return newPrice.toFixed(1).toString() + "만";
  }
};
