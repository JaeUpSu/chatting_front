// front => ["a","b",..]
// back => [{name:"a"},{name:"b"},..]
export const getProcessOptions = (front, back) => {
  const processOptions = [];
  back.forEach((b) => {
    if (!front.includes(b.name)) {
      processOptions.push({ name: f });
    }
  });
  return [...processOptions, ...back];
};
