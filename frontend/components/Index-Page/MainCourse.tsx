import {
    Box,
    Text,
    Image,
    Flex,
    Tooltip
} from '@chakra-ui/react';

interface LinkItemProps {
    name: string;
    price: string;
    info: string;
    isBestSeller: boolean;
    image: string;
}

const MainCourseItems: Array<LinkItemProps> = [
    { name: 'Ramen', price: "1000", info: "Replenishes 75% Hunger and Thirst.",isBestSeller: true, image: "https://media.discordapp.net/attachments/1175708838121447474/1179470006782800084/pngegg.png?ex=6579e60b&is=6567710b&hm=2ddcc83663192165d719f6da6b8ccd30d9d40aef7038d0001e9760ec54ee9f99&=&format=webp" },
    { name: 'Tonkatsu', price: "500", info: "Replenishes Hunger.", isBestSeller: false, image: "https://media.discordapp.net/attachments/1175708838121447474/1179470007114158240/pngegg.png?ex=6579e60b&is=6567710b&hm=b637bb54eb636e3441a599242ac202ca1ea19121c31e39657e1a0ed06fefc7b0&=&format=webp"},
    { name: 'Tempura', price: "500", info: "Replenishes Hunger.", isBestSeller: false, image: "https://media.discordapp.net/attachments/1175708838121447474/1179470007554539562/pngegg_3.png?ex=6579e60b&is=6567710b&hm=48c51fd0b8fd258e9e6e417aad7200adf0d4783b7f1ab772c35e5484064f7f0a&=&format=webp"},
    { name: 'Sushi', price: "1000", info: "Reduces Stress.", isBestSeller: true, image: "https://media.discordapp.net/attachments/1175708838121447474/1179470008666042419/pngegg_2.png?ex=6579e60b&is=6567710b&hm=32accd65c4f3dd458d2470dfb036ac76a8966084f2e5e3daec31b196b3a8dd3a&=&format=webp"}
]

const MenuItemCard = ({ price, image, name, isBestSeller, info }) => {
    return (
        <Box
            bgColor="#490606"
            height={{ md: "255px", "2xl": "510px"}}
            width={{ md: "179px", "2xl": "358px"}}
            borderRadius="1.5rem"
            borderWidth="2px" // Set the border width
            borderColor="gray.300" // Set the border color
            boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
            p={3}
        >
            {isBestSeller && (
                <Image boxSize={{ "2xl": "46px" }} width={{ "2xl": "65px" }} src="https://media.discordapp.net/attachments/1175708838121447474/1179232869466525756/SmallHayayushiLogo.png?ex=65790931&is=65669431&hm=7e506c3a0f519d5b5a46a7a773a321c17ecd5bf667844b747a36d1e69d0ac4aa&=&format=webp&quality=lossless" />
            )}
            <Flex justify="center" mt={{ md: !isBestSeller ? "23px" : undefined, "2xl": !isBestSeller ? "46px" : undefined}}>
                <Image
                    src={image}
                    boxSize={{ md: "125px", "2xl": "250px" }}
                    width={{ md: "125px", "2xl": "250px" }}
                />
            </Flex>
            <Flex align="center" justify="space-between" mt={{ md: "24px", "2xl": "56px" }}>
                <Text fontSize={{ "2xl": "36px" }} fontFamily="Inter" color="white" ml={3}>₱ {price}</Text>
                <Tooltip label={info} fontSize={{ md: "10px", "2xl": "20px"}} placement="top" borderRadius="8px" p={2} hasArrow>
                    <Image
                        mt="-12px"
                        boxSize={{ md: "40px", "2xl": "80px"}}
                        width={{ md: "15px", "2xl": "30px"}}
                        src="https://cdn.discordapp.com/attachments/1175708838121447474/1179522597176750171/Info.png?ex=657a1705&is=6567a205&hm=e85d7ab80073c29d5c086b7d2713327e95fa2a027b12aa628fd1d46be3432ede&"
                    />
                </Tooltip>
            </Flex>
            <Text fontSize={{ "2xl": "48px" }} fontFamily="JejuHallasan" color="white" ml={3}>{name}</Text>
        </Box>
    )
}

const MainCourseMenu = () => {
    return (
        <Flex flexWrap="wrap" justify="space-between" m={{ md: "20px", "2xl": "4rem"}} spacing={{ "2xl": "6px" }}>
            {MainCourseItems.map((item) => (
                <MenuItemCard name={item.name} info={item.info} price={item.price} isBestSeller={item.isBestSeller} image={item.image} />
            ))}
        </Flex>
    )
}

const MainCourse = () => {
    return (
        <>
            <Flex align="center" mb={10}>
                <Box
                    bgColor="#F5603C"
                    p={5}
                    h={{ md: "47.5px", "2xl": "95px" }}
                    w="392.33px"
                >
                    <Text fontFamily="Orbitron" fontSize={{ "2xl": "35px" }} fontWeight="bold" color="white">MAIN COURSE</Text>
                </Box>
                <Box
                    bgColor="#F5603C"
                    h={{ md: "47.5px", "2xl": "95px" }}
                    w="15px"
                    ml={2}
                >
                </Box>
            </Flex>
            <MainCourseMenu />
        </>
    )
}

export default MainCourse;