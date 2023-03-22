import { HouseRegisterValues } from "./data";

const validateTitle = (title) => {
  if (!title) {
    return "제목을 입력하세요.";
  }

  if (title.length < 4 || title.length > 30) {
    return "제목을 4 ~ 30 글자 사이로 입력하세요.";
  }

  return null;
};
const validateAddress = (address) => {
  if (!address) {
    return "상세주소를 입력하세요.";
  }

  if (address.length < 4 || address.length > 30) {
    return "상세주소를 4 ~ 30 글자 사이로 입력하세요.";
  }
  return null;
};
const validateDescription = (description) => {
  if (!description) {
    return "설명을 입력하세요.";
  }

  if (description.length < 10 || description.length > 200) {
    return "설명을 10 ~ 200 글자 사이로 입력하세요.";
  }
  return null;
};

const validateRoom = (number) => {
  const regex = /^[1-9]\d*$/;
  if (!regex.test(number)) {
    return `방 개수는 0 이상의 정수만 입력이 가능합니다.`;
  }
  if (number > 100) {
    return `방 개수는 100 이하의 정수만 입력이 가능합니다.`;
  }
  return null;
};

const validateToilet = (number) => {
  const regex = /^[1-9]\d*$/;
  if (!regex.test(number)) {
    return `화장실 개수는 0 이상의 정수만 입력이 가능합니다.`;
  }
  if (number > 50) {
    return `화장실 개수는 50 이하의 정수만 입력이 가능합니다.`;
  }
  return null;
};

const validatePyeongSu = (number) => {
  const regex = /^[1-9]\d*$/;
  if (!regex.test(number)) {
    return `평수는 0 이상의 정수만 입력이 가능합니다.`;
  }
  if (number > 1000) {
    return `평수는 1000 이하의 정수만 입력이 가능합니다.`;
  }
  return null;
};
const validateSale = (sale) => {
  const regex = /^[1-9]\d*$/;
  if (!regex.test(sale)) {
    return `매매가는 0 이상의 값만 입력이 가능합니다.`;
  }
  if (sale > 100000000) {
    return `매매가는 1조 이하의 값만 입력이 가능합니다.`;
  }
  return null;
};
const validateDeposit = (deposit) => {
  const regex = /^[1-9]\d*$/;
  if (!regex.test(deposit)) {
    return `보증금은 0 이상의 값만 입력이 가능합니다.`;
  }
  if (deposit > 10000000) {
    return `보증금은 1000억 이하의 값만 입력이 가능합니다.`;
  }
  return null;
};

const validateMonthlyRent = (monthly_rent) => {
  const regex = /^[1-9]\d*$/;
  if (!regex.test(monthly_rent)) {
    return `월세는 0 이상의 값만 입력이 가능합니다.`;
  }
  if (monthly_rent > 100000) {
    return `월세는 10억 이하의 값만 입력이 가능합니다.`;
  }
  return null;
};

const validateMaintenanceCost = (maintainance_cost) => {
  const regex = /^[1-9]\d*$/;
  if (!regex.test(maintainance_cost)) {
    return `관리비는 0 이상의 값만 입력이 가능합니다.`;
  }
  if (maintainance_cost > 1000) {
    return `관리비는 1000만 이하의 값만 입력이 가능합니다.`;
  }
  return null;
};
const validateIamge = (image) => {
  const allowedTypes = ["image/jpeg", "image/png"];
  if (!image || image.length !== 5) {
    return "이미지 파일은 5개만이 등록됩니다.";
  }
  for (let i = 0; i < image.length; i++) {
    const file = image[i];
    if (!allowedTypes.includes(file.type)) {
      return "오직 JPEG, PNG 만 등록됩니다.";
    }
  }
  return null;
};

export const validiate = (value, name) => {
  if (name === "title") {
    return validateTitle(value);
  } else if (name === "address") {
    return validateAddress(value);
  } else if (name === "description") {
    return validateDescription(value);
  } else if (name === "room" || name === "toilet") {
    return validateRoom(value);
  } else if (name === "toilet") {
    return validateToilet(value);
  } else if (name === "pyeongsu") {
    return validatePyeongSu(value);
  } else if (name === "sale") {
    return validateSale(value);
  } else if (name === "deposit") {
    return validateDeposit(value);
  } else if (name === "monthly_rent") {
    return validateMonthlyRent(value);
  } else if (name === "maintenance_cost") {
    return validateMaintenanceCost(value);
  }
  return null;
};
