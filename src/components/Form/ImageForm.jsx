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
import { useMutation } from "@tanstack/react-query";

import { HouseRegisterValues } from "../../services/data";
import { getUploadURL, uploadImage } from "../../services/api";

const ImageForm = ({
  setUpdatedHouse,
  setUpdatedData,
  values,
  name,
  label,
}) => {
  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [isModify, setIsModify] = useState(false);
  const [images, setImages] = useState([]);
  const [uploadUrls, setUploadUrls] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageBackUrls, setImageBackUrls] = useState([]);

  const onEnter = (data) => {
    console.log("check", data);

    let nextHouse = {};
    let isChange = false;
    setUpdatedHouse((prevHouse) => {
      HouseRegisterValues.forEach((item) => {
        if (data[item.eng]) {
          if (data[item.eng] !== prevHouse[item.eng]) {
            nextHouse[item.eng] = data[item.eng];
            isChange = true;
          } else {
            nextHouse[item.eng] = prevHouse[item.eng];
          }
        } else {
          nextHouse[item.eng] = prevHouse[item.eng];
        }
      });
      return nextHouse;
    });
    if (isChange) {
      setIsModify(false);
    }
  };

  const onModify = () => {
    setIsModify(!isModify);
  };

  const onDelete = (e) => {
    const idx = e.currentTarget.getAttribute("idx");
    // console.log("idx", idx);
  };

  const uploadImageMutation = useMutation(uploadImage, {
    onSuccess: ({ result }) => {
      setImageBackUrls((imgs) => {
        const newImgBack = [];
        imgs?.map((item) => {
          newImgBack.push(item);
        });
        newImgBack.push({ url: result.variants[0] });
        return newImgBack;
      });
      // console.log(watch());
    },
  });

  const uploadURLMutation = useMutation(getUploadURL, {
    onSuccess: (data) => {
      setUploadUrls((imgs) => {
        const newImgBack = [];
        imgs?.map((item) => {
          newImgBack.push(item);
        });
        newImgBack.push(data.uploadURL);
        return newImgBack;
      });
    },
  });

  // 5개의 이미지 fileReader 로 값 변환 => imageUrls
  useEffect(() => {
    if (images.length === 5) {
      const readerPromises = [];

      for (let i = 0; i < images.length; i++) {
        const file = images[i][0];
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
      }

      Promise.all(readerPromises)
        .then((results) => {
          setImageUrls((imgUrls) => {
            const nextImgUrls = [...imgUrls, ...results];
            return nextImgUrls;
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [images]);

  // 이미지 fileReader 값을 저장할 5개의 url 만들기 => getUploadUrls mutate
  useEffect(() => {
    for (let i = 0; i < images.length; i++) {
      uploadURLMutation.mutate();
    }
  }, [imageUrls]);

  // uploadUrls & images => uploadUrls mutate
  useEffect(() => {
    if (uploadUrls?.length === 5) {
      for (let i = 0; i < 5; i++) {
        uploadImageMutation.mutate({
          uploadURL: uploadUrls[i],
          file: images[i],
        });
      }
    }
  }, [uploadUrls]);

  // uploadUrls Response => console.log
  useEffect(() => {
    if (imageBackUrls?.length === 5) {
      console.log("back", imageBackUrls);
    }
  }, [imageBackUrls]);

  return (
    <>
      <FormLabel marginBottom="0px" w="70vw" fontWeight="600">
        {label}( {images.length} / 5 )
      </FormLabel>
      {isModify ? (
        <form onSubmit={handleSubmit(onEnter)}>
          <FormControl isInvalid={errors.images} id="images">
            <HStack w="70vw" justifyContent="space-between">
              <Input
                type="file"
                multiple
                onChange={(e) => {
                  const files = e.target.files;
                  // console.log(files);
                  setImages((list) => {
                    const imgs = [];
                    list.map((item) => {
                      imgs.push(item);
                    });
                    imgs.push(files);
                    return imgs;
                  });
                }}
              />
              <Button type="submit">입력</Button>
              <Button onClick={onModify}>취소</Button>
            </HStack>
          </FormControl>
        </form>
      ) : (
        <VStack w="70vw">
          <HStack w="70vw" justifyContent="space-between">
            <HStack>
              {values?.map((item, idx) => {
                // console.log(item);
                return (
                  <Image
                    key={idx}
                    src={item.url}
                    w="6vw"
                    h="4vh"
                    idx={idx}
                    onClick={onDelete}
                  />
                );
              })}
            </HStack>
            <Button onClick={onModify}>수정</Button>
          </HStack>
        </VStack>
      )}
    </>
  );
};

export default ImageForm;
