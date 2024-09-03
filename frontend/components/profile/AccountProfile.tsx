import {
    Flex,
    Text,
    Button,
    Avatar,
    Box,
    Input,
    useDisclosure
} from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'
import axios from 'axios';

import formatTotalMinutes from '@/utils/formattedTime';
import CalculateAttendancePay from '@/utils/AttendancePay';
import CalculateBonusSalary from '@/utils/SalesPay';
import { useEffect, useState } from 'react';
import { API_URL } from '@/config/';

const ChangePasswordModal = ({ isOpen, onClose, username}) => {
    const [currentPass, setCurrentPass] = useState(null);
    const [newPass, setNewPass] = useState(null);
    const [repeatNewPass, setRepeatPass] = useState(null);
    const toast = useToast();

    const handleChangePass = async () => {
        if(newPass !== repeatNewPass) {
            toast({
                title: "Error",
                description: "Password does not match!",
                status: "error",
                isClosable: true
            });
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/UserLogin`, {
                username: username,
                password: currentPass
            });

            if(response.status === 200) {
                try {
                    const changePassRes = await axios.post(`${API_URL}/UserChangePassword`, {
                        username: username,
                        password: newPass
                    });

                    if(changePassRes.status === 200) {
                        toast({
                            title: 'Success',
                            description: 'Changed Password!',
                            status: 'success',
                            isClosable: true
                        });
                        onClose();
                    }
                } catch(error) {
                    handleError(error, "Error changing password");
                }
            }
        } catch(error) {
            handleError(error, "Error verifying current password");
        }
    }

    const handleError = (error, defaultMessage) => {
        console.log('Error:', error.message);
        console.log('Stack trace:', error.stack);

        if (error.response) {
            console.log('Response data:', error.response.data);
            console.log('Response status:', error.response.status);
            if(error.response.data === "Username and Password does not match.") {
                toast({
                    title: "Error",
                    description: "Your current password is incorrect.",
                    status: 'error',
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Error",
                    description: error.response.data || defaultMessage,
                    status: 'error',
                    isClosable: true,
                });
            }
        } else {
            toast({
                title: "Error",
                description: defaultMessage,
                status: 'error',
                isClosable: true,
            });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Change Password</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Current Password:</Text>
                    <Input mb={5} type="password" placeholder="Enter password" value={currentPass} onChange={(e) => setCurrentPass(e.target.value)}/>
                    <Text>New Password:</Text>
                    <Input mb={5} type="password" placeholder="Enter new password" value={newPass} onChange={(e) => setNewPass(e.target.value)}/>
                    <Text>Repeat new Password:</Text>
                    <Input mb={5} type="password" placeholder="Repeat new password" value={repeatNewPass} onChange={(e) => setRepeatPass(e.target.value)}/>
                    <Button colorScheme="green" w="full" mb={5} onClick={handleChangePass}>Change Password</Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}


const TotalAttendanceCard = ({ date, rank, totalMinutes }) => {
    const [payout, setPayout] = useState(0);

    useEffect(() => {
        const calculateSalary = async () => {
          try {
            const attendanceSalary = await CalculateAttendancePay(rank, totalMinutes);
            setPayout(attendanceSalary);
          } catch (error) {
            console.error("Error calculating attendance salary:", error.message);
          }
        };

        calculateSalary();
      }, [totalMinutes]);

    return (
        <Box border="solid" borderRadius="20px" m="1rem" p="1rem" w="50%" bgColor="#490606" borderColor="gray.300" borderWidth="2px">
            <Text fontSize="22px" fontWeight="bold" fontFamily="Inter" color="white" mb={5}>Attendance for {date}</Text>
            <Flex justify="space-between" mb={2}>
                <Flex align="flex-start">
                    <Text fontFamily="Inter" color="white">Total Hours: {formatTotalMinutes(totalMinutes)}</Text>
                </Flex>
                <Flex align="flex-end">
                    <Text fontFamily="Inter" color="white">Payout: ${new Intl.NumberFormat().format(payout)}</Text>
                </Flex>
            </Flex>
        </Box>
    )
}

const TotalSalesCard = ({ date, totalSales }) => {
    const [payout, setPayout] = useState(0);

    useEffect(() => {
        const calculateSalary = async () => {
          try {
            const s_bonusSalary = await CalculateBonusSalary(totalSales);
            setPayout(s_bonusSalary);
          } catch (error) {
            console.error("Error calculating attendance salary:", error.message);
          }
        };

        calculateSalary();
      }, [totalSales]);

    return (
        <Box border="solid" borderRadius="20px" p="1rem" m="1rem" w="50%" bgColor="#490606" borderColor="gray.300" borderWidth="2px">
            <Text fontSize="22px" fontWeight="bold" fontFamily="Inter" color="white" mb={5}>Sales for {date}</Text>
            <Flex justify="space-between" mb={2}>
                <Flex align="flex-start">
                    <Text fontFamily="Inter" color="white">Total Sales: ${new Intl.NumberFormat().format(totalSales)}</Text>
                </Flex>
                <Flex align="flex-end">
                    <Text fontFamily="Inter" color="white">Bonus Payout: ${new Intl.NumberFormat().format(payout)}</Text>
                </Flex>
            </Flex>
        </Box>
    )
}

const ProfileCard = ({ username, rank, userid, toggleChangePass }) => {
    const [totalSalary, setTotalSalary] = useState(null);

    useEffect(() => {
        const calculateSalary = async () => {
            try {
                const response = await axios.post(`${API_URL}/FetchAccountTotalPayout`, {
                    userID: userid,
                });

                if(response.status === 200) {
                    const attendanceSalary = await CalculateAttendancePay(rank, response.data.totalMinutes);
                    const s_bonusSalary = await CalculateBonusSalary(response.data.totalSales);
                    console.log(response.data);
                    console.log(`USERID: ${userid}`)
                    setTotalSalary(attendanceSalary + s_bonusSalary);
                }
            } catch (error) {
                console.error("Error calculating attendance salary:", error.message);
            }
        };

        calculateSalary();
    }, [rank, userid]);

    return (
        <Box border="solid" borderRadius="20px" m="1rem" bgColor="#490606" borderColor="gray.300" borderWidth="2px">
            <Flex m="1rem" mb="2rem" direction="row" justify="space-between">
                <Flex align="flex-start">
                    <Avatar name={username} size="xl" mr="2rem"/>
                    <Box>
                        <Text fontSize="26px" fontWeight="bold" fontFamily="Inter" color="white">{username}</Text>
                        <Text fontSize="16px" fontFamily="Inter" color="white">{rank}</Text>
                        <Text fontSize="16px" mt={5} fontFamily="Inter" color="white">Available Balance: ${new Intl.NumberFormat().format(totalSalary)}</Text>
                    </Box>
                </Flex>
                <Flex align="flex-end" alignItems="flex-start">
                    <Button colorScheme="orange" onClick={toggleChangePass}>Change Password</Button>
                </Flex>
            </Flex>
        </Box>
    )
}

const AccountProfile = ({ data }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        console.log(data);
    })
    return (
        <Box>
            <ProfileCard username={data.username} rank={data.rank} userid={data.userID} toggleChangePass={onOpen}/>
            <Flex>
                <TotalAttendanceCard date={data.formattedDate} rank={data.rank} totalMinutes={data.totalMinutes}/>
                <TotalSalesCard date={data.formattedDate} totalSales={data.totalSales}/>
            </Flex>
            <ChangePasswordModal isOpen={isOpen} onClose={onClose} username={data.username}/>
        </Box>
    )
}

export default AccountProfile;