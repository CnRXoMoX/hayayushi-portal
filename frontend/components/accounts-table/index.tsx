import { useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import https from 'https';
import { useToast } from '@chakra-ui/react'


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
    Input
} from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';

import { API_URL } from '@/config';
import Card from '../Card/Card';
import CardHeader from '../Card/CardHeader';
import CardBody from '../Card/CardBody';
import TablesProjectRow from "./TablesProjectRow";
import TablesTableRow from "./TablesTableRow";

interface RoleItemProps {
    name: string;
}

const RoleItems: Array<RoleItemProps> = [
    { name: 'Manager' },
    { name: 'Executive Chef' },
    { name: 'Second Chef' },
    { name: 'Station Chef' },
    { name: 'Line Cook' },
    { name: 'Commis Chef' },
    { name: 'Kitchen Porter' }
];

const EditUserModal = ({ isOpen, onClose, userID, currentPage, onUpdateTable }) => {
    const [userName, setUsername] = useState(null);
    const [updatedUsername, setUpdatedUsername] = useState(null);
    const [role, setRole] = useState(null);
    const toast = useToast();

    const handleSaveAccount = async () => {
        const response = await axios.post(`${API_URL}/UpdateUserAccount`, {
            username: updatedUsername,
            role: role,
            pk: userID
        })
        .then(response => {
            if(response.status === 200) {
                toast({
                    title: 'User updated',
                    description: 'User has been updated!',
                    status: 'success',
                    isClosable: true
                });
            }
        })
        .catch(error => {
            console.log('Error:', error.message);
            console.log('Stack trace:', error.stack);
            if (error.response) {
                console.log('Response data:', error.response.data);
                console.log('Response status:', error.response.status);
                if(error.response.status === 400) {
                    toast({
                        title: 'Error!',
                        description: 'Database Error!',
                        status: 'error',
                        isClosable: true,
                    })
                    router.push('/');
                    return;
                }
            }
        });

        // Update the table
        onUpdateTable(currentPage);
    }

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    }

    useEffect(() => {
        async function fetchAsync() {
            const response = await axios.post(`${API_URL}/FetchUserData`, {
                pk: userID,
            })
            .then(response => {
                if(response.status === 200) {
                    setUsername(response.data.username);
                    setUpdatedUsername(response.data.username);
                    setRole(response.data.role);
                }
            });
        }

        if(isOpen && userID) { // Fetch only when it is opened and have a userID!
            fetchAsync();
        }
    }, [isOpen]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Editing '{userName}'</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Name:</Text>
                    <Input mb={5} type="text" placeholder="Enter username" value={updatedUsername} onChange={(e) => setUpdatedUsername(e.target.value)}/>
                    <Text>Role:</Text>
                    <Select value={role} onChange={handleRoleChange} mb={5}>
                        {RoleItems.map((roleLoop) => (
                                <option key={roleLoop.name} value={roleLoop.name}>{roleLoop.name}</option>
                            ))}
                    </Select>
                    <Button w="full" colorScheme="yellow" mb={5}>Reset Password</Button>
                    <Flex direction="row" justify="space-between">
                        <Button w="full" colorScheme="green" m={2} onClick={handleSaveAccount}>Save</Button>
                        <Button w="full" colorScheme="red" m={2}>Delete Account</Button>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

const AccountsList = () => {
    const [users, setUsers] = useState([]);
    const textColor = useColorModeValue("gray.700", "white");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const [editingUserId, setEditingUserID] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Added currentPage state
    const [totalPages, setTotalPages] = useState(1); // Added totalPages state
    const itemsPerPage = 10; // Adjust the number of items per page as needed

    const handleEdit = (userID) => {
        setEditingUserID(userID);
    }

    const handleCloseEdit = () => {
        setEditingUserID(null);
    }

    const updateTable = async (page = 1) => {
        try {
            const response = await axios.get(`${API_URL}/FetchAccounts?page=${page}`);
            setUsers(response.data.results);
            setTotalPages(Math.ceil(response.data.totalUsers / itemsPerPage));
        } catch(error) {
            console.error('Error fetching users', error);
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            updateTable(nextPage);
        }
    };

      const handlePrevPage = () => {
        if (currentPage > 1) {
            const prevPage = currentPage - 1;
            setCurrentPage(prevPage);
            updateTable(prevPage);
        }
    };

    useEffect(() => {
        const search = window.location.search;
        const parsed = queryString.parse(search);
        const page = parsed.page || 1;

        const fetchData = async () => {
            updateTable(page);
        }

        fetchData();
    }, []);

    return (
        <Flex direction="column">
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
                                <Th borderColor={borderColor} color="gray.400" >Role</Th>
                                <Th borderColor={borderColor} color="gray.400" >Pk</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {users.map(user => {
                                return (
                                    <TablesTableRow
                                        username={user.username}
                                        role={user.role}
                                        pk={user.pk}
                                        key={user.userid}
                                        onEdit={() => handleEdit(user.pk)}
                                    />
                                )
                            })}
                        </Tbody>
                    </Table>

                    <Flex justify="space-between" mt={4}>
                        <Button onClick={handlePrevPage} colorScheme="teal" disabled={currentPage === 1}>
                            Prev
                        </Button>
                        <Text>Page {currentPage} of {totalPages}</Text>
                        <Button onClick={handleNextPage} colorScheme="teal" disabled={currentPage === totalPages}>
                            Next
                        </Button>
                    </Flex>

                    <EditUserModal isOpen={!!editingUserId} onClose={handleCloseEdit} userID={editingUserId} currentPage={currentPage} onUpdateTable={(page) => updateTable(currentPage)} />
                </CardBody>
            </Card>
        </Flex>
    )
}

export default AccountsList