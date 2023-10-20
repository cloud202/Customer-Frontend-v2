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
  
          {/* <table style={{ width: '100%',border: '1px solid gray',borderRadius: '5px' }}>
            <thead>
                <tr style={{border: '1px solid #d2d3d4',borderRadius: '5px',bg:'gray' }}>
                <th style={{border: '1px solid #d2d3d4',backgroundColor: '#EDF2F7',fontWeight: '500'}}>Onboarded</th>
                <th style={{border: '1px solid #d2d3d4',backgroundColor: '#EDF2F7',fontWeight: '500'}}>Completed</th>
                <th style={{border: '1px solid #d2d3d4',backgroundColor: '#EDF2F7',fontWeight: '500'}}>In-progress</th>
                <th style={{border: '1px solid #d2d3d4',backgroundColor: '#EDF2F7',fontWeight: '500'}}>Due</th>
              </tr>
            </thead>
            <tbody>
            {
            projectData && projectData.map((phase)=> 
                phase.modules.map((module,ind)=>
                    {
                        return module.tasks.map((task,ind)=> 
                            <tr style={{border: '1px solid #d2d3d4',borderRadius: '5px' }}>
                            <td style={{border: '1px solid #d2d3d4',borderRadius: '5px',color: '#3366CC',cursor: 'pointer' }} onClick={()=>handleSelect(phase,module,task)}>{task.taskId.name}</td>
                            </tr>)
                    })
                  )
            }
            </tbody>
          </table> */}

      {loading? (
      <Flex justifyContent ='center'>
        <Spinner/>
      </Flex>) : 
      <table style={{ width: '100%', border: '1px solid gray', borderRadius: '5px' }}>
        <thead>
          <tr style={{ border: '1px solid #d2d3d4', borderRadius: '5px', bg: 'gray' }}>
            <th style={{ border: '1px solid #d2d3d4', backgroundColor: '#EDF2F7', fontWeight: '500' }}>Onboarded</th>
            <th style={{ border: '1px solid #d2d3d4', backgroundColor: '#EDF2F7', fontWeight: '500' }}>Completed</th>
            <th style={{ border: '1px solid #d2d3d4', backgroundColor: '#EDF2F7', fontWeight: '500' }}>In-progress</th>
            <th style={{ border: '1px solid #d2d3d4', backgroundColor: '#EDF2F7', fontWeight: '500' }}>Due</th>
          </tr>
        </thead>
        <tbody>
          {projectData &&
            projectData.map((phase) =>
              phase.modules.map((module, ind) => {
                return module.tasks.map((task, ind) => (
                  <tr style={{ border: '1px solid #d2d3d4', borderRadius: '5px' }}>
                    {(task.taskId.task_status === 'Onboarded' || !task.taskId.task_status) ? (
                      <td style={{ border: '1px solid #d2d3d4', borderRadius: '5px', color: '#3366CC', cursor: 'pointer' }} onClick={() => handleSelect(phase, module, task)}>
                        {task.taskId.name}
                      </td>
                    ): (<td style={{ border: '1px solid #d2d3d4', borderRadius: '5px', color: '#3366CC', cursor: 'pointer' }} onClick={() => handleSelect(phase, module, task)}>
                    -
                  </td>)}

                    {task.taskId.task_status === 'Completed'? (
                      <td style={{ border: '1px solid #d2d3d4', borderRadius: '5px', color: '#3366CC', cursor: 'pointer' }} onClick={() => handleSelect(phase, module, task)}>
                        {task.taskId.name}
                      </td>
                    ): 
                    <td style={{ border: '1px solid #d2d3d4', borderRadius: '5px', color: '#3366CC', cursor: 'pointer' }} onClick={() => handleSelect(phase, module, task)}>
                    - 
                  </td>}

                    {task.taskId.task_status === 'In-progress'?(
                      <td style={{ border: '1px solid #d2d3d4', borderRadius: '5px', color: '#3366CC', cursor: 'pointer' }} onClick={() => handleSelect(phase, module, task)}>
                        {task.taskId.name}
                      </td>
                    ): <td style={{ border: '1px solid #d2d3d4', borderRadius: '5px', color: '#3366CC', cursor: 'pointer' }} onClick={() => handleSelect(phase, module, task)}>
                    -
                  </td>}

                    {task.taskId.task_status === 'Due'? (
                      <td style={{ border: '1px solid #d2d3d4', borderRadius: '5px', color: '#3366CC', cursor: 'pointer' }} onClick={() => handleSelect(phase, module, task)}>
                        {task.taskId.name}
                      </td>
                    ): (<td style={{ border: '1px solid #d2d3d4', borderRadius: '5px', color: '#3366CC', cursor: 'pointer' }} onClick={() => handleSelect(phase, module, task)}>
                    -
                  </td>)}

                  
                  </tr>
                ));
              })
            )}
        </tbody>
      </table>}


        </Box>
    );
  };
  
  export default Tasks;
  