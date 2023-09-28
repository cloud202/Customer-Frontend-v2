import { Flex, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react'
import React from 'react'

const UpdatePhase = () => {
  return (
    <Flex direction="column" p='10px'>
        
    <FormControl mb={{base: '8px',sm: '8px', lg: '10px'}} isRequired>
    <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700'>Phase Name</FormLabel>
    <Input w='100%' type="text" placeholder="Enter phase name" name='name'/>
    </FormControl>

    <FormControl mb={{base: '8px',sm: '8px', lg: '10px'}} isRequired>
    <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700'>Description</FormLabel>
    <Textarea w='100%' type="text" placeholder="Enter phase description" name='name'/>
    </FormControl>

    </Flex>
  )
}

export default UpdatePhase