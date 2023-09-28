import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Box, Card, CardBody, CardHeader, Flex, Grid, GridItem, Heading, Stack, StackDivider, Text } from '@chakra-ui/react'
import { Navbar } from '../components/Navbar'
import axios from 'axios'

const MyProject = () => {
    const [project,setProject] = useState();

    async function fetchData (){
        const customer_id = "823kdakj203k42s";
        const {data} = await axios.get(`${process.env.REACT_APP_API_URL_CUSTOMER}/api/customer/${customer_id}/project/allProjects`)
        setProject(data);
        
    }
    useEffect(()=>{
        fetchData();
    },[])

    setTimeout(() => {
        console.log(project)
    }, 3000);

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
    <Text mb='15px' textAlign='center' p='5px' bg='#389785' color='white' borderRadius='5px' fontSize={{ base: '16px', sm: '18px',md: '25px', lg: '25px' }}>
        List of My Projects
      </Text>

    <Flex p='10px' className='box-shadow' gap={4} flexWrap='wrap' justifyContent='space-around'>
        {project && project.map((project,ind)=>
            <Card key={ind} mb='15px' bg='#40a798' _hover={{ transform: 'scale(1.03)', transition: 'transform 0.3s ease' }} >
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

    </GridItem>
    </Grid>
    </>
  )
}

export default MyProject