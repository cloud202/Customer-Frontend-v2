import { SearchIcon } from '@chakra-ui/icons';
import { Box, Flex, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const Downloads = () => {
  const [loading,setLoading] = useState(true);
  const [projectData,setProjectData] = useState([]);

  const projectId = useSelector((state)=> state.selectDueDiligence.projectId);

  async function fetchData(){
    try{
      console.log(`${process.env.REACT_APP_API_URL_CUSTOMER}/api/customer/project/${projectId}`)
      const {data} = await axios.get(`${process.env.REACT_APP_API_URL_CUSTOMER}/api/customer/project/${projectId}/links`);
      setProjectData(data)
    }catch(e){
      console.log("Error fetching task",e);
    }
  }

  useEffect(()=>{
    fetchData();
  },[])

  return (
    <Box>
    {projectData.length !== 0 && (
      <table style={{ width: '100%', border: '1px solid gray', borderRadius: '5px' }}>
        <thead>
          <tr style={{ border: '1px solid #d2d3d4', borderRadius: '5px', backgroundColor: 'gray' }}>
            <th style={{ border: '1px solid #d2d3d4', backgroundColor: '#EDF2F7', fontWeight: '500',fontSize: '16px' }}>Sales</th>
            <th style={{ border: '1px solid #d2d3d4', backgroundColor: '#EDF2F7', fontWeight: '500',fontSize: '16px' }}>Funding</th>
            <th style ={{ border: '1px solid #d2d3d4', backgroundColor: '#EDF2F7', fontWeight: '500',fontSize: '16px' }}>Delivery</th>
            <th style={{ border: '1px solid #d2d3d4', backgroundColor: '#EDF2F7', fontWeight: '500',fontSize: '16px' }}>Operations</th>
          </tr>
        </thead>
        <tbody>
          {Array(Math.max(projectData.sales.length, projectData.funding.length, projectData.delivery.length, projectData.operations.length))
            .fill(0)
            .map((_, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #d2d3d4',color: '#4842e3',fontSize: '15px',fontWeight: 'normal' }}>
                  {index < projectData.sales.length && (
                    <a href={projectData.sales[index]} target="_blank" rel="noopener noreferrer">
                      {projectData.sales[index].substring(projectData.sales[index].lastIndexOf('/') + 1)}
                    </a>
                  )}
                </td>
                <td style={{ border: '1px solid #d2d3d4',color: '#4842e3',fontSize: '15px',fontWeight: 'normal' }}>
                  {index < projectData.funding.length && (
                    <a href={projectData.funding[index]} target="_blank" rel="noopener noreferrer">
                      {projectData.funding[index].substring(projectData.funding[index].lastIndexOf('/') + 1)}
                    </a>
                  )}
                </td>
                <td style={{ border: '1px solid #d2d3d4',color: '#4842e3',fontSize: '15px',fontWeight: 'normal' }}>
                  {index < projectData.delivery.length && (
                    <a href={projectData.delivery[index]} target="_blank" rel="noopener noreferrer">
                      {projectData.delivery[index].substring(projectData.delivery[index].lastIndexOf('/') + 1)}
                    </a>
                  )}
                </td>
                <td style={{ border: '1px solid #d2d3d4',color: '#4842e3',fontSize: '15px',fontWeight: 'normal' }}>
                  {index < projectData.operations.length && (
                    <a href={projectData.operations[index]} target="_blank" rel="noopener noreferrer">
                      {projectData.operations[index].substring(projectData.operations[index].lastIndexOf('/') + 1)}
                    </a>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    )}
  </Box>
  


  )
}

export default Downloads