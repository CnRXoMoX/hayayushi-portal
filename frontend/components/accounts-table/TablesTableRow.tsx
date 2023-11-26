import {
    Avatar,
    Badge,
    Button,
    Flex,
    Td,
    Text,
    Tr,
    useColorModeValue
  } from "@chakra-ui/react";
  import React from "react";

  function TablesTableRow(props) {
    const { username, role, pk, onEdit } = props;
    const textColor = useColorModeValue("gray.500", "white");
    const titleColor = useColorModeValue("gray.700", "white");
    const bgStatus = useColorModeValue("gray.400", "navy.900");
    const borderColor = useColorModeValue("gray.200", "gray.600");

    const handleEditClick = () => {
      onEdit();
    }

    return (
      <Tr>
        <Td
          minWidth={{ sm: "250px" }}
          pl="0px"
          borderColor={borderColor}
        >
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Text
                fontSize="md"
                color={titleColor}
                fontWeight="bold"
                minWidth="100%"
              >
                {username}
            </Text>
          </Flex>
        </Td>

        <Td borderColor={borderColor}>
            <Text fontSize="md" color={textColor} fontWeight="bold">
                {role}
            </Text>
        </Td>
        <Td borderColor={borderColor}>
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
            {pk}
          </Text>
        </Td>
        <Td borderColor={borderColor}>
          <Button p="0px" bg="transparent" variant="no-effects" onClick={handleEditClick}>
            <Text
              fontSize="md"
              color="gray.400"
              fontWeight="bold"
              cursor="pointer"
            >
              Edit
            </Text>
          </Button>
        </Td>
      </Tr>
    );
  }

  export default TablesTableRow;