// front => ["a","b",..]
// back => [{name:"a"},{name:"b"},..]
export const isSameOptions = (front, back) => {
  let flag = true;
  if (front.length !== back.length) return false;
  back.forEach((b) => {
    if (front.findIndex((f) => f === b.name) < 0) {
      flag = false;
    }
  });
  return flag;
};
