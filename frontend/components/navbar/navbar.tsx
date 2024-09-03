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
    Center
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
  { name: 'Attendance', href: "/Attendance" },
  { name: 'Staff', href: "/" },
  { name: 'Sales', href: "/Sales" }
]

interface NavItemProps {
    href: string;
    children: React.ReactNode;
}

const NavLink = ({ href, children, ...rest }: NavItemProps) => {
    return (
      <Box
        as="a"
        px={{ base: "2px", "2xl": "5px"}}
        py={2}
        rounded={'md'}
        _hover={{
          textDecoration: 'none',
          bg: "#F5603C",
        }}
        href={href}>
        <Text color="gray.200" fontFamily="Inter" fontSize={{ base: "16px", "2xl": "25px" }} fontWeight="s" pl="7px" pr="7px">
          {children}
        </Text>
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

    const handleAccountProfile = () => {
      router.push("/Account");
    }

    const LoginRouter = () => {
      router.push("/Login");
    }

    return (
      <>
        {user ? (
          <Box bg="#861616" mb={2} px={4}>
            <Flex h={{ base: "60px", "2xl": "121"}} alignItems={'center'} justifyContent={'space-between'}>
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
                  <Flex align="center">
                    <Image boxSize={{ base: "50px", "2xl": "90px"}} width={{ base: "70px", "2xl": "124px"}} src="/favicon.png" alt="Hayayushi" />
                    <Text color="gray.200" fontSize={{  base: "24", "2xl": "32px" }} fontFamily="JejuHallasan">HAYAYUSHI</Text>
                  </Flex>
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
                      cursor={'pointer'}
                      variant={'link'}
                      _hover={{bgColor: '#F5603C'}}
                      minW={0}
                      bg="#861616">
                      <Flex direction="row" justify="space-between">
                        <Avatar
                          size={{base: 'sm', "2xl": 'md'}}
                          src={
                            'https://avatars.dicebear.com/api/male/username.svg'
                          }
                        />
                      </Flex>
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={handleAccountProfile} fontSize={{"2xl": "20px"}}>Account</MenuItem>
                      {hasAllowedRole && (
                        <MenuItem onClick={handleSiteSettings} fontSize={{"2xl": "20px"}}>Site Settings</MenuItem>
                      )}
                      <MenuDivider />
                      <MenuItem onClick={logout} fontSize={{"2xl": "20px"}}>Logout</MenuItem>
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
        ) : (
          <Box bg="#861616" mb={2} px={4}>
            <Flex h={{ base: "60px", "2xl": "121"}} alignItems={'center'} justifyContent={'space-between'}>
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
                  <Flex align="center">
                    <Image boxSize={{ base: "50px", "2xl": "90px"}} width={{ base: "70px", "2xl": "124px"}} src="/favicon.png" alt="Hayayushi" />
                    <Text color="gray.200" fontSize={{  base: "24", "2xl": "32px" }} fontFamily="JejuHallasan">HAYAYUSHI</Text>
                  </Flex>
                </Box> {user && (
                  <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                    {LinkItems.map((link) => (
                      <NavLink key={link.name} href={link.href}>{link.name}</NavLink>
                    ))}
                  </HStack>
                )}
              </HStack>
                <Flex alignItems={'center'}>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={'full'}
                      cursor={'pointer'}
                      variant={'link'}
                      _hover={{bgColor: '#F5603C'}}
                      minW={0}
                      bg="#861616">
                      <Flex direction="row" justify="space-between">
                        <Avatar
                          size={{base: 'sm', "2xl": 'md'}}
                          src={
                            'https://avatars.dicebear.com/api/male/username.svg'
                          }
                        />
                      </Flex>
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={LoginRouter} fontSize={{"2xl": "20px"}}>Login</MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
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