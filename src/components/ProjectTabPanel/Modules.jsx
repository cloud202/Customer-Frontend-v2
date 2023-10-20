import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import AddIcon from '@mui/icons-material/Add';
import ReorderIcon from '@mui/icons-material/Reorder';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LoopIcon from '@mui/icons-material/Loop';
import '../../css/user/moduleTable.css'
import axios from 'axios';

const Modules = () => {
  // const phases = useSelector((state)=> state.phases.phases);
  const [phases,setPhases] = useState([]);
  const projectId = useSelector((state)=> state.selectDueDiligence.projectId);
  const customerId = useSelector((state)=> state.token.customerId)

  const [searchQueries, setSearchQueries] = useState(
    Array.from({ length: phases.length }, () => '')
  );
  

  const updateSearchQuery = (index, value) => {
    const updatedQueries = [...searchQueries];
    updatedQueries[index] = value;
    setSearchQueries(updatedQueries);
  };

  const filteredModules = (modules, query) => {
    if (!query) {
      return modules;
    }
  
    return modules.filter((module) =>
      module.moduleId.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  function progressCalc(module){
    let newCompletedTaskCount = 0;
    let newTotalTaskCount = 0;
             const tasks = module.tasks || [];
             tasks.forEach(task => {
                 newTotalTaskCount++;
                 const taskStatus = task.taskId && task.taskId.task_status;
                 if (taskStatus==="Completed") {
                   newCompletedTaskCount++;
                 }
             });
        
        return Math.floor((newCompletedTaskCount/newTotalTaskCount)*100);
  }

  async function fetchPhases(){
    try{
      const {data} = await axios.get(`${process.env.REACT_APP_API_URL_CUSTOMER}/api/customer/project/${projectId}/phases`);
      // const {data} = await axios.get(`${process.env.REACT_APP_API_URL_CUSTOMER}/api/customer/${customerId}/project/${projectId}/phases`);
        setPhases(data)
    }catch(e){
      console.log("Error fetching task",e);
    }
  }

  useEffect(()=>{
    fetchPhases();
  },[fetchPhases])
  

  return (
    <Box>
      {phases && phases.map((phase, ind) => 
      (
        <Box key={ind} mb="20px">
          <Text textTransform="uppercase" fontSize="lg" fontWeight={500}>
            <span style={{ color: 'gray' }}>Phase : </span>
            {phase.phasesId.name}
          </Text>
          <InputGroup mt="8px" mb="8px" gap={2} flexWrap="wrap">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="tel"
              placeholder="Search Module"
              w="70%"
              value={searchQueries[ind]}
              onChange={(e) => updateSearchQuery(ind, e.target.value)}
            />
            <Box display="flex" gap={2}>
              <Button
                colorScheme="blue"
                rightIcon={<AddIcon />}
                size={{ base: 'sm', sm: 'md', lg: 'md' }}
              >
                Add Module
              </Button>
              <Button
                colorScheme="purple"
                variant="outline"
                rightIcon={<ReorderIcon />}
                size={{ base: 'sm', sm: 'md', lg: 'md' }}
              >
                Reorder
              </Button>
            </Box>
          </InputGroup>
          <table style={{ width: '100%' }} className='module-table'>
            <thead>
              <tr >
                <th className='module-heading'>Name</th>
                <th className='module-heading'>Description</th>
                <th className='module-heading'>Status</th>
                <th className='module-heading'>Operation</th>
              </tr>
            </thead>
            <tbody>
              {filteredModules(phase.modules, searchQueries[ind]).map((module, ind) => 
                { let progress = progressCalc(module);
                  return <tr key={ind}>
                  <td className='module-data'>{module.moduleId.name}</td>
                  <td className='module-data'>{module.moduleId.description}</td>
                  <td className='module-data'>
                    <span style={{ color: progress<30? '#c90606': (progress<60? '#f29900':'green'), fontWeight: 'bold' }}>
                    {progress}
                      % Completed
                    </span>
                  </td>
                  <td className='module-data'>
                    <Box display="flex" gap={1} flexWrap="wrap">
                      <Button
                        colorScheme="orange"
                        rightIcon={<LoopIcon fontSize="small" />}
                        size="xs"
                      >
                        Update
                      </Button>
                      <Button
                        colorScheme="red"
                        rightIcon={<DeleteOutlineIcon fontSize="small" />}
                        size="xs"
                      >
                        Delete
                      </Button>
                    </Box>
                  </td>
                </tr>}
              )}
            </tbody>
          </table>
          <Divider mt='12px'/>
        </Box>
      )
      )}
    </Box>
  );
};

export default Modules;
