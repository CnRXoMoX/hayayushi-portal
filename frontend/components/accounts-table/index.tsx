import { useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';

import {
    TableContainer,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    useColorModeValue,
    Flex,
    Text
} from '@chakra-ui/react'

import { API_URL } from '@/config';
import Card from '../Card/Card';
import CardHeader from '../Card/CardHeader';
import CardBody from '../Card/CardBody';
import TablesProjectRow from "./TablesProjectRow";
import TablesTableRow from "./TablesTableRow";

const AccountsList = () => {
    const [users, setUsers] = useState([]);
    const textColor = useColorModeValue("gray.700", "white");
    const borderColor = useColorModeValue("gray.200", "gray.600");

    useEffect(() => {
        const search = window.location.search;
        const parsed = queryString.parse(search);
        const page = parsed.page;

        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/FetchAccounts?page=${page}`);
                console.log(response.data.results);
                setUsers(response.data.results);
            } catch(error) {
                console.error('Error fetching users', error);
            }
        }

        fetchData();
    }, []);

    return (
        <Flex direction="column" pt={{ base: "120px", md: "75px"}}>
            <Card overflowX={{ sm: "scroll", xl: "hidden"}} pb="0px">
                <CardHeader p="6px 0px 22px 0px">
                    <Text fontSize="xl" color={textColor} fontWeight="bold">
                        User Accounts
                    </Text>
                </CardHeader>
                <CardBody>
                    <Table variant="simple" color={textColor}>
                        <Thead>
                            <Tr my=".8rem" pl="0px" color="gray.400">
                                <Th pl="0px" borderColor={borderColor} color="gray.400">
                                    Username
                                </Th>
                                <Th borderColor={borderColor} color="gray.400" >Pk</Th>
                                <Th borderColor={borderColor} color="gray.400" >Role</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {users.map(user => {
                                return (
                                    <TablesTableRow
                                        username={user.username}
                                        role={user.role}
                                        pk={user.pk}
                                        key={user.uid}
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

export default AccountsList