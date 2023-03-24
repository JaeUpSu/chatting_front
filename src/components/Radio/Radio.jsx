import {
  FormControl,
  FormLabel,
  HStack,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
function DataRadio({ name, data }) {
  const onSelect = (e) => {
    const { value } = e.currentTarget;
  };

  return (
    <FormControl as="fieldset">
      <FormLabel as="legend" fontWeight="600">
        {name}
      </FormLabel>
      <RadioGroup defaultValue="" onClick={onSelect}>
        <HStack spacing="24px">
          {data?.map((item, idx) => {
            return (
              <Radio key={idx} value={item}>
                {item}
              </Radio>
            );
          })}
        </HStack>
      </RadioGroup>
    </FormControl>
  );
}
export default DataRadio;
