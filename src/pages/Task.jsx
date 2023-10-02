import React from 'react'
import { Navbar } from '../components/Navbar';
import { Box, Button, Flex, Grid, GridItem } from '@chakra-ui/react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';

const Task = () => {
    const navigate = useNavigate();

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

        <Flex justifyContent="space-between" alignItems="center" mt='15px'>
          <Button leftIcon={<ArrowBackIcon />} onClick={()=>navigate(-1)} colorScheme='teal' variant='outline' >Previous</Button>
        </Flex>

    </GridItem>
    </Grid>
    </>
  )
}

export default Task