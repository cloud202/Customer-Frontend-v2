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

        console.log("Donwload",data);
    }catch(e){
      console.log("Error fetching task",e);
    }
  }

  useEffect(()=>{
    fetchData();
  },[])

  return (
    <Box>
      {projectData.length!==0 && <table style={{ width: '100%', border: '1px solid gray', borderRadius: '5px' }}>
        <thead>
          <tr style={{ border: '1px solid #d2d3d4', borderRadius: '5px', bg: 'gray' }}>
            <th style={{ border: '1px solid #d2d3d4', backgroundColor: '#EDF2F7', fontWeight: '500' }}>Sales</th>
            <th style={{ border: '1px solid #d2d3d4', backgroundColor: '#EDF2F7', fontWeight: '500' }}>Funding</th>
            <th style={{ border: '1px solid #d2d3d4', backgroundColor: '#EDF2F7', fontWeight: '500' }}>Delivery</th>
            <th style={{ border: '1px solid #d2d3d4', backgroundColor: '#EDF2F7', fontWeight: '500' }}>Operations</th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td style={{ border: '1px solid #d2d3d4' }}>
            {projectData.sales.map((sale, index) => (
              <div key={index}>
                <a href={sale} target="_blank" rel="noopener noreferrer">
                  {sale.substring(sale.lastIndexOf('/') + 1)}
                </a>
              </div>
            ))}
          </td>
          <td style={{ border: '1px solid #d2d3d4' }}>
            {projectData.funding.map((fund, index) => (
              <div key={index}>
                <a href={fund} target="_blank" rel="noopener noreferrer">
                {fund.substring(fund.lastIndexOf('/') + 1)}

                </a>
              </div>
            ))}
          </td>
          <td style={{ border: '1px solid #d2d3d4' }}>
            {projectData.delivery.map((delivery, index) => (
              <div key={index}>
                <a href={delivery} target="_blank" rel="noopener noreferrer">
                {delivery.substring(delivery.lastIndexOf('/') + 1)}

                </a>
              </div>
            ))}
          </td>
          <td style={{ border: '1px solid #d2d3d4' }}>
            {projectData.operations.map((operation, index) => (
              <div key={index}>
                <a href={operation} target="_blank" rel="noopener noreferrer">
                {operation.substring(operation.lastIndexOf('/') + 1)}
                </a>
              </div>
            ))}
          </td>
        </tr>
      </tbody>
      </table>}
        </Box>

  )
}

export default Downloads