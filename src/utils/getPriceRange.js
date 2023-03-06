const getPriceByStep = (steps, value) => {
  let price = 0;
  steps.forEach((item) => {
    if (value >= 10) {
      price += item * 10;
      value -= 10;
    } else {
      price += item * value;
      value = 0;
    }
  });
  return price;
};

export const getPriceRange = (values, steps) => {
  const min = values[0] == 0 ? "0" : getPriceByStep(steps, values[0]) + "만";
  const max =
    values[1] == 30 ? "무제한" : getPriceByStep(steps, values[1]) + "만원";
  return `${min}원 ~ ${max}`;
};
