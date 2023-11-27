import React from 'react'
import { NextPage } from 'next'
import {
    Flex,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    Text,
    Container,
    useColorModeValue
} from '@chakra-ui/react'
import Card from '@/components/Card/Card'

const Home: NextPage = () => {
    const textColor = useColorModeValue("gray.700", "white");

    return (
        <Container maxW="container.xl">
            <Flex flexDirection="column" pt={{ base: "120px", md: "75px"}}>
                <SimpleGrid columns={{ sm: 1, md: 2}} spacing='24px' mb='20px'>
                    <Card minH='125px' bgColor="teal" borderRadius={10} p={5}>
                        <Flex direction="column">
                            <Flex flexDirection="row" align="center" justify="center" w="100%" mb="25px">
                                <Stat me="auto">
                                    <StatLabel fontSize='xs' color={textColor} fontWeight="bold" textTransform="uppercase">
                                        Top Production
                                    </StatLabel>
                                    <Flex>
                                        <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                                            Pyro Hayasaka
                                        </StatNumber>
                                    </Flex>
                                </Stat>
                            </Flex>
                        </Flex>
                        <Text color='white.150' fontSize='sm'>
                            <Text as='span' color='green.600' fontWeight='bold'>
                                +3.48%{" "}
                            </Text>
                            Since last week
                        </Text>
                    </Card>
                    <Card minH='125px' bgColor="teal" borderRadius={10} p={5}>
                        <Flex direction="column">
                            <Flex flexDirection="row" align="center" justify="center" w="100%" mb="25px">
                                <Stat me="auto">
                                    <StatLabel fontSize='xs' color={textColor} fontWeight="bold" textTransform="uppercase">
                                        Top Seller
                                    </StatLabel>
                                    <Flex>
                                        <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                                            Pyro Hayasaka
                                        </StatNumber>
                                    </Flex>
                                </Stat>
                            </Flex>
                        </Flex>
                        <Text color='white.150' fontSize='sm'>
                            <Text as='span' color='green.600' fontWeight='bold'>
                                +3.48%{" "}
                            </Text>
                            Since last week
                        </Text>
                    </Card>
                </SimpleGrid>
            </Flex>
        </Container>
    )
}

export default Home