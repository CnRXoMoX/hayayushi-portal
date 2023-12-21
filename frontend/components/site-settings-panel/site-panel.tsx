import {
    Center,
    Grid,
    Link,
    Flex,
    FlexProps,
    Icon,
    BoxProps
} from '@chakra-ui/react';

import { IoIosPersonAdd, IoIosContact } from "react-icons/io";

import { IconType } from 'react-icons';
import { ReactText } from 'react';

interface LinkItemProps {
    name: string;
    href: string;
    icon: IconType;
}

const LinkItems: Array<LinkItemProps> = [
    { name: 'Staff List', href: '/SiteSettings/Staffs', icon: IoIosPersonAdd },
    { name: 'Manage Accounts', href: "/SiteSettings/ManageAccounts?page=1", icon: IoIosContact },
    { name: 'Cut Off', href: "/SiteSettings/Payroll", icon: IoIosContact },
    { name: 'Staff\'s Payout', href: "/SiteSettings/StaffPayout", icon: IoIosContact },
    { name: 'Staff Attendance', href: "/SiteSettings/StaffAttendance", icon: IoIosContact },
    { name: 'Add Bonus', href: "/SiteSettings/AddBonus", icon: IoIosContact }
];

const SiteAdminMenu = () => {
    return (
        <Grid templateColumns={['repeat(5, 1fr)', 'repeat(5, 1fr)']} gap={10} mb="500px">
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon} href={link.href}>
                    {link.name}
                </NavItem>
            ))}
        </Grid>
    )
}

interface NavItemProps extends FlexProps {
    icon: IconType;
    href: string;
    children: ReactText;
}

const NavItem = ({ icon, href, children, ...rest }: NavItemProps) => {

    return (
        <Link href={href} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
            <Flex
                align="center"
                p="4"
                mx="1"
                borderRadius="lg"
                border="1px"
                role="group"
                cursor="pointer"
                _hover={{
                bg: 'teal',
                color: 'white',
                }}
                {...rest}>
                {icon && (
                <Icon
                    mr="4"
                    fontSize="25"
                    _groupHover={{
                    color: 'white',
                    }}
                    as={icon}
                />
                )}
                {children}
            </Flex>
        </Link>
    );
};

export default SiteAdminMenu