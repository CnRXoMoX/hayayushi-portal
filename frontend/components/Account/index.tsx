import { useState, useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react'
import AccountChangePasswordModal from '@/components/Account/AccountChangePasswordModal';

import Card from '../Card/Card';
import CardHeader from '../Card/CardHeader';
import CardBody from '../Card/CardBody';
import { ViewIcon, ViewOffIcon, EditIcon } from '@chakra-ui/icons';
import ReactTooltip from 'react-tooltip';
import {
    Text,
    StackDivider,
    Heading,
    Box,
    Stack,
    WrapItem,
    Avatar,
    Flex,
    InputGroup,
    InputRightElement,
    Input,
    IconButton,
    FormControl,
    FormLabel,
    Center,
    AvatarBadge,
    Tooltip
    
} from '@chakra-ui/react'

const AccountPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [showPassword, setShowPassword] = useState(false);
    const [isChangePasswordModalOpen, setChangePasswordModalOpen] = useState(false);

    const handleOpenChangePasswordModal = () => {
        setChangePasswordModalOpen(true);
    }

    const handleCloseChangePWModal = () => {
        setChangePasswordModalOpen(false);
    }
  
    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };

    return (
    <Card>
        <CardHeader>
            <Heading size='lg'>Account</Heading>
            <Flex justifyContent='flex-end'>
            <Tooltip label="Upload new avatar" placement="bottom">
                <Avatar size="xl" src="https://static.planetminecraft.com/files/image/minecraft/texture-pack/2022/017/15972881-pack_l.webp">
                    <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="green"
                    aria-label="remove Image"
                    icon={<EditIcon/>}
                    />
                </Avatar>
            </Tooltip>
            </Flex>
        </CardHeader>

        <CardBody mt={-16}>
            <Stack divider={<StackDivider />} spacing='6'>
            <Box>
                <Heading fontSize='lg' size='xs' textTransform='uppercase'>
                Name
                </Heading>
                <Text pt='2' fontSize='m'>
                Red Hayasaka
                </Text>
            </Box>
            <Box>
                <Heading fontSize='lg' size='xs' textTransform='uppercase'>
                    Password
                </Heading>
                <InputGroup size='md'>
                    <Input
                    ml={-3}
                    pr='4.5rem'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='******'
                    borderColor='transparent'
                    borderWidth='0'
                    _hover={{ borderColor: 'transparent' }} 
                    _focus={{ borderColor: 'transparent', boxShadow: 'none' }}
                    />
                <Flex>
                <InputRightElement width='5.5rem'>
                <IconButton
                    h='1.75rem'
                    size='sm'
                    onClick={handleTogglePassword}
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    marginRight='0.5rem'
                />
                <Tooltip label="Update Password" placement="bottom">
                <IconButton
                    h='1.75rem'
                    size='sm'
                    onClick={handleOpenChangePasswordModal}
                    icon={<EditIcon/>}
                />
                </Tooltip>
                </InputRightElement>
                </Flex>
                </InputGroup>
                </Box>
            <Box>
            </Box>
            </Stack>
            <AccountChangePasswordModal isOpen={!!isChangePasswordModalOpen} onClose={handleCloseChangePWModal} />
        </CardBody>
    </Card>
    )
}

export default AccountPage
