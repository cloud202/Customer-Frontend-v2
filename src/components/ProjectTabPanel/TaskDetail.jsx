import { Box, Button, Card, CardBody, CardHeader, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, FormControl, FormLabel, HStack, Heading, Input, Menu, MenuButton, MenuItem, MenuList, Stack, StackDivider, Text, Textarea, useDisclosure, useToast } from '@chakra-ui/react';
import { ArrowBack } from '@mui/icons-material';
import React, { useCallback, useEffect, useState } from 'react';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LoopIcon from '@mui/icons-material/Loop';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ChevronDownIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useSelector } from 'react-redux';

const TaskDetail = ({setFlag,selectedTask,setSelectedTask,taskDetail}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef();
  const helper = "Not Available"
  const toast = useToast();
  const userInfo = useSelector((state)=> state.token.userInfo);
  const customerId = useSelector((state)=> state.token.customerId)
  const projectId = useSelector((state)=> state.selectDueDiligence.projectId);


  const [taskType,setTaskType] = useState(`${taskDetail.task.taskId.task_type}`);
  const [solution,setSolution] = useState(null);
  const [status,setStatus] = useState('Onboarded');
  const [taskName,setTaskName] = useState(taskDetail.task.taskId.name);

  const fetchSolDataEffect = useCallback(async () => {
    try {
      const sol = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/master/project_solution`);
      setSolution(sol.data);
    } catch (error) {
      console.error("Error fetching solution data:", error);
    }
  }, []);

  useEffect(()=>{
    fetchSolDataEffect();
  },[])

  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [effortEstimated, setEffortEstimated] = useState('');
  const [taskDescription,setTaskDescription] = useState(taskDetail.task.taskId.task_description || '');

  useEffect(() => {
    calculateEffortEstimated();
  }, [startDate, dueDate]);

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

  const handleSubmit = async ()=>{
    if(!taskDetail.task.taskId.name || !startDate || !dueDate){
      toast({
        title: ' Incomplete Form.',
        description: 'Fill all the required fields',
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
      return;
    }
    try{
      const updatedTask = {
        customerId: customerId,
        projectOid: projectId,
        phaseOid: taskDetail.phase._id,
        moduleOid: taskDetail.module._id,
        taskOid: taskDetail.task._id,
        updateFields: {
          name: taskName,
          startDate: startDate,
          dueOn: dueDate,
          effortEstimate: effortEstimated,
          taskStatus: status,
          assignTo: userInfo.userName
        }
      }

      if (taskDescription) {
        updatedTask.updateFields.taskDescription = taskDescription;
      }
      const {data} = await axios.patch(`${process.env.REACT_APP_API_URL_CUSTOMER}/api/customer/project/task`,updatedTask);
      toast({
        title: 'Task Updated Successfully.',
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
      setFlag(true);
      setSelectedTask(null);
      setTimeout(()=>{onClose()},1000);

    }catch(e){
      console.log("Error updating Task",e);
    }
  }

  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <Text mb='15px' textAlign='start' p='5px' pl='10px' bg='#389785' color='white' borderRadius='5px' fontSize={{ base: '16px', sm: '18px',md: '25px', lg: '25px' }}>
        {taskDetail.task.taskId.name}
      </Text>
      {console.log("Task Detail: ",taskDetail)}

      <Flex flexDir='row' flexWrap='wrap' gap={4} mb='10px' >
        <Card flexGrow='1' flexBasis='300px'>
        <CardBody>
            <Stack divider={<StackDivider />} spacing='3'>
            <Box>
                <Heading size='xs' textTransform='uppercase' color='#404040'>
                Status
                </Heading>
                <Text pt='2' fontSize={{ base: '12px', sm: '16px',md: '20px', lg: '20px' }}>{taskDetail.task.taskId.task_status || "Onboarded"}</Text>

            </Box>
            <Box>
                <Heading size='xs' textTransform='uppercase' color='#404040'>
                Phase
                </Heading>
                <Text pt='2' fontSize={{ base: '12px', sm: '16px',md: '20px', lg: '20px' }}>
                {taskDetail.phase.phasesId.name}
                </Text>
            </Box>
            <Box>
                <Heading size='xs' textTransform='uppercase' color='#404040'>
                Module
                </Heading>
                <Text pt='2' fontSize={{ base: '12px', sm: '16px',md: '20px', lg: '20px' }}>
                {taskDetail.module.moduleId.name}
                </Text>
            </Box>
            </Stack>
        </CardBody>
        </Card>

        <Card flexGrow='1' flexBasis='300px'>
        <CardBody>
            <Stack divider={<StackDivider />} spacing='3'>
            <Box>
                <Heading size='xs' textTransform='uppercase' color='#404040'>
                Start Date
                </Heading>
                <Text pt='2' fontSize={{ base: '12px', sm: '16px',md: '20px', lg: '20px' }}>
                  {taskDetail.task.taskId.start_date?formatDate(taskDetail.task.taskId.start_date) : helper}</Text>

            </Box>
            <Box>
                <Heading size='xs' textTransform='uppercase' color='#404040'>
                Due On
                </Heading>
                <Text pt='2' fontSize={{ base: '12px', sm: '16px',md: '20px', lg: '20px' }}>
                {taskDetail.task.taskId.due_on? formatDate(taskDetail.task.taskId.due_on): helper}
                </Text>
            </Box>
            <Box>
                <Heading size='xs' textTransform='uppercase' color='#404040'>
                Action
                </Heading>
                <Text pt='2' fontSize={{ base: '12px', sm: '16px',md: '20px', lg: '20px' }}>
                {taskDetail.task.taskId.task_type+" - "}
                {taskDetail.task.taskId.task_solutionid ? (taskDetail.task.taskId.task_solutionid.name) : (taskDetail.task.taskId.task_actionName)} 
                 
                </Text>
            </Box>
            </Stack>
        </CardBody>
        </Card>

        <Card flexGrow='1' flexBasis='300px'>
        <CardBody>
            <Stack divider={<StackDivider />} spacing='3'>
            <Box>
                <Heading size='xs' textTransform='uppercase' color='#404040'>
                Assign To
                </Heading>
                <Text pt='2' fontSize={{ base: '12px', sm: '16px',md: '20px', lg: '20px' }}>{userInfo.userName}</Text>

            </Box>
            <Box>
                <Heading size='xs' textTransform='uppercase' color='#404040'>
                Effort Estimated
                </Heading>
                <Text pt='2' fontSize={{ base: '12px', sm: '16px',md: '20px', lg: '20px' }}>
                {taskDetail.task.taskId.effort_estimate? (taskDetail.task.taskId.effort_estimate+" days") : helper}
                </Text>
            </Box>
            <Box>
                <Heading size='xs' textTransform='uppercase' color='#404040'>
                Playbook
                </Heading>
                <Text pt='2' fontSize={{ base: '12px', sm: '16px',md: '20px', lg: '20px' }} color='blue'>
                Download 
                </Text>
            </Box>
            </Stack>
        </CardBody>
        </Card>  
      </Flex>


      <Card mt='10px' mb='4px'>
        <CardBody>
            <Stack divider={<StackDivider />} spacing='3'>
            <Box>
                <Heading size='xs' textTransform='uppercase' color='#404040'>
                Task Description
                </Heading>
                <Text pt='2' fontSize={{ base: '12px', sm: '16px',md: '20px', lg: '20px' }}>
                    {taskDetail.task.taskId.task_description || helper}
                </Text>

            </Box>
            <Box>
                <Heading size='xs' textTransform='uppercase' color='#404040'>
                History
                </Heading>
                <Text pt='2' fontSize={{ base: '12px', sm: '16px',md: '20px', lg: '20px' }}>
                {taskDetail.phase.phasesId.name}
                </Text>
            </Box>
            </Stack>
        </CardBody>
        </Card>

      <Flex flexDir='row' justifyContent='space-between' mt='10px'>
        <Button leftIcon={<ArrowBack/>} onClick={()=> setSelectedTask(null)}>Back</Button>

        <Flex gap={2}>
        <Button leftIcon={<SettingsSuggestIcon/>} colorScheme='blue'>Execute</Button>
        <Button colorScheme='orange' rightIcon={<LoopIcon/>} onClick={onOpen}>Update</Button>
        <Button colorScheme='red' rightIcon={<DeleteOutlineIcon/>} >Delete</Button>

        </Flex>
      </Flex>


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
          <DrawerHeader>Update Task</DrawerHeader>

          <DrawerBody>
            <FormControl mb={{base: '8px',sm: '8px', lg: '10px'}} isRequired>
                <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700'>Status</FormLabel>
                <Menu>
                    <MenuButton w='100%' as={Flex} variant="outline" colorScheme="gray" color='gray.700' rightIcon={<ChevronDownIcon />} className='menu-button'>
                    <HStack display='flex' justifyContent='space-between'>
                    <Text>{status}</Text>
                    <ChevronDownIcon />
                    </HStack>
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={()=> setStatus('Onboarded')}>Onboarded</MenuItem>
                        <MenuItem onClick={()=> setStatus('Completed')}>Completed</MenuItem>
                        <MenuItem onClick={()=> setStatus('In-progress')}>In-progress</MenuItem>
                        <MenuItem onClick={()=> setStatus('Due')}>Due</MenuItem>
                    </MenuList>
                </Menu>
            </FormControl>

            <FormControl mb={{base: '8px',sm: '8px', lg: '10px'}} isRequired>
                <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700'>Name</FormLabel>
                <Input w='100%' type="text" placeholder="Enter task name" name='name' value={taskName} onChange={(e)=> setTaskName(e.target.value)}/>
            </FormControl>
            
            <FormControl mb={{base: '8px',sm: '8px', lg: '10px'}} isRequired>
                <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700'>Phase</FormLabel>
                <Input w='100%' isDisabled={true} type="text" placeholder="Enter template name" name='name' value={taskDetail.phase.phasesId.name}/>
            </FormControl>

            <FormControl mb={{base: '8px',sm: '8px', lg: '10px'}} isRequired>
                <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700'>Module</FormLabel>
                <Input w='100%' type="text" isDisabled={true} placeholder="Enter template name" name='name' value={taskDetail.module.moduleId.name} />
            </FormControl>

            <FormControl mb={{ base: '8px', sm: '8px', lg: '10px' }} isRequired>
            <FormLabel fontSize={{ base: '14px', sm: '14px', md: '16px', lg: '17px' }} color='gray.700'>Start Date</FormLabel>
            <Input w='100%' type="date" placeholder="Enter template name" name='name' onChange={handleStartDateChange} />
          </FormControl>

          <FormControl mb={{ base: '8px', sm: '8px', lg: '10px' }} isRequired>
            <FormLabel fontSize={{ base: '14px', sm: '14px', md: '16px', lg: '17px' }} color='gray.700'>Due On</FormLabel>
            <Input w='100%' type="date" placeholder="Enter template name" name='name' onChange={handleDueDateChange} />
          </FormControl>

          <FormControl mb={{ base: '8px', sm: '8px', lg: '10px' }} isRequired>
            <FormLabel fontSize={{ base: '14px', sm: '14px', md: '16px', lg: '17px' }} color='gray.700'>Effort Estimated</FormLabel>
            <Input isDisabled={true} w='100%' type="text" placeholder="Effort Estimated" value={effortEstimated+ " Days"}  />
          </FormControl>

            <FormControl mb={{base: '8px',sm: '8px', lg: '10px'}} isRequired>
                <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700'>Assign To</FormLabel>
                <Input isDisabled={true} w='100%' type="text" placeholder="Enter template name" name='name' value={userInfo.userName}/>
            </FormControl>

            {/* <FormControl mb={{base: '8px',sm: '8px', lg: '10px'}} isRequired>
                <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700'>Task Type</FormLabel>
                <Menu>
                    <MenuButton w='100%' as={Flex} variant="outline" colorScheme="gray" color='gray.700' rightIcon={<ChevronDownIcon />} className='menu-button'>
                    <HStack display='flex' justifyContent='space-between'>
                    <Text>{taskType}</Text>
                    <ChevronDownIcon />
                    </HStack>
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={()=> setTaskType("Standard")}>Standard</MenuItem>
                        <MenuItem onClick={()=> setTaskType("Custom")}>Custom</MenuItem>
                    </MenuList>
                </Menu>
            </FormControl>

                {taskType==="Standard" ?
                    (<FormControl mb={{base: '8px',sm: '8px', lg: '10px'}} isRequired>
                    <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700'>Solution</FormLabel>
                            <Menu>
                            <MenuButton w='100%' as={Flex} variant="outline" colorScheme="gray" color='gray.700' rightIcon={<ChevronDownIcon />} className='menu-button'>
                            <HStack display='flex' justifyContent='space-between'>
                            <Text>Solution here</Text>
                            <ChevronDownIcon />
                            </HStack>
                            </MenuButton>
                            <MenuList>
                              {
                                solution && solution.map((val)=> <MenuItem key={val._id} >{val.name}</MenuItem>)
                              }
                          </MenuList>
                        </Menu>
                    </FormControl>) : 

                    (<FormControl mb={{base: '8px',sm: '8px', lg: '10px'}} isRequired>
                    <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700'>Action</FormLabel>
                    <Input w='100%' type="text" placeholder="Enter template name" name='name' />

                    <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700' mt='3px'>Script</FormLabel>
                    <Textarea w='100%' type="text" placeholder="Enter the script" name='name'></Textarea>
                    </FormControl>)
                } */}

                <FormControl mb={{base: '8px',sm: '8px', lg: '10px'}}>
                    <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700' >Description</FormLabel>
                    <Textarea w='100%' type="text" placeholder="Enter the description" name='name' value={taskDescription} onChange={(e)=> setTaskDescription(e.target.value)}></Textarea>
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

    </div>
  );
};

export default TaskDetail;
