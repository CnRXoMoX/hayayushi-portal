import { NextPage } from 'next';
import React, { useEffect } from 'react';
import axios from 'axios';
import https from 'https';

import {
    Box,
    Text,
    Center
} from '@chakra-ui/react';

import { API_URL } from '@/config';
import PayrollTable from '@/components/site-settings-panel/payroll-table';

const StaffPayout: NextPage = ({ data }) => {
    return (
        <Box m={10}>
            <PayrollTable dates={data} />
        </Box>
    )
}

export const getServerSideProps = async () => {
    try {
        const response = await axios.post(`${API_URL}/Payroll/GetDates`, {}, {
            httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        });

        const data = response.data;

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

export default StaffPayout