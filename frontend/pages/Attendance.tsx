import React from 'react'
import { NextPage } from 'next'
import jwt from 'jsonwebtoken';
import axios from 'axios';
import https from 'https';

import {
    Container,
    Text,
    Button,
    Flex,
    Center
} from '@chakra-ui/react'
import Card from '@/components/Card/Card';
import CardHeader from '@/components/Card/CardHeader';
import CardBody from '@/components/Card/CardBody';

import AttendanceTable from '@/components/Attendance/Table';
import AttendanceButton from '@/components/Attendance/Button';

import { API_URL, JWT_KEY } from '@/config/';

const Attendace: NextPage = ({ data }) => {
    return (
        <Container maxW="container.xl">
            <Card mt={5}>
                <CardBody p="6px 0px 6px 0px">
                    <AttendanceTable userID={data} />
                    <AttendanceButton userID={data} />
                </CardBody>
            </Card>
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

export default Attendace