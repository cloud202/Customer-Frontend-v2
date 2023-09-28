import { Box, Button, Flex, FormControl, FormLabel, Heading, Image, Input, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Spinner, Text, useDisclosure, useToast } from '@chakra-ui/react'
import modx from '../img/modx.png'
import React, { useState } from 'react';
import { ChevronDownIcon, EmailIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import MyProfileForm from './MyProfileForm';
import { useSelector } from 'react-redux';
import axios from 'axios';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import '../css/user/navbar.css'
import Cookies from "js-cookie";
export const Navbar = () => {
  const RemoveCookie = () => {
    Cookies.remove("token");
    Cookies.remove("email");
    Cookies.remove("username");
  };
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();
  const profileData = useSelector((state)=> state.profileForm.profileData)
  const [loading,setLoading] = useState(false);

  const [userData,setUserData] = useState({
    name: '',
    email: '',
  });


  const handleSubmit=async()=>{
    try{
      setLoading(true);
      const {data} = await axios.post(`${process.env.REACT_APP_API_URL_CUSTOMER}/api/customer/registration`,profileData);
      toast({
        title: 'Profile created.',
        description: "We've created your profile for you.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      setUserData({
        name: data.customer_name,
        email: data.customer_email});

        setTimeout(()=>{
          onClose();
          setLoading(false);
      },1000)
    }catch(e){
      console.log("Error creating profile",e);
      toast({
        title: 'Unable to create Profile.',
        description: "Please Try again later",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }


  return (
    <Flex  className='header' color='whiteAlpha.800' as="nav" p="10px" alignItems="center" gap="8px" h="55px" position="sticky" top="0" zIndex={3}>
        <Box ml={{base: '20px',lg: '10px'}} h={{base: "35px",lg: "45px"}} w={{base: "100px",lg: '120px'}} p={0}>
        <Link to='/user'>
          <Image m={0} objectFit='cover' src={modx}/>
          </Link>
        </Box>
        <Spacer/>

        <Menu bg='gray.400'>
            <MenuButton
              as={Button}
              colorScheme='#04373A'
              rightIcon={<ChevronDownIcon />}
            >
             {Cookies.get("username")}
            </MenuButton>
              <MenuList>
                <MenuItem color='gray.800'>{Cookies.get("email")}</MenuItem>
                <MenuItem color='gray.800' onClick={onOpen}>My Profile</MenuItem>
                <MenuDivider />
                <MenuItem color='gray.800'>
                <a onClick={RemoveCookie} href={`${process.env.REACT_APP_COGNITO}logout?client_id=${process.env.REACT_APP_CLIENT_ID}&logout_uri=${process.env.REACT_APP_COGNITO}login?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`}>
                  Log Out
                  </a>
                  </MenuItem>
              </MenuList>
          </Menu>

          <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>My Profile</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <MyProfileForm/>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit} rightIcon={loading? <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='lg'/> : <FileDownloadDoneIcon/>}>
              Submit
            </Button>
          <Button variant='ghost' onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}
