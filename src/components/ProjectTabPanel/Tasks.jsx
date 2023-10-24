import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from '@chakra-ui/react';
import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import FilterListIcon from '@mui/icons-material/FilterList';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LoopIcon from '@mui/icons-material/Loop';
import TaskDetail from './TaskDetail';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const Tasks = ({flag,setSelectedTask,setTaskDetail}) => {
    const navigate = useNavigate();
    const [task,setTask] = useState([])
    const customerId = useSelector((state)=> state.token.customerId)
    const projectId = useSelector((state)=> state.selectDueDiligence.projectId);
    // const projectData = useSelector((state) => state.phases.phases);
    const [projectData,setProjectData] = useState(null);
    const [loading,setLoading] = useState(true);
    
    const handleSelect = (phase,module,task)=>{
      setTaskDetail({
        phase,
        module,
        task
      })
      setSelectedTask(task);
      
    }

    async function fetchData(){
      try{
        const {data} = await axios.get(`${process.env.REACT_APP_API_URL_CUSTOMER}/api/customer/project/${projectId}/phases`);
        // const {data} = await axios.get(`${process.env.REACT_APP_API_URL_CUSTOMER}/api/customer/${customerId}/project/${projectId}/phases`);
        setProjectData(data);
      }catch(e){
        console.log("Error fetching task",e);
      }
      setLoading(false);
    }
    useEffect(()=>{
      fetchData();
    },[])

    return (
      <Box> 
        <Box mb="20px" display='flex' gap={2} flexWrap='wrap'>
          <InputGroup mb="8px" gap={2} maxW='400px'>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Search Tasks"
               />
          </InputGroup>

          <Box display='flex' gap={2} mb='6px' flexWrap='wrap'>
          <Menu >
            <MenuButton as={Button} rightIcon={<FilterListIcon />}>
                All Phases
            </MenuButton>
            <MenuList>
                <MenuItem>All Phases</MenuItem>
            </MenuList>
            </Menu>

        <Menu>
            <MenuButton as={Button} rightIcon={<FilterListIcon />}>
                All Modules
            </MenuButton>
            <MenuList>
            <MenuItem >All Modules</MenuItem>
            </MenuList>
            </Menu>
        </Box>
        </Box>

    {loading? (
      <Flex justifyContent ='center'>
        <Spinner/>
      </Flex>) : 
      <Flex flexDir='row' flexGrow='1' gap={0} style={{border: '1px solid #d2d3d4'}}>
        <Flex flexDir='column' style={{borderRight: '1px solid #d2d3d4'}}  flexGrow='1' flexBasis= '100%' >
            <Text color='#45474B' backgroundColor='#F5F7F8' fontWeight='500' p='4px' fontSize='md' borderBottom='1px solid #d2d3d4'>Onboarded</Text>
            <Flex flexDir='column'>
                {projectData &&
                projectData.map((phase) =>
                phase.modules.map((module, ind) => {
                    return module.tasks.map((task, ind) => (
                        (task.taskId.task_status === 'Onboarded' || !task.taskId.task_status) && (
                        <Flex p='6px' flexDir='column' style={{ backgroundColor: 'white',borderBottom: '1px solid #d2d3d4',color: '#3366CC'}} onClick={() => handleSelect(phase, module, task)}>
                            <Tooltip label={task.taskId.name}>
                            <Text maxWidth={{base: '80px',sm: '100px',md: '130px',lg: '190px'}} style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',cursor: 'pointer'}}>{task.taskId.name}</Text>
                            </Tooltip>
                        </Flex>)))}))}
            </Flex>
        </Flex>

        <Flex flexDir='column' style={{borderRight: '1px solid #d2d3d4'}}  flexGrow='1' flexBasis= '100%'>
            <Text color='#45474B' backgroundColor='#F5F7F8' fontWeight='500' p='4px' fontSize='md' borderBottom='1px solid #d2d3d4'>Completed</Text>
            <Flex flexDir='column'>
                {projectData &&
                projectData.map((phase) =>
                phase.modules.map((module, ind) => {
                    return module.tasks.map((task, ind) => (
                        (task.taskId.task_status === 'Completed') && (
                            <Flex p='6px' flexDir='column' style={{ backgroundColor: 'white',borderBottom: '1px solid #d2d3d4',color: '#3366CC'}} onClick={() => handleSelect(phase, module, task)}>
                            <Tooltip label={task.taskId.name}>
                            <Text maxWidth={{base: '80px',sm: '100px',md: '130px',lg: '190px'}} style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',cursor: 'pointer'}}>{task.taskId.name}</Text>
                            </Tooltip>
                        </Flex>)))}))}
            </Flex>
        </Flex>

        <Flex flexDir='column' style={{borderRight: '1px solid #d2d3d4'}}  flexGrow='1' flexBasis= '100%'>
            <Text color='#45474B' backgroundColor='#F5F7F8' fontWeight='500' p='4px' fontSize='md' borderBottom='1px solid #d2d3d4'>InProgress</Text>
            <Flex flexDir='column'>
                {projectData &&
                projectData.map((phase) =>
                phase.modules.map((module, ind) => {
                    return module.tasks.map((task, ind) => (
                        (task.taskId.task_status === 'In-progress') && (
                            <Flex p='6px' flexDir='column' style={{ backgroundColor: 'white',borderBottom: '1px solid #d2d3d4',color: '#3366CC'}} onClick={() => handleSelect(phase, module, task)}>
                            <Tooltip label={task.taskId.name}>
                            <Text maxWidth={{base: '80px',sm: '100px',md: '130px',lg: '190px'}} style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',cursor: 'pointer'}}>{task.taskId.name}</Text>
                            </Tooltip>
                        </Flex>)))}))}
            </Flex>
        </Flex>

        <Flex flexDir='column' flexGrow='1' flexBasis= '100%'>
            <Text color='#45474B' backgroundColor='#F5F7F8' fontWeight='500' p='4px' fontSize='md' borderBottom='1px solid #d2d3d4'>Due</Text>
            <Flex flexDir='column'>
                {projectData &&
                projectData.map((phase) =>
                phase.modules.map((module, ind) => {
                    return module.tasks.map((task, ind) => (
                        (task.taskId.task_status === 'Due') && (
                            <Flex p='6px' flexDir='column' style={{ backgroundColor: 'white',borderBottom: '1px solid #d2d3d4',color: '#3366CC'}} onClick={() => handleSelect(phase, module, task)}>
                            <Tooltip label={task.taskId.name}>
                            <Text maxWidth={{base: '80px',sm: '100px',md: '130px',lg: '190px'}} style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',cursor: 'pointer'}}>{task.taskId.name}</Text>
                            </Tooltip>
                        </Flex>)))}))}
            </Flex>
        </Flex>

      </Flex>}
    </Box>
    );
  };
  
  export default Tasks;
  