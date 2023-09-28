import { Box, Button, Card, CardBody, Flex, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress, Stack, StackDivider, Text, VStack, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import '../../css/user/boxShadow.css'
import { useSelector } from 'react-redux'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LoopIcon from '@mui/icons-material/Loop';
import UpdatePhase from './UpdatePhase';
const Phases = () => {
    const phases = useSelector((state)=> state.phases.phases);
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Flex flexDir='column' gap={2}>
        {phases.map((phaseIn,ind)=> 
            { return phaseIn.map((phase,ind)=>
            <Card key={ind}>
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
                        <span style={{ color: 'gray' }}>Status :</span> <Progress mt={1} w='40%' hasStripe value={64} colorScheme='green'/>
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
            </Card>)}
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