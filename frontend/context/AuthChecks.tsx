import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthProvider';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { useToast } from '@chakra-ui/react'

import { JWT_KEY, API_URL } from '@/config';

import HomeLogin from '@/pages/HomeLogin';
import Home from '@/pages/index';

import SiteSettings from '@/pages/SiteSettings/index';
import ManageAccounts from '@/pages/SiteSettings/ManageAccounts';

const AuthChecks = ({ children }: {children: React.ReactNode }) => {
    const router = useRouter();
    const { user, logout } = useAuth();
    const toast = useToast();

    const protectedRoutes = [
        { path: '/HomeLogin', component: HomeLogin, isAuthenticated: true, allowedRoles: ['Manager', 'Kitchen Porter'] },
        { path: '/', component: Home, isAuthenticated: true, allowedRoles: ['Kitchen Porter', 'Commis Chef', 'Line Cook', 'Station Chef', 'Second Chef', 'Executive Chef', 'Manager'] },

        { path: '/SiteSettings', component: SiteSettings, isAuthenticated: true, allowedRoles: ['Manager'] },
        { path: '/SiteSettings/ManageAccounts', component: ManageAccounts, isAuthenticated: true, allowedRoles: ['Manager'] }
    ];

    React.useEffect(() => {
        const fetchData = async () => {
            const isProtectedRoute = protectedRoutes.some((route) => route.path === router.pathname);

            const userJWT = Cookies.get('jwt');

            if(router.pathname === '/Login' && userJWT) {
                router.push("/");
                return;
            }

            if(router.pathname === '/Register' && userJWT) {
                router.push("/");
                return;
            }

            if(isProtectedRoute) {
                const userJWT = Cookies.get('jwt');
                const secretKey = JWT_KEY;

                if(!userJWT) {
                    router.push("/Login");
                    return;
                }

                const decodedToken = jwt.decode(userJWT, secretKey);
                const userRole = decodedToken && decodedToken.role;

                 // Reassure us that they didn't edited the token.
                const response = await axios.post(`${API_URL}/ValidateToken`, {
                    nameid: decodedToken.nameid,
                    role: decodedToken.role
                })
                .catch(error => {
                    console.log('Error:', error.message);
                    console.log('Stack trace:', error.stack);
                    if (error.response) {
                        console.log('Response data:', error.response.data);
                        console.log('Response status:', error.response.status);
                        if(error.response.status === 400) {
                            logout();
                            toast({
                                title: 'Session Expired',
                                description: 'Session has expired! Please log in.',
                                status: 'warning',
                                isClosable: true,
                            })
                            router.push('/Login');
                            return;
                        }
                    }
                });

                const hasAllowedRole = userRole && protectedRoutes.find((route) => route.path === router.pathname)?.allowedRoles.includes(userRole);

                if(!hasAllowedRole) {
                    router.push('/');
                }
            }
        };

        fetchData();
    }, [router.pathname]);

    return <>{children}</>;
}

export default AuthChecks