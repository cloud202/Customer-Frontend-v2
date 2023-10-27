import { Box, Button, Card, CardBody, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, FormControl, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress, Stack, StackDivider, Text, Textarea, VStack, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import '../../css/user/boxShadow.css'
import { useSelector } from 'react-redux'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LoopIcon from '@mui/icons-material/Loop';
import UpdatePhase from './UpdatePhase';
import axios from 'axios';
const Phases = () => {
    // const phases = useSelector((state)=> state.phases.phases);
    const [phases,setPhases] = useState([]);
    const [completedTaskCount,setCompletedTaskCount] = useState(0);
  const [totalTaskCount,setTotalTaskCount] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const customerId = useSelector((state)=> state.token.customerId)
  const projectId = useSelector((state)=> state.selectDueDiligence.projectId);
  const toast = useToast();

  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [effortEstimated, setEffortEstimated] = useState('');

  const [name,setName] = useState('');
  const [details,setDetails] = useState('');
  const [loading,setLoading] = useState(false);
  const [phaseId,setPhaseId] = useState(null);
  const btnRef = React.useRef()

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0');
    
    // Combine components in the desired format
    return `${year}-${month}-${day}`;
  }


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

  const handleSubmit = async()=>{
    if(!name || !details || !startDate || !dueDate){
      toast({
        title: 'Incomplete Form',
        description: "All Fields Required",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return;
    }
    try{
      setLoading(true);

      const updatePhase = {
          "customerId": customerId,
          "projectOid": projectId,
          "phaseOid": phaseId,
          "updateFields":{
              "name": name,
              "description": details,
              "startDate": startDate,
              "dueOn": dueDate,
          }
      }

      const {data}  = await axios.patch(`${process.env.REACT_APP_API_URL_CUSTOMER}/api/customer/project/phase`,updatePhase);
      
      toast({
        title: 'Phase Updated Successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      setName('');
      setStartDate('');
      setDueDate('');
      setDetails('');
      setEffortEstimated('');

      setLoading(false);
      onClose();
      fetchPhases();
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

  useEffect(() => {
    calculateEffortEstimated();
  }, [startDate, dueDate]);

  const handleUpdate = (phase)=>{
    console.log('phase',phase);
    setName(phase.phasesId.name)
    setDetails(phase.phasesId.description);
    setPhaseId(phase._id);

    var start_date = phase.phasesId.start_date;
    var end_date = phase.phasesId.due_on;

    if(start_date){
      var temp1=formatDate(start_date);
      var temp2 =formatDate(end_date);
      setStartDate(temp1);
      setDueDate(temp2);
    }else{
      setStartDate('');
      setDueDate('');
    }
    onOpen();
  }

  function progressCalc(phase){
    let newCompletedTaskCount = 0;
    let newTotalTaskCount = 0;
         const modules = phase.modules || [];
         modules.forEach(module => {
             const tasks = module.tasks || [];
             tasks.forEach(task => {
                 newTotalTaskCount++;
                 const taskStatus = task.taskId && task.taskId.task_status;
                 if (taskStatus==="Completed") {
                   newCompletedTaskCount++;
                 }
             });
    
        });
        
        return Math.floor((newCompletedTaskCount/newTotalTaskCount)*100);
  }

    async function fetchPhases(){
        try{
          // const {data} = await axios.get(`${process.env.REACT_APP_API_URL_CUSTOMER}/api/customer/${customerId}/project/${projectId}/phases`);
          const {data} = await axios.get(`${process.env.REACT_APP_API_URL_CUSTOMER}/api/customer/project/${projectId}/phases`);
            setPhases(data)
        }catch(e){
          console.log("Error fetching task",e);
        }
      }

      useEffect(()=>{
        fetchPhases();
      },[fetchPhases])
    
  return (
    <Flex flexDir='column' gap={2}>
        {phases && phases.map((phase,ind)=> 
        {   var progress= progressCalc(phase);
            return <Card key={ind}>
                <CardBody>
                    <Stack divider={<StackDivider />} spacing='4'>
                    <Box>
                        <Text textTransform='uppercase' fontSize='lg' fontWeight={500}>
                        {phase.phasesId.name}
                        </Text>
                        <Text pt='2' fontWeight={500}>
                        <span style={{ color: 'gray' }}>Description :</span> {phase.phasesId.description}
                        </Text>
                        <Box fontWeight={500} display='flex' flexDir='row' alignItems='center' gap={2}>

                            <span style={{ color: 'gray' }}>Status : {progress}%</span> <Progress mt={1} w='40%' hasStripe value={progress} colorScheme={
                                progress<30? 'red' :
                                (progress<60? 'orange': 'green')
                            }/>
                        
                        </Box>

                        <Text pt='2' fontWeight={500}>
                        <span style={{ color: 'gray' }}>Modules :</span> {phase.modules.map((module)=> module.moduleId.name).join(', ')}
                        </Text>

                        <Text pt='2' fontWeight={500}>
                        <span style={{ color: 'gray' }}>Tasks</span> 
                            <Box ml='12px'>

                            {phase.modules.map((module)=> 
                                    module.tasks.map((task)=> 
                                    <li>{task.taskId.name}</li>))}
                                    </Box>
                        </Text>

                        <Text pt='2' fontWeight={500}>
                        <span style={{ color: 'gray' }}>Solution Integrated :</span> {phase.modules.map((module)=> 
                                    module.tasks.map((task)=> 
                                    task.taskId.task_solutionid?.name || task.taskId.task_actionName)).join(', ')}
                        </Text>

                        <Box display='flex' justifyContent='flex-end' gap={2} mt='8px'>
                            <Button colorScheme='orange' rightIcon={<LoopIcon/>} size='sm' onClick={()=>handleUpdate(phase)}>Update</Button>
                            <Button colorScheme='red' rightIcon={<DeleteOutlineIcon/>} size='sm'>Delete</Button>
                        </Box>
                    </Box>
                    </Stack>
                </CardBody>
            </Card>}
        )}

            <Drawer
        isOpen={isOpen}
        placement='bottom'
        onClose={onClose}
        size='sm'
        finalFocusRef={btnRef}
      >
        <DrawerOverlay/>
        <DrawerContent>
          <DrawerCloseButton/>
          <DrawerHeader>Update Phase</DrawerHeader>

          <DrawerBody>

            <FormControl mb={{base: '8px',sm: '8px', lg: '10px'}} isRequired>
                <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700'>Phase Name</FormLabel>
                <Input w='100%' type="text" placeholder="Enter phase name" name='name' value={name} onChange={(e)=> setName(e.target.value)}/>
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
                <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700'>Phase Description</FormLabel>
                <Textarea w='100%' type="text" placeholder="Enter phase description" name='name' value={details} onChange={(e)=> setDetails(e.target.value)}></Textarea>
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
    </Flex>


  )
}

export default Phases