import { Box, Card, CardBody, Flex, Heading, Progress, Stack, StackDivider, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import '../../css/user/boxShadow.css'
import { useSelector } from 'react-redux'

const Overview = () => {
    const formData = useSelector((state)=> state.dueDiligence.formData);
  return (
    <Flex flexDir='column'>
        <Card>
            <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                <Box>
                    <Text textTransform='uppercase' fontSize='2xl' p='0' fontWeight={600} color='#067356'>
                    {formData.name}
                    </Text>
                    
                    <Text pt='2' fontWeight={500}>
                    <span style={{ color: 'gray' }}>Project Type : </span>{formData.cloudApproach}
                    </Text>
                    <Text fontWeight={500}>
                    <span style={{ color: 'gray' }}>Industry : </span>{formData.industry}
                    </Text>
                    <Text fontWeight={500}>
                    <span style={{ color: 'gray' }}>Workload Type : </span>{formData.workloadType.map((workload)=> workload).join(', ')}
                    </Text>
                    <Text fontWeight={500}>
                    <span style={{ color: 'gray' }}>Tech Stack : </span>{formData.techStack.map((tech)=> tech).join(', ')}
                    </Text>
                    
                </Box>
                <Box>
                    <Heading size='xs' textTransform='uppercase'>
                    Project Status
                    </Heading>
                    <Box pt='2'>
                    <Progress hasStripe value={64} colorScheme='green'/>
                    </Box>
                </Box>
                <Box>
                    <Heading size='xs' textTransform='uppercase'>
                    Task Status Report
                    </Heading>
                    <Box>
                        <Text pt='2' fontWeight={500}>
                        <span style={{ color: 'gray' }}>Onboarded : </span> X
                        </Text>
                        <Text fontWeight={500}>
                        <span style={{ color: 'gray' }}>Delivered : </span> Y
                        </Text>
                        <Text fontWeight={500}>
                        <span style={{ color: 'gray' }}>In-progress : </span> Z
                        </Text>
                        <Text fontWeight={500} color='red.600'>
                        <span style={{ color: 'gray' }}>Due : </span>A
                        </Text>
                    </Box>
                </Box>
                <Box>
                    <Heading size='xs' textTransform='uppercase'>
                    Project Team Report
                    </Heading>
                    <Box>
                        <Text pt='2' fontWeight={500}>
                        <span style={{ color: 'gray' }}>Team Member Name : </span>
                        </Text>
                        <Text fontWeight={500}>
                        <span style={{ color: 'gray' }}>Role : </span>
                        </Text>
                        <Text fontWeight={500}>
                        <span style={{ color: 'gray' }}>Email : </span>
                        </Text>
                        <Text fontWeight={500} color='red.600'>
                        Update/Delete
                        </Text>
                    </Box>
                </Box>
                </Stack>
            </CardBody>
            </Card>
    </Flex>
  )
}

export default Overview