import { options } from "../services/data";

export const getActivePrices = (cellKind) => {
  const activePricesItems = [
    [true, true, true],
    [true, false, false],
    [false, true, false],
    [false, true, true],
  ];
  const cellKinds = options.cellKind;
  const idx = cellKinds.findIndex((cell) => cell == cellKind);
  return activePricesItems[idx];
};
