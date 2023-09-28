import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import '../css/user/table.css'
import '../css/user/boxShadow.css'
import { useDispatch, useSelector } from 'react-redux'
import { setProjectId } from '../features/formData/selectDueDiligence'
import { useNavigate } from 'react-router-dom'


const SelectedTemplatePage = () => {
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
       XYZ Modernization Roadmap Summary
      </Text>

      <Flex direction="column" p='10px' className='box-shadow'>
      <Text mb='15px' p='5px' borderRadius='5px' fontSize={{ base: '16px', sm: '18px',md: '25px', lg: '25px' }}>
      Recommended Cloud Adoption Template
      </Text>
      
      <table>
        <thead>
        <tr>
          <th>Project Template</th>
          <th>AS IS -{`>`} TO BE</th>
          <th>Operation</th>
        </tr>
        </thead>
    
        <tbody>
          <tr>
            <td>Modernize workload on AWS container</td>
            <td>.NET MSSQL to AWS EC2 with app runner</td>
            <td><div onClick={()=> handleSelectTemplate("heheheheheh")}>Select</div></td>
          </tr>

          <tr>
            <td>Modernize workload on AWS container</td>
            <td>.NET MSSQL to AWS EC2 with app runner</td>
            <td>Select</td>
          </tr>

          <tr>
            <td>Modernize workload on AWS container</td>
            <td>.NET MSSQL to AWS EC2 with app runner</td>
            <td>Select</td>
          </tr>
          </tbody>
  </table>
      </Flex>
    </>
  )
}

export default SelectedTemplatePage