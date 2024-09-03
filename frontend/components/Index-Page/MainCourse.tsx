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
    { name: 'Ramen', price: "1000", info: "Replenishes 75% Hunger and Thirst.",isBestSeller: true, image: "/Images/MainCourse/ramen.png" },
    { name: 'Takoyaki', price: "1500", info: "Replenishes 75% Hunger and Thirst + 50% Armor", isBestSeller: true, image: "/Images/MainCourse/ramen.png" },
    { name: 'Tonkatsu', price: "500", info: "Replenishes Hunger.", isBestSeller: false, image: "/Images/MainCourse/tonkatsu.png"},
    { name: 'Tempura', price: "500", info: "Replenishes Hunger.", isBestSeller: false, image: "/Images/MainCourse/tempura.png"},
    { name: 'Sushi', price: "1000", info: "Reduces Stress.", isBestSeller: true, image: "/Images/MainCourse/sushi.png"}
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
                <Image boxSize={{ "2xl": "46px" }} width={{ "2xl": "65px" }} src="/Images/SmallHayayushiLogo.png" />
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
                        src="/Images/Info.png"
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