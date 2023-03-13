export const getObjListIndexByName = (list, value) => {
  let idx = list.forEach((item, idx) => {
    if (item.name == value) {
      return idx;
    }
  });
};
