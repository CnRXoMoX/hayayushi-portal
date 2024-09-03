import React from 'react'
import { NextPage } from 'next'
import jwt from 'jsonwebtoken';
import axios from 'axios';
import https from 'https';
import { API_URL, JWT_KEY } from '@/config/';

import {
    Flex,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    Text,
    Box,
    Container,
    useColorModeValue
} from '@chakra-ui/react'

import SalesMenu from '@/components/sales-page/SalesCalculation'
import Card from '@/components/Card/Card'

const Home: NextPage = ({ data }) => {
    const textColor = useColorModeValue("gray.700", "white");

    return (
        <>
            <Box mb={24}>
                <SalesMenu userID={data} />
            </Box>
        </>
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

        const data = response.data.userid;

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

export default Home