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
  const minValue = getPriceByStep(steps, values[0]);
  const maxValue = getPriceByStep(steps, values[1]);

  const min =
    values[0] == 0
      ? "0"
      : minValue >= 10000
      ? minValue / 10000 + "억원"
      : minValue + "만원";
  const max =
    values[1] == 30
      ? "무제한"
      : maxValue >= 10000
      ? maxValue / 10000 + "억원"
      : maxValue + "만원";

  if (min == max) {
    return max;
  }

  if (min == 0 && max == "무제한") {
    return "전체";
  }

  return `${min} ~ ${max}`;
};
