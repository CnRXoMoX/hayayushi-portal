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

import AccountProfile from '@/components/profile/AccountProfile';

import { API_URL, JWT_KEY } from '@/config/';
import withAuth from '@/context/withAuth';

const Account: NextPage = ({ data }) => {

    return (
        <>
            <AccountProfile data={data} />
        </>
    )
}

export const getServerSideProps = withAuth(async (context, decodedToken) => {
    const pk = decodedToken.nameid;
    const response = await axios.post(`${API_URL}/FetchAccountStats`, {
        userID: pk,
    }, {
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });

    const data = response.data;
    console.log(data.username);
    return {
        props: {
            data,
        },
    };
})

export default Account