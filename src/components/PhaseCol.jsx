import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const PhaseCol = ({phase,num}) => {
  return (
    <>
<Flex flexDir='column' minW='300px' style={{backgroundColor: '#edf0ee',borderRadius: '5px'}} flexGrow='1'>
    <Flex mt='4px' mb='6px' p='10px' style={{borderBottom: '3px solid white'}} justifyContent='center'>
        <Text fontWeight='500' fontSize='20px' color='gray.800'> 
            Phase {num+1} : {phase.phasesId.name}
        </Text>
    </Flex>
    <Box p='10px' >
        {phase.modules.map((module, index) => (
            <Box mb='12px' p='6px' style={{ backgroundColor: '#fcfcfc',borderRadius: '5px'}}>
                <Text fontWeight='500' fontSize='18px' color='gray.800' p='6px' mb='2px'>{module.moduleId.name}</Text>
                <Box>
                    {module.tasks.map((taskList, taskIndex) => (
                        <li key={taskIndex}>
                            {taskList.taskId.name}
                        </li>
                    ))}
                </Box>
            </Box>
        ))}

        <Flex flexDir='column' p='8px' style={{backgroundColor: '#fcfcfc',borderRadius: '5px'}}>
            <Text fontWeight={500} mb='6px' color='gray.500'>Solution/Script Leveraged</Text>

        <Flex gap={2} mb={2} flexWrap='wrap'>
                {
                    phase.modules.map((module,index)=>(
                        module.tasks.map((taskList, taskInd) => (
                            <div key={taskInd}>
                            {taskList.taskId.task_type === "Custom" && (
                                <Flex bg='#3182CE' borderRadius='5px' p='8px' pl='10px' pr='10px' color='white' fontWeight='500'>{taskList.taskId.task_actionName}</Flex>
                                )}
                            {taskList.taskId.task_type === "Standard" && (
                                <Flex bg='#DD6B20' borderRadius='5px' p='8px' pl='10px' pr='10px' color='white' fontWeight='500'>{taskList.taskId.task_solutionid.name}</Flex>
                                )}
                        </div>
                        ))
                        ))      
                    }
                    </Flex>   
            </Flex>
            </Box>
        </Flex>
    
    </>
  )
}

export default PhaseCol