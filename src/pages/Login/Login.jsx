// import React from "react";
// import {
//   Box,
//   Input,
//   Button,
//   Heading,
//   Container,
//   VStack,
//   InputGroup,
//   InputLeftElement,
//   Text,
//   HStack,
//   useToast,
// } from "@chakra-ui/react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useForm } from "react-hook-form";
// import { FaComment, FaLock, FaNapster, FaUserAlt } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import SocialLogin from "../../components/Button/SocialLogin";
// import { login } from "../../services/api";

// function Login() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     watch,
//   } = useForm();
//   const toast = useToast();
//   const mutation = useMutation(login, {
//     onMutate: (data) => {
//       toast({
//         title: "로그인중...",
//         description: `기다리세요.`,
//         status: "loading",
//         position: "top",
//       });
//     },
//     onSuccess: (data) => {
//       toast.update({
//         title: "Log In Success",
//         description: `Welcome!`,
//         status: "success",
//         position: "top",
//       });
//     },
//     onError: () => {
//       toast.update({
//         title: "로그인 실패",
//         description: `아이디 또는 비밀번호가 잘못되었습니다.`,
//         status: "error",
//         position: "top",
//       });
//     },
//   });
//   const onSubmit = ({ username, password }) => {
//     mutation.mutate({ username, password });
//   };
//   // const NaverIcon = () => {
//   //   return (
//   //     <Text fontSize={"md"} color="white">
//   //       N
//   //     </Text>
//   //   );
//   // };
//   return (
//     <Container
//       display={"flex"}
//       // border={"1px solid blue"}
//       height={"80vh"}
//       alignItems={"center"}
//       justifyContent={"center"}
//     >
//       <VStack
//         spacing={"7"}
//         as="form"
//         w={"50%"}
//         width={"80%"}
//         borderRadius={"30px"}
//         p={"10"}
//         mt={10}
//         onSubmit={handleSubmit(onSubmit)}
//       >
//         <Heading>LogIn</Heading>
//         <InputGroup>
//           <InputLeftElement
//             children={
//               <Box color="gray.500">
//                 <FaUserAlt />
//               </Box>
//             }
//           />
//           <Input
//             required
//             isInvalid={Boolean(errors.username?.message)}
//             {...register("username", { required: "아이디를 입력하세요." })}
//             variant={"outline"}
//             focusBorderColor="gray.300"
//             placeholder="아이디"
//           />
//         </InputGroup>
//         <InputGroup>
//           <InputLeftElement
//             children={
//               <Box color="gray.500">
//                 <FaLock />
//               </Box>
//             }
//           />
//           <Input
//             required
//             type={"password"}
//             isInvalid={Boolean(errors.username?.message)}
//             {...register("password", { required: "비밀번호를 압력하세요." })}
//             variant={"outline"}
//             focusBorderColor="gray.300"
//             placeholder="비밀번호"
//           />
//         </InputGroup>
//         <Button
//           isLoading={mutation.isLoading}
//           type="submit"
//           mt="4"
//           bg={"#ff404c"}
//           _hover={{
//             backgroundColor: "#ff7982",
//           }}
//           color={"white"}
//           width={"100%"}
//         >
//           로그인
//         </Button>
//         <HStack pl={5} pr={5} w={"100%"} justifyContent={"space-around"}>
//           <Link>아이디 찾기</Link>
//           <Text>|</Text>
//           <Link>비밀번호 찾기</Link>
//           <Text>|</Text>
//           <Link to={"/signup"}>회원가입</Link>
//         </HStack>
//         <SocialLogin />
//       </VStack>
//     </Container>
//   );
// }

// export default Login;
