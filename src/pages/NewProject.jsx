import React, { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Box, Button, Flex, Grid, GridItem, Progress, Text, useToast } from '@chakra-ui/react'
import Sidebar from '../components/Sidebar'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import DueDiligence from '../components/DueDiligence'
import SelectTemplate from '../components/SelectTemplate'
import axios from 'axios'
import { useSelector } from 'react-redux'

const NewProject = () => {
  const [currPage,setCurrPage] = useState(1);
  const [tableData,setTableData] = useState([]);
  const toast = useToast();
  const postData = useSelector((state)=> state.dueDiligence.postData);
  const formData = useSelector((state)=> state.dueDiligence.formData);

  const handleNext =()=>{

    if(!formData.name || formData.workloadInScope==='Select an option' || 
        formData.cloudApproach==='Select an option' || formData.industry==='Select an option' || (formData.workloadType.length<1) || (formData.techStack.length<1)){
      toast({
        title: 'Incomplete Form',
        description: "Please fill all the required fields.",
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
      return ;
    }
    setCurrPage(currPage+1);
  }

  const handlePrevious = ()=>{
    setCurrPage(currPage-1);
  }

  const handleTemplate = async ()=>{
    try{
      if(!(postData.industry_id || postData.type_id)){
        return;
      }
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/client/template_preferences/indtype`,postData);
      setTableData(response.data);
    }catch(e){
      console.log("Error getting template",e);
    }
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

      <GridItem colSpan={{base: '6', sm: '6', md: '6',lg: '5' }} m={{base: '12px',sm: '12px',md: "25px",lg: '25px'}} mt='15px'>
        {/* <Progress value={100/5 * currPage} size='md' colorScheme='green' mb='10px'/> */}

        {currPage===1 && <DueDiligence/>}
        {currPage===2 && <SelectTemplate tableData={tableData}/>}

        <Flex justifyContent="space-between" alignItems="center" mt='15px'>
          <Button isDisabled={currPage===1} leftIcon={<ArrowBackIcon />} onClick={handlePrevious} colorScheme='teal' variant='outline' >Previous</Button>
          <Button isDisabled={currPage===2} rightIcon={<ArrowForwardIcon/>} onClick={()=> {handleTemplate();handleNext()}} colorScheme='teal' variant='outline'>
            Get Template
          </Button>
        </Flex>

    </GridItem>
    </Grid>
    </>
  )
}

export default NewProject