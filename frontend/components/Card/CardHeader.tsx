import { Box, useStyleConfig } from "@chakra-ui/react";
import React, { Component }  from 'react';

function CardHeader(props) {
    const { variant, children, ...rest } = props;
    const styles = useStyleConfig("CardHeader", { variant });

    return (
        <Box __css={styles} {...rest}>
            {children}
        </Box>
    );
}

export default CardHeader;