import {
    Box
} from '@chakra-ui/react';

import ChakraNextImage from "chakra/components/Image";

import HeaderImage from '@/public/';

const HeaderPicture = () => {
    return (
        <Box
            bgImage="https://media.discordapp.net/attachments/1175708838121447474/1179496151456677909/headerImage.png?ex=6579fe64&is=65678964&hm=73a32d37a82b5f04861b771e91615a1146a0b347597f47edffe9f1e0d26d66f5&=&format=webp&quality=lossless"
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