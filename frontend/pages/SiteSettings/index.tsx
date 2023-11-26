import { NextPage } from 'next';
import React, { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import https from 'https';

import {
    Flex,
    Center,
    Text,
    Container,
} from '@chakra-ui/react';

import AdminMenu from '@/components/site-settings-panel/site-panel';
import { API_URL, JWT_KEY } from '@/config';

const SiteSettings: NextPage = ({ data }) => {
    return (
        <Container maxW="container.xl">
            <Flex minHeight='100%' width='100%' justifyContent="center" alignItems='center'>
                <Text textAlign="center" fontWeight="bold" fontSize={32}>Site Admin Panel</Text>
            </Flex>
            <Flex minHeight='100%' width='100%'>
                <Text fontWeight="semibold" fontSize={24}>Welcome, {data}</Text>
            </Flex>
            <Flex minHeight='100%' width='100%' mt={10}>
                <AdminMenu />
            </Flex>
        </Container>
    )
}

export const getServerSideProps = async (context) => {
    try {
        const userJWT = context.req.headers.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/, '$1')
        if (!userJWT) {
            return {
                notFound: true,
            };
        }

        const secretKey = JWT_KEY;
        const decodedToken = await Promise.resolve(jwt.verify(userJWT, secretKey));
        const pk  = decodedToken.nameid;

        const response = await axios.post(`${API_URL}/FetchUserData`, {
            pk: pk,
        }, {
            httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        });

        const data = response.data.username;

        return {
            props: {
                data,
            },
        };
    } catch (error) {
        console.error('Error in getStaticProps:', error.message);

        return {
            props: {
                data: null,
            },
        };
    }
}

export default SiteSettings