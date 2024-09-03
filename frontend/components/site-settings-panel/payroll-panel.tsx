import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react'

import {
    Button,
    Center,
    Text,
    Box,
    Flex,
    Input,
} from '@chakra-ui/react'

import CalculateAttendance from '@/api/attendanceCalculation';

const PayrollPanel = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const toast = useToast();

    const handlePayroll = async () => {
        if(startDate === null) {
            toast({
                title: "Error",
                description: "You must put a date where to start calculation. (Start Date)",
                status: 'error',
                isClosable: true,
            })
            return;
        }

        if(endDate === null) {
            toast({
                title: "Error",
                description: "You must put a date where to end calculation. (End Date)",
                status: 'error',
                isClosable: true,
            })
            return;
        }

        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);

        if (startDateObj > endDateObj) {
            console.log('startDate is later than endDate');
            toast({
                title: "Error",
                description: "Start date is later than end date",
                status: 'error',
                isClosable: true,
            })
            return;
        }

        const calculateAttendance = await CalculateAttendance(startDate, endDate);
        if(!calculateAttendance) {
            toast({
                title: "Error",
                description: "Contact Pyro about this.",
                status: 'error',
                isClosable: true,
            })
            return;
        }

        toast({
            title: 'Success',
            description: `Created Payroll on dates: ${startDate} - ${endDate}!`,
            status: 'success',
            isClosable: true
        });
    }

    const handleStartDate = (event) => {
        setStartDate(event.target.value);
    }

    const handleEndDate = (event) => {
        setEndDate(event.target.value);
    }

    return (
        <>
            <Flex align="center" justify="space-between" mb={5}>
                <Box align="flex-start" align="center">
                    <Text fontSize={{ "2xl": "26px" }} fontWeight="bold">Start Date:</Text>
                    <Input
                        placeholder="Select Date and Time"
                        size="lg"
                        fontSize={{ base: "26px", "2xl": "36px" }}
                        height="56px"
                        type="date"
                        value={startDate || ''}
                        onChange={handleStartDate}
                    />
                </Box>
                <Box align="flex-end" align="center">
                    <Text fontSize={{ "2xl": "26px" }} fontWeight="bold">End Date:</Text>
                    <Input
                        placeholder="Select Date and Time"
                        size="lg"
                        fontSize={{ base: "26px", "2xl": "36px" }}
                        height="56px"
                        type="date"
                        value={endDate || ''}
                        onChange={handleEndDate}
                    />
                </Box>
            </Flex>
            <Center>
                <Button bgColor="#F5603C" p={10} w="100%" fontWeight="bold" color="white" fontSize={{ base: "26px", "2xl": "36px" }} onClick={handlePayroll}>
                    Calculate Payroll / Cut Off
                </Button>
            </Center>
        </>
    )
}

export default PayrollPanel