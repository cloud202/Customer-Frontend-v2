import { Box, Button, Flex, Progress, Spinner, Text } from '@chakra-ui/react'
import React from 'react'
import '../css/user/table.css'
import '../css/user/boxShadow.css'
import { useDispatch, useSelector } from 'react-redux'
import { setProjectId } from '../features/formData/selectDueDiligence'
import { useNavigate } from 'react-router-dom'


const SelectTemplate = ({tableData,loading}) => {
  const navigate = useNavigate();

  const selectDueDiligence = useSelector((state) => state.selectDueDiligence.selectDueDiligence);
  const dispatch = useDispatch();


  const handleSelectTemplate= (id)=>{
    dispatch(setProjectId(id));
    navigate('/selectedproject');
  }


  
  return (
    <>
       <Text mb='15px' textAlign='center' p='5px' bg='#389785' color='white' borderRadius='5px' fontSize={{ base: '16px', sm: '18px',md: '25px', lg: '25px' }}>
       Thanks! for completing Due Diligence
      </Text>

      <Flex direction="column" p='10px' className='box-shadow'>
      <Text mb='15px' p='5px' borderRadius='5px' fontSize={{ base: '16px', sm: '18px',md: '25px', lg: '25px' }}>
      Recommended Cloud Adoption Template
      </Text>
      
      {loading? 
      <Flex justifyContent='center'>
        <Spinner
            thickness='4px'
            speed='0.6s'
            emptyColor='gray.200'
            color='blue.500'
            size='lg'
          />
        </Flex>: <table className='table'>
        <thead>
        <tr >
          <th className='table-data' style={{backgroundColor: '#7e7e7ef5',color: 'rgb(245, 245, 245)'}}>Project Template</th>
          <th className='table-data' style={{backgroundColor: '#7e7e7ef5',color: 'rgb(245, 245, 245)'}}>AS IS -{`>`} TO BE</th>
          <th className='table-data' style={{backgroundColor: '#7e7e7ef5',color: 'rgb(245, 245, 245)'}}>Operation</th>
        </tr>
        </thead>
    
        <tbody>
            {tableData && tableData.map((project)=> 
            <>
            <tr key={project._id}>
              <td className='table-data table-data-td'>
                {project.template_name}
              </td>
              <td className='table-data table-data-td'>
                {project.template_usecase}
              </td>
              <td className='table-data table-data-td'>
                <Button colorScheme='teal' size='sm' onClick={()=> handleSelectTemplate(project._id)}>Select</Button>
              </td>
          </tr>
            </>)     
            }
          </tbody>
      </table>}
      </Flex>
    </>
  )
}

export default SelectTemplate