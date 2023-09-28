import React, { useEffect } from 'react'
import {Navbar} from '../components/Navbar'
import { Box, Card, CardBody, CardHeader, Divider, Flex, Grid, GridItem, Heading, Image, Text } from '@chakra-ui/react'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import '../css/user/customerDashboard.css'
import customerDesign from '../img/customerDesignNew.png'
import { useDispatch } from 'react-redux'
import { resetFormData } from '../features/formData/dueDiligenceForm'


const CustomerDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetFormData());
  }, [])
  
  return (
    <>
    <Navbar/>
    <Grid templateColumns="repeat(6,1fr)">
        <GridItem colSpan={{lg: '1' }}>
          <Box w={{ base: 'none',sm: 'none', md: 'none', lg: '230px' }}>
            <Sidebar/>
          </Box>
        </GridItem>

        <GridItem colSpan={{base: '6', sm: '6', md: '6',lg: '5' }} className= "project-background" >
          <Box className='dashboard-shadow' display='flex' flexDirection='column' alignItems='center' justifyContent='center' textAlign='center' mt={{base: '14px',lg: '6px'}} mb={{base: '22px'}} mr={{base: '5px',sm: '8px',lg: '12px'}} ml={{base: '5px',sm: '8px',lg: '40px'}}>
          <Text className='sub-title' fontSize={{ base: '14px',sm: '20px', md: '24px', lg: '28px' }} fontWeight={400} >Welcome to modX, Define Modernization Journey For Your Customer</Text>
          <Image src={customerDesign} w={{ base: '100%', lg: '80%' }} m='15px' mb='30px' />
          {/* <Flex flexDirection='row'>
            <Image src={step2}/>
            <Image src={step3}/>
          </Flex> */}
          </Box>

          <Box className='dashboard-shadow' p={{ base: '6px',sm: '6px', md: '6px', lg: '2px' }}  mr={{base: '5px',sm: '8px',lg: '12px'}} ml={{base: '5px',sm: '8px',lg: '40px'}} mb='16px'>
            <Text className='sub-title' fontSize={{ base: '16px', md: '20px', lg: '22px' }} fontWeight='semibold' color='gray.700'>Quick-Start Templates</Text>
            <Flex gap={3} m='13px' flexDir={['column','row']}>
              <Card borderRadius='8px' w={{base: '100%',sm: '100%',md: '32%',lg: '32%'}} _hover={{ transform: 'scale(1.03)', transition: 'transform 0.3s ease' }} >
              <CardHeader bg='#40a798' borderRadius='8px 8px 0px 0px'>
                <Heading size='sm' color='white'>MIGRATION</Heading>
              </CardHeader>
                <CardBody bg='#f1f1f1' borderRadius='0px 0px 8px 8px'>
                  <Text>Microsoft workloads to AWS</Text>
                </CardBody>
              </Card>

              <Card borderRadius='8px' w={{base: '100%',sm: '100%',md: '32%',lg: '32%'}} _hover={{ transform: 'scale(1.03)', transition: 'transform 0.3s ease' }}>
              <CardHeader bg='#40a798' borderRadius='8px 8px 0px 0px'>
                <Heading size='sm' color='white'>MODERNIZATION</Heading>
              </CardHeader>
                <CardBody bg='#f1f1f1' borderRadius='0px 0px 8px 8px'>
                  <Text>JAVA MySql to container</Text>
                </CardBody>
              </Card>

              <Card borderRadius='8px' w={{base: '100%',sm: '100%',md: '32%',lg: '32%'}} _hover={{ transform: 'scale(1.03)', transition: 'transform 0.3s ease' }}>
              <CardHeader bg='#40a798' borderRadius='8px 8px 0px 0px'>
                <Heading size='sm' color='white'>GREEN FIELD</Heading>
              </CardHeader>
                <CardBody bg='#f1f1f1' borderRadius='0px 0px 8px 8px'>
                  <Text>Design and Deploy Node.js application over AWS</Text>
                </CardBody>
              </Card>
            
            </Flex>
          </Box>
          {/* <Box className='dashboard-shadow' p={{ base: '6px',sm: '6px', md: '6px', lg: '2px' }}  mr={{base: '5px',sm: '8px',lg: '12px'}} ml={{base: '5px',sm: '8px',lg: '40px'}} mb='16px' h='150px'>
            <Text className='sub-title' fontSize={{ base: '16px', md: '20px', lg: '22px' }} fontWeight='semibold' color='gray.700'>Quick-Start Templates</Text>
          </Box> */}
            <Footer/>    
        </GridItem>
      </Grid>

    </>
  )
}

export default CustomerDashboard