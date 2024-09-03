import { useEffect, useState } from 'react'
import axios from 'axios';

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text,
    Button,
    Flex,
    Center,

    useColorModeValue
} from '@chakra-ui/react'

import { API_URL } from '@/config/';

const AttendanceTableRow = ({ clockIn, clockOut, totalMinutes }) => {
    const textColor = useColorModeValue("gray.500", "white");
    const titleColor = useColorModeValue("gray.700", "white");
    const bgStatus = useColorModeValue("gray.400", "navy.900");
    const borderColor = useColorModeValue("gray.200", "gray.600");

    return (
        <Tr>
            <Td
            minWidth={{ sm: "250px" }}
            pl="0px"
            borderColor={borderColor}
            >
                <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                    <Text
                        fontSize="md"
                        color={titleColor}
                        fontWeight="bold"
                        minWidth="100%"
                    >
                        {clockIn}
                    </Text>
                </Flex>
            </Td>

            <Td borderColor={borderColor}>
                <Text fontSize="md" color={textColor} fontWeight="bold">
                    {clockOut}
                </Text>
            </Td>
            <Td borderColor={borderColor}>
                <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
                    {totalMinutes}
                </Text>
            </Td>
        </Tr>
    )
}

const AttendanceTable = ({ userID }) => {
    const textColor = useColorModeValue("gray.700", "white");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const [attendanceData, setAttendanceData] = useState([]);
    const [overallMinutes, setOverallMinutes] = useState(null);

    useEffect(() => {
        console.log(userID);
        async function fetchData() {
            await axios.post(`${API_URL}/Attendance/AttendanceTable`, {
                userid: userID,
            }).then(response => {
                if(response.status === 200) {
                    console.log(response.data);
                    setAttendanceData(response.data.results);
                    setOverallMinutes(response.data.totalMinutes[0]?.totalMinutes || 0);
                }
            })
        }

        fetchData();
    }, []);

    return (
        <>
            <Center>
                <Text fontSize="xl" fontWeight="bold">Overall Total: {overallMinutes} Minutes</Text>
            </Center>
            <Text>Showing last 5 attendance:</Text>
            <Table variant="simple" color={textColor}>
                <Thead>
                    <Tr my=".8rem" pl="0px" color="gray.400">
                        <Th pl="0px" borderColor={borderColor} color="gray.400">
                            Clock In
                        </Th>
                        <Th borderColor={borderColor} color="gray.400" >Clock Out</Th>
                        <Th borderColor={borderColor} color="gray.400" >Total Minutes</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {attendanceData.map(attendance => {
                        return (
                            <AttendanceTableRow
                                clockIn={attendance.ClockIn}
                                clockOut={attendance.ClockOut}
                                totalMinutes={attendance.totalMinutes}
                                key={attendance}
                            />
                        )
                    })}
                </Tbody>
            </Table>
        </>
    )
}

export default AttendanceTable