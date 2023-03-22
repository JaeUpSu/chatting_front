import {
  Button,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Text,
  FormErrorMessage,
  VStack,
  Image,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { HouseRegisterValues } from "../../services/data";
import ImageCard from "../Card/ImageCard";

const ImageForm = ({
  setUpdatedHouse,
  setUpdatedData,
  values,
  name,
  label,
}) => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isInit, setIsInit] = useState(true);
  const [isModify, setIsModify] = useState(false);

  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const onEnter = () => {
    // console.log("check", data);
    const data = images;

    let nextHouse = {};
    let nextData = {};
    let isChange = false;

    console.log("imgForm", data[0]);

    setUpdatedHouse((prevHouse) => {
      HouseRegisterValues.forEach((item) => {
        if (item.eng === "Image" && data) {
          nextHouse[item.eng] = imageUrls;
          isChange = true;
        } else {
          nextHouse[item.eng] = prevHouse[item.eng];
        }
      });
      return nextHouse;
    });

    setUpdatedData((prevData) => {
      HouseRegisterValues.forEach((item) => {
        if (item.eng === "Image" && data) {
          nextData[item.eng] = data;
        } else if (prevData[item.eng]) {
          nextData[item.eng] = prevData[item.eng];
        }
      });
      console.log("imgForm", nextData);

      return nextData;
    });

    if (isChange) {
      setIsModify(false);
    }
  };

  const onModify = () => {
    setImageUrls(values);
    setIsModify(!isModify);
  };

  // preview 이미지 setting
  const handleImg = (_file) => {
    const readerPromises = [];

    const file = _file[0];
    const reader = new FileReader();

    readerPromises.push(
      new Promise((resolve, reject) => {
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = () => {
          reject(reader.error);
        };
        reader.readAsDataURL(file);
      })
    );

    Promise.all(readerPromises)
      .then((results) => {
        setImageUrls((imgUrls) => {
          const nextUrls = [];
          imgUrls.forEach((item, idx) => {
            if (idx > 0) {
              nextUrls.push(item);
            }
          });
          const nextImgUrls = [...nextUrls, { url: results[0] }];
          return nextImgUrls;
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (values && isInit) {
      setImageUrls(values);
      setIsInit(false);
    }
  }, [values]);

  useEffect(() => {
    if (!isInit && imageUrls.length < 5) {
      onModify();
    }
  }, [imageUrls]);

  useEffect(() => {
    console.log("update", images);
  }, [images]);

  return (
    <>
      <FormLabel marginBottom="0px" w="70vw" fontWeight="600">
        <HStack alignItems="center">
          <Text>
            {label} ( {imageUrls.length} )
          </Text>
          <Text fontSize="12px">5개 필수</Text>
        </HStack>
      </FormLabel>
      <form onSubmit={handleSubmit(onEnter)}>
        <FormControl isInvalid={errors.images} id={name}>
          <HStack w="70vw" justifyContent="space-between">
            <Input
              type="file"
              accept=".jpg,.jpeg,.png"
              multiple
              onChange={(e) => {
                const files = e.target.files;
                console.log(files);
                setImages((list) => {
                  const imgs = [];
                  list.map((item) => {
                    imgs.push(item);
                  });
                  if (list.length === 5) imgs.pop(0);
                  imgs.push(files[0]);
                  return imgs;
                });
                handleImg(files);

                // e.target.value = null;
              }}
              isDisabled={!isModify}
            />
            {isModify ? (
              <HStack>
                <Button type="submit">입력</Button>
                <Button onClick={onModify}>취소</Button>
              </HStack>
            ) : (
              <Button onClick={onModify}>수정</Button>
            )}
          </HStack>
        </FormControl>
      </form>
      <VStack w="70vw">
        <HStack w="70vw" justifyContent="space-between">
          <HStack>
            {imageUrls?.map((item, idx) => {
              if (idx < 5) {
                const url = item.url;
                return (
                  <ImageCard
                    key={idx}
                    idx={idx}
                    src={url}
                    setImageUrls={setImageUrls}
                    setImages={setImages}
                  />
                );
              }
            })}
          </HStack>
        </HStack>
      </VStack>
    </>
  );
};

export default ImageForm;
