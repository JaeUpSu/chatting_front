import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

import { getHouse, putHouse } from "../../services/api";

const HouseEdit = () => {
  const { id } = useParams();
  const house = useQuery(["house", id], getHouse);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate } = useMutation((formData) => putHouse(id, formData), {
    onSuccess: () => {
      console.log("update house!");
    },
    onError: () => {
      console.log("don't update house!");
    },
  });

  const onSubmit = (formData) => {
    mutate(formData);
  };

  useEffect(() => {
    console.log("data", house);
  }, [house]);

  return (
    <Box p={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.title}>
          <FormLabel>Title</FormLabel>
          <Input
            defaultValue={house.data?.title}
            {...register("title", { required: true })}
          />
          {errors.title && (
            <FormErrorMessage>건물이름을 꼭 적어주세요</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={errors.description}>
          <FormLabel>Description</FormLabel>
          <Textarea
            defaultValue={house.data?.description}
            {...register("description", { required: true })}
          />
          {errors.description && (
            <FormErrorMessage>
              최소한의 설명이라도 꼭 적어주세요
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={errors.price}>
          <FormLabel>Price</FormLabel>
          <Input
            type="number"
            defaultValue={house.data?.price}
            {...register("price", { required: true })}
          />
          {errors.price && (
            <FormErrorMessage>매매가를 입력해주세요</FormErrorMessage>
          )}
        </FormControl>
        <Button type="submit" isLoading={house?.isLoading}>
          Update
        </Button>
      </form>
    </Box>
  );
};

export default HouseEdit;
