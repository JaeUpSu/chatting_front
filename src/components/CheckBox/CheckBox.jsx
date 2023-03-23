import {
  FormControl,
  FormLabel,
  HStack,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";
function DataCheckBox({ name, data }) {
  const onOptionUpdate = (e) => {
    const { value } = e.currentTarget;
  };

  return (
    <FormControl as="fieldset">
      <FormLabel as="legend" fontWeight="600">
        {name}
      </FormLabel>
      <CheckboxGroup defaultValue="" onChange={onOptionUpdate}>
        <HStack spacing="24px">
          {data?.map((item, idx) => {
            return (
              <Checkbox key={idx} value={item}>
                {item}
              </Checkbox>
            );
          })}
        </HStack>
      </CheckboxGroup>
    </FormControl>
  );
}
export default DataCheckBox;
