import React, { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Box, Button, Flex, Grid, GridItem, Progress, Text } from '@chakra-ui/react'
import Sidebar from '../components/Sidebar'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import DueDiligence from '../components/DueDiligence'
import SelectTemplate from '../components/SelectTemplate'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import ProjectTab from '../components/ProjectTab'
import Roadmap from '../components/Roadmap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setPhasesData } from '../features/tabs/phases'
import { setResponseData } from '../features/tabs/dueDiligenceResponse'
import { resetProjectId, setProjectId } from '../features/formData/selectDueDiligence'

const SelectedProject = () => {
  const [currPage,setCurrPage] = useState(1);
  const navigate = useNavigate();
  const projectData = useSelector((state)=> state.selectDueDiligence.projectData);
  const projectId = useSelector((state)=> state.selectDueDiligence.projectId);
  const formData = useSelector((state)=> state.dueDiligence.formData);
  const postData = useSelector((state)=> state.dueDiligence.postData);
  const customerId = useSelector((state)=> state.token.customerId);

  const dispatch = useDispatch();

  const handleNext = async ()=>{
    try{
      const project = {
          "project_name": formData.name,
          "project_industry_id": postData.industry_id,
          "project_CAP": formData.cloudApproach,
          "project_TS": formData.techStack,
          "project_WT": formData.workloadType
      }
      console.log(`${process.env.REACT_APP_API_URL_CUSTOMER}/api/customer/${customerId}/project/add/${projectId}`)
      const {data} = await axios.post(`${process.env.REACT_APP_API_URL_CUSTOMER}/api/customer/${customerId}/project/add/${projectId}`,project);
      // const {data} = await axios.post(`${process.env.REACT_APP_API_URL_CUSTOMER}/api/customer/${customerId}/project/add/${projectId}`,project);
      // const response =  await axios.get(`${process.env.REACT_APP_API_URL_CUSTOMER}/api/customer/${customerId}/project/${data._id}/phases`);

      const projectResponse = {
        "project_name": data.project_name,
        "project_industry": data.project_industry.name,
        "project_CAP": data.project_CAP,
        "project_TS": data.project_TS,
        "project_WT": data.project_WT
    }

      dispatch(setResponseData(projectResponse));
      dispatch(setPhasesData(data.phases));
      dispatch(resetProjectId());
      dispatch(setProjectId(data._id));
      console.log("New data",projectResponse);
      
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
          <Button leftIcon={<SettingsSuggestIcon />} onClick={()=> {}} colorScheme='teal'>Customize</Button>
          <Button rightIcon={<ArrowForwardIcon/>} onClick={handleNext} colorScheme='facebook'>
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