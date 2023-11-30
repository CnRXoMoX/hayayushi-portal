import {
    Box,
    Text,
    Flex,
    Image
} from '@chakra-ui/react';

const Line = () => {
    return (
        <Box
            flex="1"
            h="2px"
            backgroundColor="#F5603C"
        >
        </Box>
    )
}

const DevelopedBy = () => {
    return (
        <Box width={{ md: "124px", "2xl": "227px"}}>
            <Text fontFamily="Inter" fontSize={{ "2xl": "25px" }} color="white">Developed by: Pyro Hayasaka & Red Hayasaka</Text>
        </Box>
    )
}

const DesignedBy = () => {
    return (
        <Box ml="2rem" mr="6rem" width={{ md: "124px", "2xl": "230px" }}>
            <Text fontFamily="Inter" fontSize={{ "2xl": "25px" }} color="white">Designed By:</Text>
            <Text fontFamily="Inter" fontSize={{ "2xl": "22px" }} color="white">Violet De Santis Yoshi</Text>
        </Box>
    )
}

const Footer = () => {
    return (
        <Box
            mt={5}
            h={{ md: "170px", "2xl": "258px" }}
            bgColor="#861616"
            w="100%"
            p={5}
        >
            <Line />
            <Flex mt={3} mb={3} align="center" justify="space-between">
                <Flex align="flex-start" align="center">
                    <Image boxSize={{ md: "62.5","2xl": "125px" }} width={{ md: "77px", "2xl" : "154px" }} src="https://media.discordapp.net/attachments/1171170655996223580/1177527001100328980/1-AMSP5NxYEUeykrCJIwU9FTVCyxuVTQwYmH9qWIE.png?ex=6572d47a&is=65605f7a&hm=061d82fd3754627d5cd1cf28a679e481c2bf45770fdcb0b623fda2d6e5fac07c&=&format=webp" alt="Hayayushi"/>
                    <Text fontSize={{ md: "25px", "2xl": "50px" }} fontFamily="Jockey One" color="white">Interested in Joining Us?</Text>
                </Flex>
                <Flex align="flex-center">
                    <Text fontSize={{ md: "45px", "2xl": "90px" }} fontFamily="Jockey One" color="#F5603C">APPLY NOW!</Text>
                </Flex>
                <Flex align="flex-end" alignItems="flex-start">
                    <DevelopedBy />
                    <DesignedBy />
                </Flex>
            </Flex>
            <Line />
            <Flex justify="center" mt={5}>
                <Text fontSize={{ md: "", "2xl": "25px"}} fontFamily="Roboto" color="white">© 2023 All rights reserved.</Text>
            </Flex>
        </Box>
    )
}

export default Footer