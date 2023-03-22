import { Tooltip, RadioGroup, Stack, Button } from "@chakra-ui/react";
import React, { useState } from "react";

const ImageCard = ({ imageUrl, idx, isSelected, onSelect, isModify }) => {
  return (
    <Tooltip label={isModify && "이미지 선택"}>
      <Button
        w="12vw"
        h="10vh"
        borderWidth="2px"
        borderRadius="lg"
        backgroundImage={imageUrl}
        backgroundSize="cover"
        backgroundPosition="center"
        boxShadow={isSelected ? "outline" : "none"}
        onClick={isModify ? () => onSelect(imageUrl, idx) : () => {}}
        _hover={{ backgroundColor: "rgb(20,20,20,0.1)" }}
        sx={{ "&:focus": { outline: "none" } }}
      />
    </Tooltip>
  );
};

const RadioImageSelector = ({ images, select, isModify }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSelect = (value, idx) => {
    setSelectedImage(value);
    select(idx);
  };

  return (
    <RadioGroup value={selectedImage} w="70vw">
      <Stack direction="row" spacing={2}>
        {images.map((imageUrl, idx) => (
          <ImageCard
            key={idx}
            idx={idx}
            imageUrl={imageUrl.url}
            isModify={isModify}
            isSelected={selectedImage === imageUrl.url}
            onSelect={handleSelect}
          />
        ))}
      </Stack>{" "}
    </RadioGroup>
  );
};

export default RadioImageSelector;
