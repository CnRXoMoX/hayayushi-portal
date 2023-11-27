import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { AuthContext, useAuth } from '@/context/AuthProvider'
import { useToast } from '@chakra-ui/react'
import axios from 'axios';

import {
    Flex,
    Box,
    Text,
    Image,
    Input,
    Button,
    Link
  } from "@chakra-ui/react";

import { API_URL } from '@/config';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCpassword] = useState('');
    const { login } = useAuth();

    const router = useRouter();
    const toast = useToast();

    const handlerRegister = async () => {
        if(password !== cPassword) {
            toast({
                title: "Error",
                description: "Password does not match!",
                status: "error",
                isClosable: true
            });
            return;
        }

        const response = await axios.post(`${API_URL}/UserRegister`, {
            username: username,
            password: password
        })
        .then(response => {
          if(response.status === 200) {
            toast({
                title: 'Success',
                description: 'You\'re now registered!',
                status: 'success',
                isClosable: true
            });
            router.push("/Login");
          }
        })
        .catch(error => {
            console.log('Error:', error.message);
            console.log('Stack trace:', error.stack);
            if (error.response) {
                console.log('Response data:', error.response.data);
                console.log('Response status:', error.response.status);
            }
            if(error.response.status === 404) {
                toast({
                    title: "Error",
                    description: error.response.data,
                    status: 'error',
                    isClosable: true,
                })
            }
        });
    }

    return (
        <Flex h="100vh" flexDirection={{base: "column", md: "row"}} bg="url('https://media.discordapp.net/attachments/1064738100019990558/1102048279639900262/image.png?ex=656bddf0&is=655968f0&hm=5663f636ec57733007fb00c2212840483d3fac76f7bb59b9b5dd5d8c4824ca61&=&format=webp&width=841&height=473')" bgSize="cover" bgPosition="center">
      {/* Left side */}
      <Flex flexDir="column" justify="center" alignItems={{base: "center", md: "flex-end"}} flex={{base: "1", md: "1"}}>
        <Text fontSize={{base: "3xl", md: "4x1"}} fontWeight="bold" mb={{base: "6", md: "8"}} ml={{base: "0", md: "5"}} color="white">
            Hayayushi Job Portal
        </Text>
      </Flex>

      {/* Right side */}
      <Flex flexDir="column" justify="center" flex={{base: "1", md: "1"}} p={{base: "4", md: "12"}} mt={{base: "8", md: "0"}}>
        <Box bg="white" boxShadow="lg" p={{base: "4", md: "8"}}>
          <Text fontSize={{base: "2xl", md: "3xl"}} fontWeight="bold" mb={{base: "4", md: "8"}}>
            Register an account
          </Text>

          <Box mb={{base: "4", md: "6"}}>
            <Text mb={{base: "2", md: "4"}} fontSize={{base: "sm", md: "md"}}>Username</Text>
            <Input type="email" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)}/>
          </Box>

          <Box mb={{base: "4", md: "6"}}>
            <Text mb={{base: "2", md: "4"}} fontSize={{base: "sm", md: "md"}}>Password</Text>
            <Input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </Box>

          <Box mb={{base: "4", md: "6"}}>
            <Text mb={{base: "2", md: "4"}} fontSize={{base: "sm", md: "md"}}>Confirm Password</Text>
            <Input type="password" placeholder="Confirm password" value={cPassword} onChange={(e) => setCpassword(e.target.value)}/>
          </Box>

          <Button bg="blue.500" color="white" _hover={{bg: "blue.600"}} mb={{base: "4", md: "6"}} fontSize={{base: "sm", md: "md"}} onClick={handlerRegister}>Register</Button>

          <Text mt={{base: "4", md: "6"}} fontSize={{base: "sm", md: "md"}}>

          </Text>
        </Box>
      </Flex>
    </Flex>
    )
}

export default Login;