//   { eng: "title", kor: "제목", isRequired: true },
//   { eng: "address", kor: "주소", isRequired: true },
//   { eng: "room_kind", kor: "방 종류", isRequired: true },
//   { eng: "sell_kind", kor: "거래 종류", isRequired: true },
//   { eng: "sale", kor: "매매가", isRequired: true },
//   { eng: "deposit", kor: "보증금", isRequired: true },
//   { eng: "monthly_rent", kor: "월세", isRequired: true },
//   { eng: "maintenance_cost", kor: "관리비", isRequired: true },
//   { eng: "room", kor: "방 개수", isRequired: true },
//   { eng: "toilet", kor: "화장실 개수", isRequired: true },
//   { eng: "pyeongsu", kor: "평수", isRequired: true },
//   { eng: "distance_to_station", kor: "역까지 거리", isRequired: true },
//   { eng: "description", kor: "설명", isRequired: true },
//   { eng: "Image", kor: "이미지", isRequired: true },

export const validateTitle = (title) => {
  if (title) {
    return "제목을 입력하세요.";
  }

  if (title.length < 4 || title.length > 30) {
    return "제목을 4 ~ 30 글자 사이로 입력하세요.";
  }

  return null;
};
export const validateAddress = (address) => {
  if (address) {
    return "상세주소를 입력하세요.";
  }

  if (address.length < 4 || address.length > 30) {
    return "상세주소를 4 ~ 30 글자 사이로 입력하세요.";
  }
  return null;
};
export const validateDescription = (description) => {
  if (description) {
    return "설명을 입력하세요.";
  }

  if (description.length < 10 || description.length > 200) {
    return "설명을 10 ~ 200 글자 사이로 입력하세요.";
  }
  return null;
};
