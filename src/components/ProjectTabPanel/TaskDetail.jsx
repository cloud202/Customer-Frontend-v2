import { Box, Button, Card, CardBody, CardHeader, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, FormControl, FormLabel, HStack, Heading, Input, Menu, MenuButton, MenuItem, MenuList, Stack, StackDivider, Text, Textarea, useDisclosure } from '@chakra-ui/react';
import { ArrowBack } from '@mui/icons-material';
import React, { useCallback, useEffect, useState } from 'react';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LoopIcon from '@mui/icons-material/Loop';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ChevronDownIcon } from '@chakra-ui/icons';
import axios from 'axios';

const TaskDetail = ({selectedTask,setSelectedTask,taskDetail}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  const [taskType,setTaskType] = useState(`${taskDetail.task.taskId.task_type}`);
  const [solution,setSolution] = useState(null);

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
                <Text pt='2' fontSize={{ base: '12px', sm: '16px',md: '20px', lg: '20px' }}>Unkown</Text>

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
                <Text pt='2' fontSize={{ base: '12px', sm: '16px',md: '20px', lg: '20px' }}>1 Oct,2023</Text>

            </Box>
            <Box>
                <Heading size='xs' textTransform='uppercase' color='#404040'>
                Due On
                </Heading>
                <Text pt='2' fontSize={{ base: '12px', sm: '16px',md: '20px', lg: '20px' }}>
                9 Oct,2023
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
                <Text pt='2' fontSize={{ base: '12px', sm: '16px',md: '20px', lg: '20px' }}>Unkown</Text>

            </Box>
            <Box>
                <Heading size='xs' textTransform='uppercase' color='#404040'>
                Effort Estimated
                </Heading>
                <Text pt='2' fontSize={{ base: '12px', sm: '16px',md: '20px', lg: '20px' }}>
                {taskDetail.phase.phasesId.name}
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
                    {taskDetail.module.moduleId.description}
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
                <Input w='100%' type="text" placeholder="Enter template name" name='name' />
            </FormControl>

            <FormControl mb={{base: '8px',sm: '8px', lg: '10px'}} isRequired>
                <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700'>Phase</FormLabel>
                <Input w='100%' type="text" placeholder="Enter template name" name='name' value={taskDetail.phase.phasesId.name} />
            </FormControl>

            <FormControl mb={{base: '8px',sm: '8px', lg: '10px'}} isRequired>
                <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700'>Module</FormLabel>
                <Input w='100%' type="text" placeholder="Enter template name" name='name' value={taskDetail.module.moduleId.name} />
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
                <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700'>Effort Estimated</FormLabel>
                <Input w='100%' type="text" placeholder="Enter template name" name='name' />
            </FormControl>

            <FormControl mb={{base: '8px',sm: '8px', lg: '10px'}} isRequired>
                <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700'>Assign To</FormLabel>
                <Input w='100%' type="text" placeholder="Enter template name" name='name' />
            </FormControl>

            <FormControl mb={{base: '8px',sm: '8px', lg: '10px'}} isRequired>
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
                }
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

    </div>
  );
};

export default TaskDetail;
