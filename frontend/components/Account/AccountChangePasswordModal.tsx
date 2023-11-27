import { useState, useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react'

import {
    Text,
    Button,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Modal,
    FormControl,
    FormLabel,
    Input

} from '@chakra-ui/react'

const AccountChangePasswordModal = ({ isOpen, onClose }) => {
  return (
      <Modal
      isOpen={isOpen}
      onClose={onClose}
      >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Password</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input placeholder='New Password' />
          </FormControl>
        </ModalBody>
        <ModalBody pb={6}>
          <FormControl>
            <Input placeholder='Confirm Password' />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AccountChangePasswordModal

