import {
    Box,
    Flex,
    Text,
    Image
} from '@chakra-ui/react';

import SmallHayayushiLogo from '@/public/Images/SmallHayayushiLogo.png/';

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

const Eclipse = () => {
    return (
        <Box
        w={{ md: "9px", "2xl": "18px" }}  // Adjust the width as needed
        h={{ md: "9px", "2xl": "18px" }} // Adjust the height as needed
        borderRadius="50% / 50%"
        backgroundColor="#F5603C"  // Set your desired background color
        mr={2}
        >
        </Box>
    )
}

const OurMenuHeader = () => {
    return (
        <>
            <Flex align="center">
                <Box border="4px" borderLeft={`solid ${12}px`} borderStyle="solid" borderColor="#F5603C" w={{ md: "24.5rem", "2xl": "35rem" }} ml="5rem" mr={{ md: "2rem", "2xl": "4rem"}}>
                    <Text fontSize={{ md: "42.5px", "2xl": "85px" }} fontFamily="Orbitron" p={2} fontWeight="bold" color="#F5603C">Our Menu</Text>
                </Box>
                <Eclipse />
                <Line />
            </Flex>
            <Flex align="center" mt={2}>
                <Text ml="5rem" fontSize={{ md: "xs", "2xl": "md"}} fontWeight="bold">*Our best sellers are marked with </Text>
                <Image src="https://media.discordapp.net/attachments/1175708838121447474/1179232869466525756/SmallHayayushiLogo.png?ex=65790931&is=65669431&hm=7e506c3a0f519d5b5a46a7a773a321c17ecd5bf667844b747a36d1e69d0ac4aa&=&format=webp&quality=lossless" boxSize={{ md: "20px", "2xl": "40px"}} width={{ md: "25px", "2xl": "50px" }} />
            </Flex>
            <Flex justifyContent="flex-end" mr={16} mt={{ md: "-3rem", "2xl": "-5rem"}}>
                <Box borderRadius="20px" backgroundColor="#F5603C" p={5} textAlign="center">
                    <Text fontFamily="Inter" fontSize={{ md: "16px", "2xl": "26px" }} width={{ md: "250px", "2xl": "300px"}} color="white">20% VAT is added per bulk order (100 up)</Text>
                </Box>
            </Flex>
        </>
    )
}

export default OurMenuHeader;