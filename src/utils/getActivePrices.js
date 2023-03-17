import { options } from "../services/data";

export const getActivePrices = (sellKind) => {
  const activePricesItems = [
    [true, false, false],
    [false, true, false],
    [false, true, true],
  ];
  const sellKinds = options.sellKind;
  const idx = sellKinds.findIndex((sell) => sell == sellKind);
  return activePricesItems[idx];
};
