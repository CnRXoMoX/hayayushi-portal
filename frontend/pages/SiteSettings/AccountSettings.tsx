import { NextPage } from 'next';
import {
    Flex,
    Center,
    Text,
    Container,
} from '@chakra-ui/react';

import AccountsPage from '@/components/Account';

const AccountSettings: NextPage = () => {
    return (
        <Container maxW="container.xl" p={10}>
            <AccountsPage />
        </Container>
    )
}

export default AccountSettings