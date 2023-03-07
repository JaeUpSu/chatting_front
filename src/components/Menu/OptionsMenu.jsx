import { Grid, GridItem, Box } from "@chakra-ui/react";

import { isLocal } from "../../services/local";
import { optionsMenu, options } from "../../services/data";

import DataRadioCard from "../Radio/RadioCard";

function OptionsMenu({ setSelectedOpts }) {
  return (
    <Box>
      <DataRadioCard
        name={optionsMenu[0].kor}
        valueName={optionsMenu[0].eng}
        data={options[optionsMenu[0].eng]}
        defaultData={
          isLocal(localStorage.getItem(optionsMenu[0].eng))
            ? localStorage.getItem(optionsMenu[0].eng)
            : options[optionsMenu[0].eng][0]
        }
        onUpdate={setSelectedOpts}
      />
      <Grid gap="10px">
        {optionsMenu.map((op, idx) => {
          if (idx < 5 && idx > 0) {
            return (
              <GridItem key={idx}>
                <br />
                <DataRadioCard
                  name={op.kor}
                  valueName={op.eng}
                  data={options[op.eng]}
                  defaultData={
                    isLocal(localStorage.getItem(op.eng))
                      ? localStorage.getItem(op.eng)
                      : options[op.eng][0]
                  }
                  onUpdate={setSelectedOpts}
                />
              </GridItem>
            );
          } else {
            return "";
          }
        })}
        <br />
      </Grid>
    </Box>
  );
}

export default OptionsMenu;
