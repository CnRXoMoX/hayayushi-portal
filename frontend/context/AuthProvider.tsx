import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Router, useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { API_URL } from '@/config';
import { useToast } from '@chakra-ui/react'

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const toast = useToast();

    React.useEffect(() => {
        const storedUser = Cookies.get('jwt');
        if(storedUser) {
            setUser(storedUser);
        }
    })

    const login = async (username, password) => {
        const response = await axios.post(`${API_URL}/UserLogin`, {
            username: username,
            password: password
        })
        .then(response => {
          if(response.status === 200) {
            toast({
                title: 'Success',
                description: 'Logged in!',
                status: 'success',
                isClosable: true
            });
            setUser(response.data.token);
            Cookies.set('jwt', response.data.token, {expires: 1, path: "/"});
            Cookies.set('userName', response.data.userName, {expires: 1, path: "/"});
            router.push("/");
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
    };

    const logout = () => {
        toast({
            title: 'Success',
            description: 'Logged out!',
            status: 'success',
            isClosable: true
        });
        Cookies.remove('jwt', { path: "/" });
        setUser(null);
        router.push("/Login");
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}