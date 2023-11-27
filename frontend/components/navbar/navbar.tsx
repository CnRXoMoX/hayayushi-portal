import {
    Box,
    Flex,
    Avatar,
    HStack,
    Text,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    Image,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'

import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthProvider';

import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import React, { useState, useEffect } from 'react';
import { JWT_KEY } from '@/config';

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', href: '/' },
  { name: 'Dashboard', href: "/HomeLogin" },
  { name: 'Attendance', href: "/Attendance" },
  { name: 'Staff', href: "/" },
  { name: 'Sales', href: "/" }
]

interface NavItemProps {
    href: string;
    children: React.ReactNode;
}

const NavLink = ({ href, children, ...rest }: NavItemProps) => {
    return (
      <Box
        as="a"
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
          textDecoration: 'none',
          bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={href}>
        {children}
      </Box>
    )
  }

export default function NavBar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user, logout } = useAuth();
    const [hasAllowedRole, setHasAllowedRole] = useState(false);
    const router = useRouter();

    const userJWT = Cookies.get('jwt');
    const secretKey = JWT_KEY;

    useEffect(() => {
      const fetchData = async () => {
        const decodedToken = await jwt.decode(userJWT, secretKey);
        const userRole = decodedToken && decodedToken.role;
        const allowedRole = userRole === "Manager";
        setHasAllowedRole(allowedRole);
      };

      if (userJWT && secretKey) {
        fetchData();
      }
    }, [userJWT, secretKey]);;

    const handleSiteSettings = () => {
      router.push("/SiteSettings");
    }

    return (
      <>
        {user && (
          <Box bg={useColorModeValue('gray.100', 'gray.900')} mb={2} px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
              {user && (
                <IconButton
                  size={'md'}
                  icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                  aria-label={'Open Menu'}
                  display={{ md: 'none' }}
                  onClick={isOpen ? onClose : onOpen}
                />
              )}
              <HStack spacing={8} alignItems={'center'}>
                <Box>
                  <Image boxSize={10} width={10} src="https://media.discordapp.net/attachments/1171170655996223580/1177527001100328980/1-AMSP5NxYEUeykrCJIwU9FTVCyxuVTQwYmH9qWIE.png?ex=6572d47a&is=65605f7a&hm=061d82fd3754627d5cd1cf28a679e481c2bf45770fdcb0b623fda2d6e5fac07c&=&format=webp" alt="Hayayushi" />
                </Box> {user && (
                  <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                    {LinkItems.map((link) => (
                      <NavLink key={link.name} href={link.href}>{link.name}</NavLink>
                    ))}
                  </HStack>
                )}
              </HStack>
              {user && (
                <Flex alignItems={'center'}>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={'full'}
                      variant={'link'}
                      cursor={'pointer'}
                      minW={0}>
                      <Avatar
                        size={'sm'}
                        src={
                          'https://avatars.dicebear.com/api/male/username.svg'
                        }
                      />
                    </MenuButton>
                    <MenuList>
                      <MenuItem>Account</MenuItem>
                      {hasAllowedRole && (
                        <MenuItem onClick={handleSiteSettings}>Site Settings</MenuItem>
                      )}
                      <MenuDivider />
                      <MenuItem onClick={logout}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              )}
            </Flex>

            {isOpen ? (
              <Box pb={4} display={{ md: 'none' }}>
                <Stack as={'nav'} spacing={4}>
                  {LinkItems.map((link) => (
                    <NavLink key={link.name} href={link.href}>{link.name}</NavLink>
                  ))}
                </Stack>
              </Box>
            ) : null}
          </Box>
        )}
      </>
    )
}