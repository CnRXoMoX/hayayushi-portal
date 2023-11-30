import React from 'react'
import { NextPage } from 'next'
import {
    Flex,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    Text,
    Box,
    Container,
    useColorModeValue
} from '@chakra-ui/react'

import DrinkCourse from '@/components/Index-Page/DrinksCourse'
import MainCourse from '@/components/Index-Page/MainCourse'
import OurMenuHeader from '@/components/Index-Page/Header'
import HeaderPicture from '@/components/Index-Page/HeaderPicture'
import Footer from '@/components/Index-Page/Footer'
import Card from '@/components/Card/Card'

const Home: NextPage = () => {
    const textColor = useColorModeValue("gray.700", "white");

    return (
        <>
            <HeaderPicture />
            <Box m={10}>
                <OurMenuHeader />
            </Box>
            <Box mb={24}>
                <MainCourse />
                <DrinkCourse />
            </Box>
            <Footer />
        </>
    )
}

export default Home