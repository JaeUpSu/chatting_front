import {
  Button,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Text,
  FormErrorMessage,
  VStack,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { HouseRegisterValues } from "../../services/data";
import RadioImageSelector from "../Card/ImageRadioCard";

const ImageForm = ({
  setUpdatedHouse,
  setUpdatedImage,
  setUpdated,
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

  const [imgIdx, setImgIdx] = useState(-1);
  const [imageUrls, setImageUrls] = useState([]);
  const [imgIdxList, setImgIdxList] = useState([]);
  const [images, setImages] = useState(new Array(5).fill(""));

  const onEnter = () => {
    const data = images;

    let nextHouse = {};
    let isChange = false;

    setUpdatedHouse((prevHouse) => {
      HouseRegisterValues.forEach((item) => {
        if (item.eng === "Image" && data.find((d) => d !== "")) {
          nextHouse[item.eng] = imageUrls;
          setUpdated(imgIdxList);
          isChange = true;
        } else {
          nextHouse[item.eng] = prevHouse[item.eng];
        }
      });
      return nextHouse;
    });

    setUpdatedImage(data);

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
            if (imgUrls.length == 5) {
              if (idx == imgIdx) {
                nextUrls[idx] = { url: results[0] };
              } else {
                nextUrls.push(item);
              }
            } else {
              nextUrls.push(item);
            }
          });
          setImgIdxList((list) => {
            const newList = [];
            if (list && list?.length > 0) {
              if (list.find((i) => i !== imgIdx)) {
                newList.push(imgIdx);
                return [...list, ...newList];
              }
            } else {
              newList.push(imgIdx);
              return newList;
            }
          });
          setImgIdx(-1);
          return nextUrls;
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // init
  useEffect(() => {
    if (values && isInit) {
      setImageUrls(values);
      setIsInit(false);
    }
  }, [values]);

  // image 가 5 이하 일때 isModify => true
  useEffect(() => {
    if (!isInit && !isModify && imageUrls.length < 5) {
      setIsModify(true);
    }
  }, [imageUrls]);

  return (
    <VStack w="40vw" minW="380px">
      <FormLabel marginBottom="0px" fontWeight="600" w="40vw" minW="380px">
        <HStack alignItems="center" justifyContent="space-between" w="80%">
          <HStack alignItems="center">
            <Text>
              {label} ( {imageUrls.length} )
            </Text>
            <Text fontSize="12px">5개 필수</Text>
          </HStack>
          <Text fontSize="12px">
            {imgIdx > -1 ? ` ${imgIdx + 1}번째 이미지 선택` : ""}
          </Text>
        </HStack>
      </FormLabel>
      <form onSubmit={handleSubmit(onEnter)}>
        <FormControl isInvalid={errors.images} id={name}>
          <HStack justifyContent="space-between" w="40vw" minW="380px">
            <Input
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              multiple
              onChange={(e) => {
                const files = e.target.files;

                setImages((list) => {
                  const imgs = [];
                  list.map((item, idx) => {
                    if (idx === imgIdx) {
                      imgs.push(files);
                    } else {
                      imgs.push(item);
                    }
                  });
                  return imgs;
                });
                handleImg(files);
              }}
              isDisabled={isModify ? (imgIdx < 0 ? true : false) : true}
            />
            {isModify ? (
              <HStack>
                <Button type="submit" w="5vw">
                  변경
                </Button>
                <Button onClick={onModify} w="5vw">
                  취소
                </Button>
              </HStack>
            ) : (
              <Button onClick={onModify} w="5.5vw">
                수정
              </Button>
            )}
          </HStack>
        </FormControl>
      </form>
      <VStack w="40vw" minW="380px">
        <RadioImageSelector
          select={setImgIdx}
          images={imageUrls}
          isModify={isModify}
        />
        {(imgIdx < 0) & isModify && (
          <Text w="100%" color="red.400" fontSize="14px" fontWeight="600">
            바꿀 이미지를 선택해주세요.
          </Text>
        )}
      </VStack>
    </VStack>
  );
};

export default ImageForm;
