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
    { name: 'Jakult', price: "500", info: "Replenishes Thirst.", isBestSeller: false, image: "/Images/DrinksCourse/jakult.png" },
    { name: 'Green Tea', price: "1000", info: "Reduces Stress.", isBestSeller: false, image: "/Images/DrinksCourse/tea.png"},
    { name: 'Soju', price: "1500", info: "Temporary Speed Boost. (6-8 sec.)", isBestSeller: true, image: "/Images/DrinksCourse/soju.png"},
    { name: 'Matcha Ice Cream', price: "500", info: "Reduces a larger amount of stress but makes you thirsty.", isBestSeller: true, image: "/Images/DrinksCourse/icecream.png"}
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
                <Image boxSize={{ "2xl": "46px" }} width={{ "2xl": "65px" }} src="/Images/SmallhayayushiLogo.png" />
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
                        src="/Images/Info.png"
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