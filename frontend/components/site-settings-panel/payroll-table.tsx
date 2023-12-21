import { useState, useEffect } from 'react';
import axios from 'axios';

import {
    TableContainer,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    useColorModeValue,
    Flex,
    Text,
    Select,
    Button,
    Input,
    Center,
    Td,
} from '@chakra-ui/react'

import { API_URL } from '@/config';
import Card from '../Card/Card';
import CardHeader from '../Card/CardHeader';
import CardBody from '../Card/CardBody';
import CalculateAttendancePay from '@/utils/AttendancePay';
import formatTotalMinutes from '@/utils/formattedTime';

const PayrollTable = ({ dates }) =>  {
    const textColor = useColorModeValue("gray.700", "white");
    const borderColor = useColorModeValue("gray.200", "gray.600");

    const defaultDate = dates.length > 0 ? dates[dates.length - 1].formattedDate : "";
    const [date, setDate] = useState(defaultDate);
    const [payrollData, setPayrollData] = useState([]);
    const [filteredPayrollData, setFilteredPayrollData] = useState([]);
    const [searchUsername, setSearchUsername] = useState("");

    // SALARY

    useEffect(() => {
        const fetchPayrollData = async () => {
            try {
                const response = await axios.post(`${API_URL}/Payroll/GetDateAPayroll`, {
                    date: date
                });

                if (response.status === 200) {
                    setPayrollData(response.data);
                    setFilteredPayrollData(response.data);
                }
            } catch (error) {
                console.error('Error:', error.message);
                console.error('Stack trace:', error.stack);
            }
        };

        fetchPayrollData();
    }, [date]);

    const handleDateChange = async (event) => {
        setDate(event.target.value);
    }

    const handleSearch = (searchUsername) => {
        const filteredData = payrollData.filter((pdata) =>
            pdata.username.toLowerCase().startsWith(searchUsername.toLowerCase())
        );
        setFilteredPayrollData(filteredData);
    };

    return (
        <Flex direction="column">
            <Card overflowX={{ sm: "scroll", xl: "hidden"}} pb="0px">
                <CardHeader p="6px 0px 22px 0px">
                    <Center>
                        <Text fontSize={{ base: "36px", "2xl": "46px"}} color="#861616" fontWeight="bold" mb={10}>
                            Staff's Payroll
                        </Text>
                    </Center>

                    <Flex align="center" justify="space-between">
                        <Select value={date} onChange={handleDateChange} mb={5} width="30%" height={{base: "46px", "2xl": "68px"}} fontSize={{base: "26px", "2xl": "36px"}}>
                            {dates.map((date) => (
                                <option key={date} value={date.formattedDate}>{date.formattedDate}</option>
                            ))}
                        </Select>
                        <Input variant='flushed' placeholder='Search Name' onChange={(e) => handleSearch(e.target.value)} fontSize={{base: "26px" , "2xl": "36px"}} width="30%"/>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Table variant="simple" color={textColor}>
                        <Thead>
                            <Tr my=".8rem" pl="0px" color="#cc2525">
                                <Th pl="0px" borderColor={borderColor} color="#cc2525" fontSize={{ "2xl": "26px" }}>
                                    Username
                                </Th>
                                <Th borderColor={borderColor} color="#cc2525" fontSize={{ "2xl": "26px" }}>Rank</Th>
                                <Th borderColor={borderColor} color="#cc2525" fontSize={{ "2xl": "26px" }}>Attendance</Th>
                                <Th borderColor={borderColor} color="#cc2525" fontSize={{ "2xl": "26px" }}>Total Earnings</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {filteredPayrollData.map(pdata => {
                                return (
                                    <TablesTableRow
                                        username={pdata.username}
                                        userrank={pdata.rank}
                                        totalminutes={pdata.totalMinutes}
                                        key={pdata.id}
                                    />
                                )
                            })}
                        </Tbody>
                    </Table>
                </CardBody>
            </Card>
        </Flex>
    )
}

function TablesTableRow(props) {
    const { username, userrank, totalminutes } = props;
    const formatTime = formatTotalMinutes(totalminutes);
    const [totalSalary, setTotalSalary] = useState(null);
    const textColor = useColorModeValue("black", "white");
    const titleColor = useColorModeValue("gray.700", "white");
    const bgStatus = useColorModeValue("gray.400", "navy.900");
    const borderColor = useColorModeValue("gray.200", "gray.600");

    useEffect(() => {
        const calculateSalary = async () => {
          try {
            const attendanceSalary = await CalculateAttendancePay(userrank, totalminutes);
            setTotalSalary(attendanceSalary);
          } catch (error) {
            console.error("Error calculating attendance salary:", error.message);
          }
        };

        calculateSalary();
      }, [userrank, totalminutes]);

    return (
        <Tr>
            <Td
                minWidth={{ sm: "250px" }}
                pl="0px"
                borderColor={borderColor}
            >
                <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                <Text
                    fontSize={{ base: "md", "2xl": "xl" }}
                    color={textColor}
                    fontWeight="bold"
                    minWidth="100%"
                    >
                    {username}
                </Text>
                </Flex>
            </Td>

            <Td borderColor={borderColor}>
                <Text fontSize={{ base: "md", "2xl": "xl" }} color={textColor} fontWeight="bold">
                    {userrank}
                </Text>
            </Td>

            <Td borderColor={borderColor}>
                <Text fontSize={{ base: "md", "2xl": "xl" }} color={textColor} fontWeight="bold">
                    {formatTime}
                </Text>
            </Td>

            <Td borderColor={borderColor}>
                <Text fontSize={{ base: "md", "2xl": "xl" }} color="green" fontWeight="bold">
                    ${totalSalary}
                </Text>
            </Td>
        </Tr>
    );
}

export default PayrollTable