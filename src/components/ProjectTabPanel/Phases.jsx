import { Box, Button, Card, CardBody, Flex, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress, Stack, StackDivider, Text, VStack, useDisclosure } from '@chakra-ui/react'
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
          const {data} = await axios.get(`${process.env.REACT_APP_API_URL_CUSTOMER}/api/customer/${customerId}/project/${projectId}/phases`);
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
                        <span style={{ color: 'gray' }}>Tasks :</span> {phase.modules.map((module)=> 
                                    module.tasks.map((task)=> 
                                    task.taskId.name)).join(', ') }
                        </Text>

                        <Text pt='2' fontWeight={500}>
                        <span style={{ color: 'gray' }}>Solution Integrated :</span> {phase.modules.map((module)=> 
                                    module.tasks.map((task)=> 
                                    task.taskId.task_solutionid?.name || task.taskId.task_actionName)).join(', ')}
                        </Text>

                        <Box display='flex' justifyContent='flex-end' gap={2} mt='8px'>
                            <Button colorScheme='orange' rightIcon={<LoopIcon/>} size='sm' onClick={onOpen}>Update</Button>
                            <Button colorScheme='red' rightIcon={<DeleteOutlineIcon/>} size='sm'>Delete</Button>
                        </Box>
                    </Box>
                    </Stack>
                </CardBody>
            </Card>}
        )}
        
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
            <ModalHeader>Update Phase</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <UpdatePhase/>
            </ModalBody>

            <ModalFooter>
                <Button mr={3} colorScheme='orange'>
                Update
                </Button>
                <Button variant='ghost' onClick={onClose}>Close</Button>
            </ModalFooter>
            </ModalContent>
            </Modal>
    </Flex>


  )
}

export default Phases