export const getProcessOptionsToBack = (front) => {
  const processOptions = [];
  front.forEach((f) => {
    processOptions.push({ name: f });
  });
  return [...processOptions];
};

export const getProcessOptionsToFront = (back) => {
  const processOptions = [];
  back.forEach((b) => {
    processOptions.push(b.name);
  });
  return processOptions;
};
