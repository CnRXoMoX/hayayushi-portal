import { extendTheme } from '@chakra-ui/react';

const breakpoints = {
    base: "0px",
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1536px",
};

export default extendTheme({
    styles: {
        global: {
            html: {
                height: '100%',
            },
            body: {
                minHeight: '100%',
                backgroundColor: '#D9D9D9'
            }
        }
    },
    breakpoints
})