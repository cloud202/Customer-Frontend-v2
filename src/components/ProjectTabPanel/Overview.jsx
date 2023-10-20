import { Box, Button, Card, CardBody, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, FormControl, FormLabel, HStack, Heading, Input, Menu, MenuButton, MenuItem, MenuList, Progress, Spinner, Stack, StackDivider, Table, TableCaption, TableContainer, Tbody, Td, Text, Textarea, Tfoot, Th, Thead, Tr, VStack, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import '../../css/user/boxShadow.css'
import { useSelector } from 'react-redux'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LoopIcon from '@mui/icons-material/Loop';
import { ChevronDownIcon } from '@chakra-ui/icons';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import axios from 'axios'
import { useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import MyProfileForm from '../MyProfileForm';
import { roles } from '../../data/role';
import { Add } from '@mui/icons-material';


const Overview = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const isMember = useSelector((state)=> state.token.isMember);


  const { isOpen: isSecondDrawerOpen, onOpen: onSecondDrawerOpen, onClose: onSecondDrawerClose } = useDisclosure();
  const secondModalBtnRef = React.useRef();
  
  const [adoption,setAdoption] = useState([]);
  const [completedTaskCount,setCompletedTaskCount] = useState(0);
  const [totalTaskCount,setTotalTaskCount] = useState(0);
  const [inProgressCount,setInProgressCount] = useState(0);
  const [dueCount,setDueCount] = useState(0);
  const toast = useToast();


  const customerId = useSelector((state)=> state.token.customerId)
  const customerQc = useSelector((state)=> state.token.customerQc);

  const projectId = useSelector((state)=> state.selectDueDiligence.projectId);
  const [formData,setFormData]  = useState([]);

  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [effortEstimated, setEffortEstimated] = useState('');
  const [memberData,setMemberData] = useState('');
 
//   let completedTaskCount=0;
//   let totalTaskCount = 0;

  async function fetchData(){
    try{
       const adoptionApproach = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/master/project_type`);
        setAdoption(adoptionApproach.data);

    }catch(e){
        console.log('Error fetching data',e);
    }
}

async function fetchPhases(){
    try{
      // const {data} = await axios.get(`${process.env.REACT_APP_API_URL_CUSTOMER}/api/customer/${customerId}/project/${projectId}/phases`);
      const {data} = await axios.get(`${process.env.REACT_APP_API_URL_CUSTOMER}/api/customer/project/${projectId}/phases`);
      let newCompletedTaskCount = 0;
      let newTotalTaskCount = 0;
      let inProgressCount=0;
      let dueCount=0;
      let onBoardedCount=0;

      data.forEach(phase => {
        const modules = phase.modules || [];
        modules.forEach(module => {
            const tasks = module.tasks || [];
            tasks.forEach(task => {
                newTotalTaskCount++;
                const taskStatus = task.taskId && task.taskId.task_status;
                if (taskStatus==="Completed") {
                  newCompletedTaskCount++;
                }else if(taskStatus==="In-progress"){
                  inProgressCount++;
                }else if(taskStatus==="Due"){
                  dueCount++;
                }
            });
        });

    });
    setCompletedTaskCount(newCompletedTaskCount);
    setTotalTaskCount(newTotalTaskCount);
    setInProgressCount(inProgressCount);
    setDueCount(dueCount);
    }catch(e){
      console.log("Error fetching task",e);
    }
  }

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0');
    
    // Combine components in the desired format
    return `${year}-${month}-${day}`;
  }

  const formatDateOverview = (dateStr) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };


  async function fetchFormData(){
    try{
    const {data} = await axios.get(`${process.env.REACT_APP_API_URL_CUSTOMER}/api/customer/project/${projectId}`);
    setFormData(data);
    setName(data.project_name);
    setDetails(data.details);
    console.log('Data',data);
    
    var start_date = data.start_date;
    var end_date = data.end_date;

    if(start_date){
      var temp1=formatDate(start_date);
      var temp2 =formatDate(end_date);
      setStartDate(temp1);
      setDueDate(temp2);
    }


  }catch(e){
    console.log("error fetch formData",e);
  }
  }

  useEffect(()=>{
    fetchFormData();  
  },[])

    useEffect(()=>{
        fetchData();
    },[])

    useEffect(()=>{
        fetchPhases();
    },[fetchPhases])

    const userInfo = useSelector((state)=> state.token.userInfo);
    // const formData = useSelector((state)=> state.dueDiligenceResponse.dueDiligence);
    const handleStartDateChange = (event) => {
      setStartDate(event.target.value);
    };
  
    const handleDueDateChange = (event) => {
      setDueDate(event.target.value);
    };
  
    const calculateEffortEstimated = () => {
      if (startDate && dueDate) {
        const startDateTime = new Date(startDate).getTime();
        const dueDateTime = new Date(dueDate).getTime();
        const differenceInMilliseconds = dueDateTime - startDateTime;
        const differenceInDays = differenceInMilliseconds / (1000 * 3600 * 24);
  
        setEffortEstimated(differenceInDays);
      } else {
        setEffortEstimated('');
      }
    };

    useEffect(() => {
      calculateEffortEstimated();
    }, [startDate, dueDate]);

    const handleSubmit= async ()=>{
      try{
        const project = {
          "project_name": name,
          "start_date": startDate,
          "end_date": dueDate,
          "details": details
        }
        const {data}  = await axios.patch(`${process.env.REACT_APP_API_URL_CUSTOMER}/api/customer/project/update/${projectId}`,project);
        console.log('Updated Data',data);
        toast({
          title: 'Project Updated Successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })

        onClose();
        fetchFormData();
      }catch(e){
        console.log('Error updating project',e);
        toast({
          title: 'Unable to  Update.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    }

    const [name,setName] = useState('');
    const [details,setDetails] = useState('');
    const [loading,setLoading] = useState(false);

    const [memberName, setMemberName] = useState('');
    const [memberEmail, setMemberEmail] = useState('');
    const [memberRole, setMemberRole] = useState('Select an option');
    const [memberCompany, setMemberCompany] = useState('');


  const handleMemberSubmit=async()=>{
    try{
      setLoading(true);
      const customerData = await axios.get(`${process.env.REACT_APP_API_URL_CUSTOMER}/api/customer/registration/${customerId}`);
      const memberData = {
        "customer_id": customerData.data.customer_id,
        "customer_name": memberName,
        "customer_role": memberRole,
        "customer_company": memberCompany,
        "customer_company_size": "",
        "customer_country": "",
        "customer_industry": "",
        "customer_email": memberEmail,
        "customer_mobile":{
          "countryCode": "",
          "phoneNumber": ""
        },
        "isMember":true,
        "projects":[projectId]
      }
      
      const {data} = await axios.post(`${process.env.REACT_APP_API_URL_CUSTOMER}/api/customer/registration`,memberData);
      console.log('Team Member Data',data);
      toast({
        title: 'Team Member Added',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })  

        setTimeout(()=>{
          onSecondDrawerClose();
          setLoading(false);
      },1000)
      
    }catch(e){
      console.log("Error adding team member",e);
      toast({
        title: 'Unable to add member.',
        description: "Please Try again later",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      setLoading(false);

    }
  }

  async function fetchMemberData(){
    try{
      const {data} = await axios.get(`${process.env.REACT_APP_API_URL_CUSTOMER}/api/customer/member/${customerQc}`);
      setMemberData(data);
    }catch(e){
      console.log('Error fetching member data',e);
    }
  }
  useEffect(() => {
    fetchMemberData();
  }, [])

  return (
    <Flex flexDir='column'>
        {formData && <Card>
            <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                <Box>
                    <Text textTransform='uppercase' fontSize='2xl' p='0' fontWeight={600} color='#067356'>
                    {formData.project_name}
                    </Text>
                    
                    <Text pt='2' fontWeight={500}>
                    <span style={{ color: 'gray' }}>Project Type : </span>{formData.project_CAP? formData.project_CAP: "Not available"}
                    </Text>

                    <Text fontWeight={500}>
                    <span style={{ color: 'gray' }}>Start Date : </span>{formData.start_date ? formatDateOverview(formData.start_date): 'Not available'}
                    </Text>

                    <Text fontWeight={500}>
                    <span style={{ color: 'gray' }}>End Date : </span>{formData.end_date ? formatDateOverview(formData.end_date): 'Not available'}
                    </Text>

                    <Text fontWeight={500}>
                    <span style={{ color: 'gray' }}>Days Remaining : </span>{effortEstimated? effortEstimated + " Days": "Not available"}
                    </Text>

                    {/* <Text fontWeight={500}>
                    <span style={{ color: 'gray' }}>Industry : </span>{formData.project_industry? formData.project_industry.name : "Not available"}
                    </Text>

                    <Text fontWeight={500}>
                    <span style={{ color: 'gray' }}>Workload Type : </span>{formData.project_WT?.length>0 ? formData.project_WT.map((workload)=> workload).join(', '): 'Not available'}
                    </Text> */}

                    <Text fontWeight={500}>
                    <span style={{ color: 'gray' }}>Project Details : </span>{formData.details? formData.details : 'Not available'}
                    </Text>
                    <Text fontWeight={500}>
                    <span style={{ color: 'gray' }}>Tech Stack : </span>{formData.project_TS?.length>0 ? formData.project_TS.map((tech)=> tech).join(', '): 'Not available'}
                    </Text>
                    
                </Box>
                <Box>
                    <Heading size='xs' textTransform='uppercase'>
                    Project Status ({Math.floor(completedTaskCount / totalTaskCount * 100)}%)
                    </Heading>
                    <Box pt='2'>
                    <Progress hasStripe value={completedTaskCount/totalTaskCount*100} colorScheme={
                        completedTaskCount / totalTaskCount * 100 < 30
                        ? 'red'
                        : completedTaskCount / totalTaskCount * 100 < 60
                        ? 'orange'
                        : 'green'
                    }/>
                    </Box>

                </Box>
                <Box>
                    <Heading size='xs' textTransform='uppercase'>
                    Task Status Report
                    </Heading>
                    <Box>
                        <Text pt='2' fontWeight={500}>
                        <span style={{ color: 'gray' }}>Onboarded : </span> {totalTaskCount - (completedTaskCount+ inProgressCount+ dueCount)}
                        </Text>
                        <Text fontWeight={500}>
                        <span style={{ color: 'gray' }}>Delivered : </span> {completedTaskCount}
                        </Text>
                        <Text fontWeight={500}>
                        <span style={{ color: 'gray' }}>In-progress : </span> {inProgressCount}
                        </Text>
                        <Text fontWeight={500} color='red.600'>
                        <span style={{ color: 'gray' }}>Due : </span>{dueCount}
                        </Text>
                    </Box>
                </Box>
                <Box>
                  <Flex justifyContent='space-between'>
                    <Heading size='xs' textTransform='uppercase'>
                    Project Team Report
                    </Heading>

                    <Text pt='2' fontWeight={500}>
                      {!isMember && <span style={{ color: 'blue',cursor: 'pointer' }} onClick={onSecondDrawerOpen}>Add New Team Member</span>}
                    </Text>
                  </Flex>
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
            </Card>}

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
                <Input w='100%' type="text" placeholder="Enter project name" name='name' value={name} onChange={(e)=> setName(e.target.value)}/>
            </FormControl>

            <FormControl mb={{base: '8px',sm: '8px', lg: '10px'}} isRequired>
                <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700'>Start Date</FormLabel>
                <Input w='100%' type="date" placeholder="Enter template name" name='name' value={startDate} onChange={(e)=> handleStartDateChange(e)}/>
            </FormControl>

            <FormControl mb={{base: '8px',sm: '8px', lg: '10px'}} isRequired>
                <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700'>Due On</FormLabel>
                <Input w='100%' type="date" placeholder="Enter template name" name='name' value={dueDate} onChange={(e)=> handleDueDateChange(e)}/>
            </FormControl>

            <FormControl mb={{base: '8px',sm: '8px', lg: '10px'}} isRequired>
                <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700'>Days Remaining</FormLabel>
                <Input w='100%' isDisabled={true} type="text" placeholder="Effort Estimated" name='name' value={effortEstimated!=="" ? effortEstimated + "Days": ""} />
            </FormControl>

            <FormControl mb={{base: '8px',sm: '8px', lg: '10px'}} isRequired>
                <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700'>Cloud Adoption Approach</FormLabel>
                <Input w='100%' isDisabled={true} type="text" placeholder="Enter template name" name='name' value={formData.project_CAP} />

                </FormControl>

            <FormControl mb={{base: '8px',sm: '8px', lg: '10px'}} isRequired>
                <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700'>Project Details</FormLabel>
                <Textarea w='100%' type="text" placeholder="Enter template name" name='name' value={details} onChange={(e)=> setDetails(e.target.value)}></Textarea>
            </FormControl>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue' onClick={handleSubmit}>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

           
      <Drawer isOpen={isSecondDrawerOpen} placement="bottom" onClose={onSecondDrawerClose}>
          <DrawerOverlay />
          <DrawerContent>
          <DrawerCloseButton/>
            <DrawerHeader>Add a New Team Member</DrawerHeader>
            <DrawerBody>
              <FormControl mb={{ base: '8px', sm: '8px', lg: '10px' }}>
                <FormLabel fontSize={{ base: '14px', sm: '14px', md: '16px', lg: '17px' }} color='gray.700'>
                  Name
                </FormLabel>
                <Input
                  w='100%'
                  type="text"
                  placeholder="Enter team member name"
                  name='customer_name'
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                />
              </FormControl>

              <FormControl mb={{ base: '8px', sm: '8px', lg: '10px' }}>
                      <FormLabel fontSize={{ base: '14px', sm: '14px', md: '16px', lg: '17px' }} color='gray.700'>
                        Business Email
                      </FormLabel>
                      <Input
                        w='100%'
                        type="email"
                        placeholder="Enter team member email"
                        name='customer_email'
                        value={memberEmail}
                        onChange={(e) => setMemberEmail(e.target.value)}
                      />
                    </FormControl>

                    <FormControl mb={{ base: '8px', sm: '8px', lg: '10px' }}>
                      <FormLabel fontSize={{ base: '14px', sm: '14px', md: '16px', lg: '17px' }} color='gray.700'>
                        Role
                      </FormLabel>
                      <Menu>
                        <MenuButton w='100%' as={Flex} variant="outline" colorScheme="gray" color='gray.700' className='menu-button'>          
                        <HStack display='flex' justifyContent='space-between'>
                        <Text>{memberRole}</Text>
                        <ArrowDropDownIcon />
                        </HStack>
                        </MenuButton>
                        <MenuList style={{height: '300px',overflow: 'auto'}}>
                          {roles.map((role,ind)=> <MenuItem key={ind} onClick={()=>setMemberRole(role)}>{role}</MenuItem>)}
                        </MenuList>
                    </Menu>
                    </FormControl>

                    <FormControl mb={{ base: '8px', sm: '8px', lg: '10px' }}>
                      <FormLabel fontSize={{ base: '14px', sm: '14px', md: '16px', lg: '17px' }} color='gray.700'>
                        Company
                      </FormLabel>
                      <Input
                        w='100%'
                        type="text"
                        placeholder="Enter your company name"
                        name='customer_company'
                        value={memberCompany}
                        onChange={(e) => setMemberCompany(e.target.value)}
                      />
                    </FormControl>
                    <Flex justifyContent='flex-end'>
                    <Button colorScheme='blue' mr={3} onClick={handleMemberSubmit}>
                      Add
                    </Button>
                    <Button variant='ghost' onClick={onSecondDrawerClose}>
                      Close
                    </Button>
                    </Flex>
                    
                    <Text fontSize='20px' fontWeight='500' mb='7px'>List of Team Members</Text>
                    <TableContainer>
                      <Table variant='simple' size='md'>
                        <Thead>
                          <Tr>
                            <Th>Name</Th>
                            <Th>Email</Th>
                            <Th>Role</Th>
                            <Th>Action</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                        {memberData && memberData.map((member, ind) => (
                          <Tr key={ind}>
                            <Td>{member.customer_name}</Td>
                            <Td>{member.customer_email}</Td>
                            <Td>{member.customer_role}</Td>
                            <Td>
                              <Flex gap={2}>
                              <Button size='sm'>Invite</Button>
                              <Button size='sm'>Remove</Button>
                              </Flex>
                            </Td>
                          </Tr>
                        ))}
                        </Tbody>
                      </Table>
                    </TableContainer>

            </DrawerBody>
            
          </DrawerContent>
        </Drawer>


    </Flex>
  )
}

export default Overview