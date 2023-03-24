// front => ["a","b",..]
// back => [{name:"a"},{name:"b"},..]
export const isSameOptions = (front, back) => {
  let idx = -1;
  front.forEach((f) => {
    idx = back.findIndex((b) => b.name === f);
  });
  return idx;
};
