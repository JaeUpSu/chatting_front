export const getOptionFormat = (options) => {
  const processedOptions = [];
  options.forEach((item) => {
    processedOptions.push({ name: item });
  });
  return processedOptions;
};
