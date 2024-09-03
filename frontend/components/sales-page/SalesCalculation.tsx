import {
    Box,
    Text,
    Image,
    Flex,
    Tooltip,
    Center,
    Button,
    Input,
    Spacer
} from '@chakra-ui/react';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react'

import { API_URL, JWT_KEY } from '@/config/';

interface LinkItemProps {
    name: string;
    price: string;
    info: string;
    isBestSeller: boolean;
    image: string;
}

const MainCourseItems: Array<LinkItemProps> = [
    { name: 'Ramen', price: "1000", info: "Replenishes 75% Hunger and Thirst.", image: "/Images/MainCourse/ramen.png", quantity: 0 },
    { name: 'Takoyaki', price: "1500", info: "Replenishes 75% Hunger and Thirst + 50% Armor", image: "/Images/MainCourse/takoyaki.png", quantity: 0 },
    { name: 'Tonkatsu', price: "500", info: "Replenishes Hunger.", image: "/Images/MainCourse/tonkatsu.png", quantity: 0 },
    { name: 'Tempura', price: "500", info: "Replenishes Hunger.", image: "/Images/MainCourse/tempura.png", quantity: 0 },
    { name: 'Sushi', price: "1000", info: "Reduces Stress.", image: "/Images/MainCourse/sushi.png", quantity: 0 },

    { name: 'Jakult', price: "500", info: "Replenishes Thirst.", image: "/Images/DrinksCourse/jakult.png", quantity: 0 },
    { name: 'Green Tea', price: "1000", info: "Reduces Stress.", image: "/Images/DrinksCourse/tea.png", quantity: 0 },
    { name: 'Soju', price: "1500", info: "Temporary Speed Boost. (6-8 sec.)", image: "/Images/DrinksCourse/soju.png", quantity: 0 },
    { name: 'Ice Cream', price: "500", info: "Reduces a larger amount of stress but makes you thirsty.", image: "/Images/DrinksCourse/icecream.png", quantity: 0 }
]

const MenuItemCard = ({ index, price, image, name, isBestSeller, info, onQuantityChange }) => {
    const [menuItems, setMenuItems] = useState(MainCourseItems);
    const updatedItems = [...menuItems];

    const decreaseQuantity = (index) => {
        if (updatedItems[index].quantity >= 1) {
            updatedItems[index].quantity -= 1;
            setMenuItems(updatedItems);
        }
    };

    const increaseQuantity = (index) => {
        updatedItems[index].quantity += 1;
        setMenuItems(updatedItems);
    };

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(event.target.value) || 0;
        updatedItems[index].quantity = newQuantity;
        setMenuItems(updatedItems);
    };

    return (
        <Box
            bgColor="#490606"
            height={{ md: "230px", "2xl": "300px"}}
            width={{ md: "179px", "2xl": "258px"}}
            borderRadius="1.5rem"
            borderWidth="2px" // Set the border width
            borderColor="gray.300" // Set the border color
            boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
            p={3}
            mb={{ md: "0px", "2xl": "23px" }}
            text-align="center"
        >
            <Flex justify="center" mt={{ md: "16px", "2xl": "16px"}}>
                <Image
                    src={image}
                    boxSize={{ md: "95px", "2xl": "125px" }}
                    width={{ md: "125px", "2xl": "125px" }}
                />
            </Flex>
            <Center>
                <Flex align="center" justify="space-between" mt={{ md: "24px", "2xl": "16px" }}>
                    <Text fontSize={{ md: "12", "2xl": "24px" }} fontFamily="Inter" color="white">₱ {price}</Text>
                </Flex>
            </Center>
            <Center>
                <Text fontSize={{ md: "12px", "2xl": "24px" }} fontFamily="JejuHallasan" color="white">{name}</Text>
            </Center>
            <Center>
                <Button onClick={() => decreaseQuantity(index)} color="white" fontWeight="bold" bgColor="#490606" fontSize={{"2xl": "26px"}} _hover={{
                    bg: "#490606",
                }}>-</Button>
                <Input textAlign="center" fontWeight="bold" size='xs' borderRadius={100} placeholderTextColor="white" placeholder='Quantity' onChange={handleQuantityChange} value={updatedItems[index].quantity} type="number" color="white" bgColor="#F5603C" borderColor="#F5603C"/>
                <Button onClick={() => increaseQuantity(index)} color="white" fontWeight="bold" bgColor="#490606" fontSize={{ "2xl": "26px"}} _hover={{
                    bg: "#490606",
                }}>+</Button>
            </Center>
        </Box>
    )
}

