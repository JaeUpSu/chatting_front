export const getOptionsByUrl = (optionsUrl) => {
  const options = {};

  const optionsArr = optionsUrl.split("&");
  optionsArr.forEach((op) => {
    const option = op.split("=");
    if (option[0] != "") {
      options[option[0]] = option[1];
    }
  });

  return options;
};

export const getOptionsDelNameByUrl = (optionsUrl, name) => {
  const options = {};

  const optionsArr = optionsUrl.split("&");
  optionsArr.forEach((op) => {
    const option = op.split("=");
    if (option[0] == name) {
      if (typeof option[1] == "string") {
        options[option[0]] = "";
      } else {
        options[option[0]] = [];
      }
    }
    if (option[0] != "") {
      options[option[0]] = option[1];
    }
  });

  return options;
};
