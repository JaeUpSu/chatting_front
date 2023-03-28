import { Box, VStack } from "@chakra-ui/react";

import { optionsMenu } from "../../services/data";
import DrawerOptionRangeSlider from "../Slider/DrawerRangeSlider";

function DrawerPricesMenu({ activePrices, setPrices }) {
  return (
    <VStack justifyContent="flex-start">
      {activePrices
        ? optionsMenu.map((item, idx) => {
            if (idx > 5) {
              if (activePrices[idx - 6]) {
                return (
                  <Box key={item + idx} pl="10px" pr="30px">
                    <DrawerOptionRangeSlider
                      idx={idx - 5}
                      names={item}
                      onUpdate={setPrices}
                    />
                  </Box>
                );
              }
            }
          })
        : ""}{" "}
    </VStack>
  );
}

export default DrawerPricesMenu;
