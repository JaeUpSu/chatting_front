export const isInitHouseList = (data) => {
  let flag = true;

  const menu = [
    "sellKind",
    "py",
    "toilet_counts",
    "room_counts",
    "maintenanceFeeRange",
    "priceRange",
    "depositRange",
    "monthlyRentRange",
  ];
  const defaultData = {
    sellKind: "전체",
    py: "전체",
    toilet_counts: "전체",
    room_counts: "전체",
    maintenanceFeeRange: [0, 30],
    priceRange: [0, 30],
    depositRange: [0, 30],
    monthlyRentRange: [0, 30],
  };
  menu.forEach((item) => {
    if (data[item] !== defaultData[item]) {
      flag = false;
    }
  });
  return flag;
};
