import { Box, Flex, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../css/user/tableModernization.css'
import { setProjectData } from '../features/formData/selectDueDiligence';
import '../css/user/boxShadow.css'
import PhaseCol from './PhaseCol';

const Roadmap = () => {
    const templateId = useSelector((state)=> state.selectDueDiligence.projectId);
    const [table,setTable] = useState({})

    const dispatch = useDispatch();
    const formData = useSelector((state)=> state.dueDiligence.formData);

    useEffect(() => {
        async function fetchData() {
            try {
                if (templateId) {
                    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/master/v2/project_template/${templateId}`);
                    dispatch(setProjectData(data));
                    setTable(data);
                }
            } catch (e) {
                console.log("Error fetching data", e);
            }
        }

        fetchData();
    }, [])

  return (
    <>
    <Text mb='15px' textAlign='center' p='5px' bg='#389785' color='white' borderRadius='5px' fontSize={{ base: '16px', sm: '18px', md: '25px', lg: '25px' }}>
        {formData.name.toUpperCase()} Modernisation Roadmap Summary
    </Text>

    <Box style={{ overflowX: 'auto',backgroundColor: '#fcfcfc'}} className='box-shadow'>
            <Flex flexDir='row' p='10px' gap={5} style={{ maxWidth: '100%' }} flexGrow='1' >
                {table.phases && table.phases.map((phase, index) => (
                    <PhaseCol phase={phase} num={index} />
                ))}
            </Flex>
        </Box>

    </>
  )
}

export default Roadmap