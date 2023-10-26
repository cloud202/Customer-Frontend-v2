import { Box, Flex, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, useSteps } from '@chakra-ui/react'
import React from 'react'

const HistoryStepper = ({history}) => {
    // const steps = [
    //     { title: 'First', description: 'Contact Info' },
    //     { title: 'Second', description: 'Date & Time' },
    //     { title: 'Third', description: 'Select Rooms' },
    //   ]

  return (
    <Stepper orientation='vertical' gap='2'>
      {history.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepNumber />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink='0'>
            <StepTitle>{step.updated_field + " Updated"}</StepTitle>
            <StepDescription>
                <Flex flexDir='column'>    
                Updated By : {step.updated_by.customer_email}
                <Flex>
                Updated At : {
                            new Date(step.updatedAt).toLocaleString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                timeZone: "Europe/London",
                                timeZoneName: "long"
                                })}
                </Flex>
                <Flex mt='8px' mb='4px' flexDirection={{base: 'column', sm: 'column',md: 'row',lg: 'row'}}>
                    <Flex mr='50px'>
                    
                      {step.data.new ? 
                      <Flex>
                      Updated Data =
                      <pre>
                      {JSON.stringify(step.data.new, null, 2)}
                      </pre>
                      </Flex> : 
                      
                      <Flex>
                        Initial State=
                        <pre>
                        {JSON.stringify(step.data.old, null, 2)}
                        </pre>
                        </Flex>}
                    </Flex>

                </Flex>
                </Flex>
            </StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  )
}

export default HistoryStepper