import { Box, Button, Card, CardBody, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, FormControl, FormLabel, HStack, Heading, Input, Menu, MenuButton, MenuItem, MenuList, Progress, Stack, StackDivider, Text, Textarea, VStack, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import '../../css/user/boxShadow.css'
import { useSelector } from 'react-redux'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LoopIcon from '@mui/icons-material/Loop';
import { ChevronDownIcon } from '@chakra-ui/icons';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import axios from 'axios'
import { useEffect } from 'react';

const Overview = () => {
const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const [adoption,setAdoption] = useState([]);

  async function fetchData(){
    try{
       const adoptionApproach = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/master/project_type`);
        setAdoption(adoptionApproach.data);

    }catch(e){
        console.log('Error fetching data',e);
    }
}

    useEffect(()=>{
        fetchData();
    },[])

    const userInfo = useSelector((state)=> state.token.userInfo);
    const formData = useSelector((state)=> state.dueDiligenceResponse.dueDiligence);
  return (
    <Flex flexDir='column'>
        <Card>
            <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                <Box>
                    <Text textTransform='uppercase' fontSize='2xl' p='0' fontWeight={600} color='#067356'>
                    {formData.project_name}
                    </Text>
                    
                    <Text pt='2' fontWeight={500}>
                    <span style={{ color: 'gray' }}>Project Type : </span>{formData.project_CAP!=="Select an option"? formData.project_CAP: "Not available"}
                    </Text>
                    <Text fontWeight={500}>
                    <span style={{ color: 'gray' }}>Industry : </span>{formData.project_industry!=="Select an option"? formData.project_industry: "Not available"}
                    </Text>
                    <Text fontWeight={500}>
                    <span style={{ color: 'gray' }}>Workload Type : </span>{formData.project_WT.length>0 ? formData.project_WT.map((workload)=> workload).join(', '): 'Not available'}
                    </Text>
                    <Text fontWeight={500}>
                    <span style={{ color: 'gray' }}>Tech Stack : </span>{formData.project_TS.length>0 ? formData.project_TS.map((tech)=> tech).join(', '): 'Not available'}
                    </Text>
                    
                </Box>
                <Box>
                    <Heading size='xs' textTransform='uppercase'>
                    Project Status
                    </Heading>
                    <Box pt='2'>
                    <Progress hasStripe value={64} colorScheme='green'/>
                    </Box>
                </Box>
                <Box>
                    <Heading size='xs' textTransform='uppercase'>
                    Task Status Report
                    </Heading>
                    <Box>
                        <Text pt='2' fontWeight={500}>
                        <span style={{ color: 'gray' }}>Onboarded : </span> X
                        </Text>
                        <Text fontWeight={500}>
                        <span style={{ color: 'gray' }}>Delivered : </span> Y
                        </Text>
                        <Text fontWeight={500}>
                        <span style={{ color: 'gray' }}>In-progress : </span> Z
                        </Text>
                        <Text fontWeight={500} color='red.600'>
                        <span style={{ color: 'gray' }}>Due : </span>A
                        </Text>
                    </Box>
                </Box>
                <Box>
                    <Heading size='xs' textTransform='uppercase'>
                    Project Team Report
                    </Heading>
                    <Box>
                        <Text pt='2' fontWeight={500}>
                        <span style={{ color: 'gray' }}>Team Member Name : </span> {userInfo.userName}
                        </Text>
                        <Text fontWeight={500}>
                        <span style={{ color: 'gray' }}>Email : </span>{userInfo.email}
                        </Text>

                        <Flex justifyContent='flex-end' gap={2}>
                            <Button
                            colorScheme="orange"
                            rightIcon={<LoopIcon fontSize="small" />}
                            onClick={()=> onOpen()}
                        >
                            Update
                        </Button>
                        <Button
                            colorScheme="red"
                            rightIcon={<DeleteOutlineIcon fontSize="small" />}
                        >
                            Delete
                        </Button>
                        </Flex>
                    </Box>
                </Box>
                </Stack>
            </CardBody>
            </Card>

            <Drawer
        isOpen={isOpen}
        placement='bottom'
        onClose={onClose}
        size='sm'
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Update Project</DrawerHeader>

          <DrawerBody>

            <FormControl mb={{base: '8px',sm: '8px', lg: '10px'}} isRequired>
                <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700'>Project Name</FormLabel>
                <Input w='100%' type="text" placeholder="Enter project name" name='name' />
            </FormControl>

            <FormControl mb={{base: '8px',sm: '8px', lg: '10px'}} isRequired>
                <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700'>Start Date</FormLabel>
                <Input w='100%' type="date" placeholder="Enter template name" name='name' />
            </FormControl>

            <FormControl mb={{base: '8px',sm: '8px', lg: '10px'}} isRequired>
                <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700'>Due On</FormLabel>
                <Input w='100%' type="date" placeholder="Enter template name" name='name' />
            </FormControl>

            <FormControl mb={{base: '8px',sm: '8px', lg: '10px'}} isRequired>
                <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700'>Days Remaining</FormLabel>
                <Input w='100%' type="date" placeholder="Enter template name" name='name' />
            </FormControl>

            <FormControl mb={{base: '8px',sm: '8px', lg: '10px'}} isRequired>
                <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700'>Cloud Adoption Approach</FormLabel>
                <Menu>
                    <MenuButton w='100%' as={Flex} variant="outline" colorScheme="gray" color='gray.700' className='menu-button'>
                    <HStack display='flex' justifyContent='space-between'>
                    <Text>Select project type</Text>
                    <ArrowDropDownIcon/>
                    </HStack>
                    </MenuButton>
                    <MenuList>
                        {adoption && adoption.map((item,ind)=> <MenuItem key={ind}>{item.name}</MenuItem>)}
                    </MenuList>
                </Menu>
                </FormControl>

            <FormControl mb={{base: '8px',sm: '8px', lg: '10px'}} isRequired>
                <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700'>Project Details</FormLabel>
                <Textarea w='100%' type="text" placeholder="Enter template name" name='name'></Textarea>
            </FormControl>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  )
}

export default Overview