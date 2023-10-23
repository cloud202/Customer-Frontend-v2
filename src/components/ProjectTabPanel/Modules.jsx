import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Textarea,
  useDisclosure,
  useToast,
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

  const toast = useToast();
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [effortEstimated, setEffortEstimated] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name,setName] = useState('');
  const [details,setDetails] = useState('');
  const [loading,setLoading] = useState(false);
  const [phaseId,setPhaseId] = useState(null);
  const [moduleId,setModuleId] = useState(null);
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
  useEffect(() => {
    calculateEffortEstimated();
  }, [startDate, dueDate]);

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

      const updateModule = {
          "projectOid": projectId,
          "phaseOid": phaseId,
          "moduleOid": moduleId,
          "updateFields":{
              "name": name,
              "description": details,
              "scope": "none",
              "startDate": startDate,
              "dueOn": dueDate,
          }
      }

      const {data}  = await axios.patch(`${process.env.REACT_APP_API_URL_CUSTOMER}/api/customer/project/module`,updateModule);
      
      toast({
        title: 'Module Updated Successfully.',
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

  const handleUpdate = (phaseId,module)=>{
    setName(module.moduleId.name)
    setDetails(module.moduleId.description);
    setPhaseId(phaseId);
    setModuleId(module._id);

    var start_date = module.moduleId.start_date;
    var end_date = module.moduleId.due_on;

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
                        onClick={()=>handleUpdate(phase._id,module)}
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
    </Box>
  );
};

export default Modules;
