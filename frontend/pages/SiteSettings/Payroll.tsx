import { NextPage } from 'next';
import {
    Box,
    Text,
    Center
} from '@chakra-ui/react';

import PayrollPanel from '@/components/site-settings-panel/payroll-panel';

const Payroll: NextPage = () => {
    return (
        <Box m={10}>
            <Center mb={20}>
                <Text fontSize={{ base: "65px", "2xl": "85px" }} fontWeight="bold">Staff Payroll</Text>
            </Center>
            <PayrollPanel />
        </Box>
    )
}

export default Payroll