import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import FilterListIcon from '@mui/icons-material/FilterList';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LoopIcon from '@mui/icons-material/Loop';

const Tasks = () => {
    const projectData = useSelector((state) => state.selectDueDiligence.projectData);
    console.log("Project data is ",projectData);
  
    const [searchQueries, setSearchQueries] = useState('');
    const [phaseFilter,setPhaseFilter] = useState('All Phases');
    const [moduleFilter,setModuleFilter] = useState('All Modules');
  
    const filteredTasks = (tasks, query) => {
      return tasks.filter((task) =>
        task.taskId.name.toLowerCase().includes(query.toLowerCase())
      );
    };
  
    const searchedTasks = filteredTasks(
      projectData.phases.reduce((acc, phase) => {
        return acc.concat(
          phase.modules.reduce((moduleAcc, module) => {
            return moduleAcc.concat(
              module.tasks.map((task) => ({
                ...task,
                phase: phase.phasesId.name,
                module: module.moduleId.name,
              }))
            );
          }, [])
        );
      }, []),
      searchQueries
    );
  
    return (
      <Box> 
        <Box mb="20px" display='flex' gap={2} flexWrap='wrap'>
          <InputGroup mb="8px" gap={2} maxW='400px'>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Search Tasks"
              value={searchQueries}
              onChange={(e) => setSearchQueries(e.target.value)}
            />
          </InputGroup>

          <Box display='flex' gap={2} mb='6px' flexWrap='wrap'>
          <Menu >
            <MenuButton as={Button} rightIcon={<FilterListIcon />}>
                {phaseFilter}
            </MenuButton>
            <MenuList>
                <MenuItem onClick={()=> setPhaseFilter('All Phases')}>All Phases</MenuItem>
                {projectData.phases.map((phase,ind)=> <MenuItem key={ind} onClick={()=> setPhaseFilter(phase.phasesId.name)}>{phase.phasesId.name}</MenuItem>)}
            </MenuList>
            </Menu>

        <Menu>
            <MenuButton as={Button} rightIcon={<FilterListIcon />}>
                {moduleFilter}
            </MenuButton>
            <MenuList>
            <MenuItem onClick={()=>setModuleFilter('All Modules')}>All Modules</MenuItem>
            
            {projectData.phases.map((phase)=>  
                phase.modules.map((module,ind)=>
                    <MenuItem key={ind} onClick={()=> setModuleFilter(module.moduleId.name)}>{module.moduleId.name}</MenuItem>))}
            </MenuList>
            </Menu>
        </Box>
        </Box>
  
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Onboarded</th>
                <th>Completed</th>
                <th>In-progress</th>
                <th>Due</th>
              </tr>
            </thead>
            <tbody>
              {searchedTasks.map((task, ind) => (
                <tr key={ind}>
                  <td>{task.taskId.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
    );
  };
  
  export default Tasks;
  