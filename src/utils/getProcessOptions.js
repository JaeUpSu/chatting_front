// front => ["a","b",..]
// back => [{name:"a"},{name:"b"},..]
export const getProcessOptionsToBack = (front, back) => {
  const processOptions = [];
  front.forEach((f) => {
    if (!back.includes({ name: f })) {
      processOptions.push({ name: f });
    }
  });
  return [...processOptions, ...back];
};

export const getProcessOptionsToFront = (back) => {
  const processOptions = [];
  back.forEach((b) => {
    processOptions.push(b.name);
  });
  return processOptions;
};
