import { NextPage } from 'next';
import {
    Flex,
    Center,
    Text,
    Container,
} from '@chakra-ui/react';

import AccountsList from '@/components/accounts-table';

const ManageAccounts: NextPage = ({ data }) => {
    return (
        <Container maxW="container.xl" p={10}>
            <AccountsList />
        </Container>
    )
}

export default ManageAccounts