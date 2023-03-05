function SelectAccordion({ menu, data }) {
  return (
    <Accordion>
      {data.map((value, idx) => {
        return (
          <AccordionItem key={idx}>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  {menu[idx]}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>{value}</AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
export default SelectAccordion;
