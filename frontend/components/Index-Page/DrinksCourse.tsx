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

const DrinkCourseItems: Array<LinkItemProps> = [
    { name: 'Jakult', price: "500", info: "Replenishes Thirst.", isBestSeller: true, image: "https://media.discordapp.net/attachments/1175708838121447474/1179470009710411816/f653e5db0f02dc5bfb67a335a2dd3b6b-removebg-preview.png?ex=6579e60b&is=6567710b&hm=29e1cf70bbbcfd9720bc3aac99ffa5c75824e5483185678f41008c0cbafde36f&=&format=webp" },
    { name: 'Green Tea', price: "1000", info: "Reduces Stress.", isBestSeller: false, image: "https://media.discordapp.net/attachments/1175708838121447474/1179470010578632765/pngegg.png?ex=6579e60c&is=6567710c&hm=5d354833572187b3788d2fd60cc6477c09661cb013ee4c1940c9c1f7ef2c5921&=&format=webp"},
    { name: 'Soju', price: "1500", info: "Temporary Speed Boost. (6-8 sec.)", isBestSeller: false, image: "https://media.discordapp.net/attachments/1175708838121447474/1179470009332945017/SOJU.png?ex=6579e60b&is=6567710b&hm=5bd7ab3d835d747decd431b9bfb4ca477ee551acd1c6b3cc564e1e29d795ba2e&=&format=webp"},
    { name: 'Matcha Ice Cream', price: "500", info: "Reduces a larger amount of stress but makes you thirsty.", isBestSeller: true, image: "https://media.discordapp.net/attachments/1175708838121447474/1179470010117279774/pngegg.png?ex=6579e60b&is=6567710b&hm=eb62a2667ed5c934f740014a08631cd6ced494a4c782330e0f1f62fb16b012a1&=&format=webp"}
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
                    boxSize={{ md: "125px", "2xl": name === "Jakult" || name === "Soju" ? "250px" : "250px"}}
                    width={{ md: "100px", "2xl":  name === "Jakult" || name === "Soju" ? "150px" : "250px" }}
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
            <Text fontSize={{ "2xl": name === "Matcha Ice Cream" ? "35px" : "48px" }} fontFamily="JejuHallasan" color="white" ml={3}>{name}</Text>
        </Box>
    )
}

const DrinkCourseMenu = () => {
    return (
        <Flex flexWrap="wrap" justify="space-between" m={{ md: "20px", "2xl": "4rem"}} spacing={{ "2xl": "6px" }}>
            {DrinkCourseItems.map((item) => (
                <MenuItemCard name={item.name} info={item.info} price={item.price} isBestSeller={item.isBestSeller} image={item.image} />
            ))}
        </Flex>
    )
}

const DrinkCourse = () => {
    return (
        <>
            <Flex align="center" mb={10}>
                <Box
                    bgColor="#F5603C"
                    p={5}
                    h={{ md: "47.5px", "2xl": "95px" }}
                    w={{ md: "392.33px", "2xl": "500px" }}
                >
                    <Text fontFamily="Orbitron" fontSize={{ "2xl": "35px" }} fontWeight="bold" color="white">DRINKS & DESSERTS</Text>
                </Box>
                <Box
                    bgColor="#F5603C"
                    h={{ md: "47.5px", "2xl": "95px" }}
                    w="15px"
                    ml={2}
                >
                </Box>
            </Flex>
            <DrinkCourseMenu />
        </>
    )
}

export default DrinkCourse;