const SalesMenu = ({ userID }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [menuItems, setMenuItems] = useState(MainCourseItems);
    const [totalPrice, setTotalPrice] = useState(null);
    const [saleContext, setSaleContext] = useState(null);
    const toast = useToast();

    useEffect(() => {

        const context = menuItems
            .filter(item => item.quantity > 0)
            .map(item => `${item.name}: ${item.quantity}pcs`)
            .join(', ');


        setSaleContext(context);
    }, [menuItems]);

    const handleQuantityChange = (index, newQuantity) => {
        const updatedItems = [...menuItems];
        updatedItems[index].quantity = newQuantity;
        setMenuItems(updatedItems);
        console.log(`Item: ${updatedItems[index].name}, Price: ${updatedItems[index].quantity}`);
    };

    const calculateTotal = () => {
        const totalPrice1 = menuItems.reduce((acc, item) => acc + (parseInt(item.price) * item.quantity), 0);
        setTotalPrice(totalPrice1);
        onOpen();
    };

    const AddReciept = async () => {
        console.log(`UserID: ${userID} Total: ${totalPrice}`);
        console.log(saleContext);
        const response = await axios.post(`${API_URL}/AddSales`, {
            userID: userID,
            saleContext: saleContext,
            totalSale: totalPrice
        })
        .then(response => {
            if(response.status === 200) {
                toast({
                    title: 'Success',
                    description: 'Reciept added to database.',
                    status: 'success',
                    isClosable: true
                });
            }
        })
        .catch(error => {
            console.log('Error:', error.message);
            console.log('Stack trace:', error.stack);
            console.log('Error Response:', error.response);
            if (error.response) {
                console.log('Response data:', error.response.data);
                console.log('Response status:', error.response.status);
            }
            if(error.status === 404) {
                toast({
                    title: "Error",
                    description: error.response.data,
                    status: 'error',
                    isClosable: true,
                })
            }
        })
    }

    return (
        <>
            <Box
            m={{"2xl": "1rem" }}
            ml={{md: "10px"}}
            gridTemplateColumns="repeat(5, 1fr)"
            gridTemplateRows="repeat(3, auto)"
            gap={4}
            display="grid"
            >
                {menuItems.map((item, index) => (
                    <MenuItemCard key={index} index={index} name={item.name} info={item.info} price={item.price} isBestSeller={item.isBestSeller} image={item.image} quantity={item.quantity}/>
                ))}
            </Box>
            <Flex justifyContent="center">
                <Button onClick={calculateTotal} colorScheme="green" fontSize={{ "2xl": "36px"}} size="lg">Calculate Total</Button>
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize={{ "2xl":"35px"}} fontWeight="bold">Hayayushi Reciept</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box mb="10px">
                            <Text fontSize={{ "2xl": "30px"}} fontWeight="bold">Order List:</Text>
                            {menuItems.filter(item => item.quantity > 0).map((item, index) => {
                                return(
                                    <Text fontSize={{ "2xl": "26px"}}>
                                        {item.name}: {item.quantity}pcs (${(item.quantity * item.price)})
                                    </Text>
                                )
                            })}
                        </Box>
                        <Spacer />
                        <Text fontSize={{ "2xl": "30px"}} fontWeight="bold">Total Price: ${totalPrice}</Text>
                    </ModalBody>

                    <ModalFooter display="block">
                        <Text color="red" fontWeight="bold" mb={3}>Note: Click the add reciept to add it to your sales</Text>
                        <Box display="flex" justifyContent="center">
                            <Button onClick={AddReciept}colorScheme="green" fontSize={{"2xl": "26px"}} size="lg">Add Reciept</Button>
                        </Box>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default SalesMenu;