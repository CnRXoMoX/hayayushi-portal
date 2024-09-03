import {
    Box
} from '@chakra-ui/react';

import ChakraNextImage from "chakra/components/Image";

import HeaderImage from '@/public/';

const HeaderPicture = () => {
    return (
        <Box
            bgImage="/Images/headerImage.png"
            h={{ md: "392.5", "2xl": "480" }}
            w="100%"
            bgSize="cover"
            bgPosition="center"
            bgRepeat="no-repeat"
            mt={-2}
        >
        </Box>
    )
}

export default HeaderPicture;