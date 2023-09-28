import React, { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Box, Button, Flex, Grid, GridItem, Progress, Text } from '@chakra-ui/react'
import Sidebar from '../components/Sidebar'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import DueDiligence from '../components/DueDiligence'
import SelectTemplate from '../components/SelectTemplate'
import SelectedTemplatePage from '../components/SelectedTemplatePage'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import ProjectTab from '../components/ProjectTab'
import Roadmap from '../components/Roadmap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setPhasesData } from '../features/tabs/phases'

const SelectedProject = () => {
  const [currPage,setCurrPage] = useState(1);
  const navigate = useNavigate();
  const projectData = useSelector((state)=> state.selectDueDiligence.projectData);
  const projectId = useSelector((state)=> state.selectDueDiligence.projectId);
  const formData = useSelector((state)=> state.dueDiligence.formData);

  const dispatch = useDispatch();

  const handleNext = async ()=>{
    try{
      const project = {
        project_name: formData.name
      }
      const customerId = "823kdakj203k42s";
      const {data} = await axios.post(`${process.env.REACT_APP_API_URL_CUSTOMER}/api/customer/${customerId}/project/add/${projectId}`,project);
      const response =  await axios.get(`${process.env.REACT_APP_API_URL_CUSTOMER}/api/customer/${customerId}/project/${data._id}/phases`);
      console.log("Response",response.data);
      dispatch(setPhasesData(response.data));
    }catch(e){
      console.log("Error setting up customer db",e);
     }
    setCurrPage(currPage+1);
  }

  const handlePrevious = ()=>{
    navigate('/newproject');

  }
  return (
    <>
    <Navbar/>
    <Grid templateColumns="repeat(6,1fr)">
      <GridItem colSpan="1">
      <Box w={{ base: 'none',sm: 'none', md: 'none', lg: '255px' }}>
          <Sidebar/>
        </Box>
      </GridItem>

      <GridItem colSpan={{base: '6', sm: '6', md: '6',lg: '5' }} m="25px" mt='15px'>
        {currPage===1 && <Roadmap/>}
        {currPage===2 && <ProjectTab/>}

        {currPage !==2 && <Flex justifyContent='space-between' alignItems="center" mt='15px' >
        <Button leftIcon={<ArrowBackIcon/>} onClick={()=> {handlePrevious()}} >Previous</Button>
        <Flex justifyContent='flex-end' gap='4px'>
          <Button leftIcon={<SettingsSuggestIcon />} onClick={()=> {}} colorScheme='orange'>Customize</Button>
          <Button rightIcon={<ArrowForwardIcon/>} onClick={handleNext} colorScheme='blue'>
            Start Project
          </Button>
        </Flex>
        </Flex>}

    </GridItem>
    </Grid>
    </>
  )
}

export default SelectedProject