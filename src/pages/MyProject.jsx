import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Box, Button, Card, CardBody, CardHeader, Flex, Grid, GridItem, Heading, Stack, StackDivider, Text } from '@chakra-ui/react'
import { Navbar } from '../components/Navbar'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setPhasesData } from '../features/tabs/phases'
import ProjectTab from '../components/ProjectTab'
import { setProjectData, setProjectId } from '../features/formData/selectDueDiligence'
import { resetFormData, setFormData } from '../features/formData/dueDiligenceForm'
import ProjectTabs from '../components/ProjectTabs'

const MyProject = () => {
    const [project,setProject] = useState();
    const customerId = useSelector((state)=> state.token.customerId)
    const [projectFound,setProjectFound] = useState(false);
    const [currPage,setCurrPage] = useState(1);
    const [loading,setLoading] = useState(true);
    const formData = useSelector((state)=> state.dueDiligence.formData);
    const dispatch = useDispatch();

    const handleNext = async (project)=>{
        dispatch(resetFormData());
        try{
        //   const {data} = await axios.post(`${process.env.REACT_APP_API_URL_CUSTOMER}/api/customer/${customerId}/project/add/${projectId}`,project);
          const response =  await axios.get(`${process.env.REACT_APP_API_URL_CUSTOMER}/api/customer/${customerId}/project/${project._id}/phases`);
          dispatch(setPhasesData(response.data));
          dispatch(setFormData({field: "name",value: project.project_name}));
          
        }catch(e){
          console.log("Error setting up customer db",e);
         }
        setCurrPage(currPage+1);
      }

    async function fetchData (){
        try{
            const {data} = await axios.get(`${process.env.REACT_APP_API_URL_CUSTOMER}/api/customer/${customerId}/project/allProjects`)
            setProject(data);
            setProjectFound(true);
        }catch(e){
            console.log("No project found",e);

        }
        setLoading(false);
        
    }
    useEffect(()=>{
        fetchData();
    },[])

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
        {currPage===1? <>
        
    <Text mb='15px' textAlign='center' p='5px' bg='#389785' color='white' borderRadius='5px' fontSize={{ base: '16px', sm: '18px',md: '25px', lg: '25px' }}>
        List of My Projects
      </Text>

    <Flex p='10px' className='box-shadow' gap={3} flexWrap='wrap' justifyContent='flex-start'>
        {!projectFound && 
        <Flex flexDir='column' w='100%' h='150px' alignItems='center' justifyContent='center' gap={4}>
        <Text fontSize='xl'>
            Looks like you haven't created any project yet. Start your Modernization Journey with New Project 
        </Text>
        <Link to='/newproject'>
            <Button colorscheme='blue'>New Project</Button>
        </Link>
        </Flex>
        }   
        {project && project.map((project,ind)=>
            <Card key={ind} flexGrow='1' flexBasis='300px' justifyContent='flex-start' mb='6px' bg='#40a798' _hover={{ transform: 'scale(1.03)', transition: 'transform 0.3s ease',cursor: 'pointer' }} onClick={()=>handleNext(project)}>
            <CardHeader>
                <Heading size='md' color='gray.100'>{project.project_name.toUpperCase()}</Heading>
            </CardHeader>

            <CardBody bg='#f1f1f1'>
                <Stack divider={<StackDivider />} spacing='4'>
                <Box>
                    <Heading size='xs' textTransform='uppercase'>
                    Base Template
                    </Heading>
                    <Text pt='2' fontSize='md' fontWeight='500'>
                    {project.project_id} - {project.template_name} 
                    </Text>
                </Box>
                <Box>
                    <Heading size='xs' textTransform='uppercase'>
                    Created At
                    </Heading>
                    <Text pt='2' fontSize='md' fontWeight='500'>
                    {new Date(project.createdAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        timeZone: "Europe/London",
                        timeZoneName: "long"
                        })
                    }
                    </Text>
                </Box>
                </Stack>
            </CardBody>
            </Card>
        )}

    </Flex>
    </> : <ProjectTabs/>}

    </GridItem>
    </Grid>
    </>
  )
}

export default MyProject