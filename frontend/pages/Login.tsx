import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { AuthContext, useAuth } from '@/context/AuthProvider'

import {
    Flex,
    Box,
    Text,
    Image,
    Input,
    Button,
    Link
  } from "@chakra-ui/react";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const router = useRouter();

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
            Login to your account
          </Text>

          <Box mb={{base: "4", md: "6"}}>
            <Text mb={{base: "2", md: "4"}} fontSize={{base: "sm", md: "md"}}>Username</Text>
            <Input type="email" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)}/>
          </Box>

          <Box mb={{base: "4", md: "6"}}>
            <Text mb={{base: "2", md: "4"}} fontSize={{base: "sm", md: "md"}}>Password</Text>
            <Input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </Box>

          <Button bg="blue.500" color="white" _hover={{bg: "blue.600"}} mb={{base: "4", md: "6"}} fontSize={{base: "sm", md: "md"}} onClick={() => login(username, password)}>LOGIN</Button>

          <Text mt={{base: "4", md: "6"}} fontSize={{base: "sm", md: "md"}}>

          </Text>
        </Box>
      </Flex>
    </Flex>
    )
}

export default Login;