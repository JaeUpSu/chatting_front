import { Box, VStack } from "@chakra-ui/react";

import { optionsMenu } from "../../services/data";
import OptionRangeSlider from "../Slider/RangeSlider";

function PricesMenu({ activePrices, setPrices }) {
  return (
    <VStack>
      {optionsMenu.map((item, idx) => {
        if (idx > 3) {
          if (activePrices[idx - 4]) {
            return (
              <Box key={item + idx}>
                <OptionRangeSlider
                  idx={idx - 3}
                  names={item}
                  onUpdate={setPrices}
                />
              </Box>
            );
          }
        }
      })}{" "}
    </VStack>
  );
}

export default PricesMenu;
