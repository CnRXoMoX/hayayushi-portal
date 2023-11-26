import { Box, useStyleConfig } from "@chakra-ui/react";
import React, { Component }  from 'react';

function CardBody(props) {
    const { variant, children, ...rest } = props;
    const styles = useStyleConfig("CardBody", { variant });

    return (
        <Box __css={styles} {...rest}>
            {children}
        </Box>
    );
}

export default CardBody;