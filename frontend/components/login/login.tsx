import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
import axios from 'axios';
import { AuthContext, useAuth } from '@/context/AuthProvider'


interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { user, login, logout } = useAuth();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent bg="white" boxShadow="lg" backdropFilter="blur(10px)">
        <ModalHeader textAlign="center">Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
              type="text"
              id="username"
              placeholder="Enter username"
              rounded="full" // Overrides the default rounded style with full rounded borders for the input component
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              />
          </FormControl>
          <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
              type="password"
              id="password"
              placeholder="Enter password"
              rounded="full" // Overrides the default rounded style with full rounded borders for the input component
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' onClick={() => login(username, password)}>Login</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;