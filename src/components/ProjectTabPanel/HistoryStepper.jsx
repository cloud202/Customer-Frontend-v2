import { Alert, AlertIcon, Box, Card, CardBody, CardHeader, Flex, Heading, Stack, StackDivider, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, Text, useSteps } from '@chakra-ui/react'
import React from 'react'

const HistoryStepper = ({history,formData}) => {

  console.log('FormData',formData);

  const steps = [
    { title: 'Initial State', description: ""} 
  ]

  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  })

  return (
    <>
    {/* <Stepper size='lg' index={activeStep} mb='20px'>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink='0'>
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>
              <Flex flexDir='column'>
                <Flex>
                  Name : {formData.project_name}
                </Flex>

                <Flex>
                Created At : {
                  new Date(formData.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    timeZone: "Europe/London",
                    timeZoneName: "long"
                  })
                }
            </Flex>
                </Flex>
            </StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper> */}
    
    {history ? <Stepper orientation='vertical' gap='4'>
      {history && history.map((step, index) => (
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
                {/* <span style={{color:'black'}} >Updated By</span> */}
                
                {/* <Flex flexDir='column'>
                  
                  <Flex>
                    Role : {step.updated_by.isMember? "Member" : "Me"}
                  </Flex>
                  <Flex>
                    Email : {step.updated_by.customer_email}
                  </Flex>
                  </Flex>  */}

                  <Flex>
                  <span style={{color:'black'}} >Updated By</span> : {step.updated_by.customer_name + " - " + step.updated_by.customer_email + (step.updated_by.isMember? " (Member)" : " (Customer)") }
                  </Flex>
                <Flex>
                <span style={{color:'black'}} >Updated At</span> : {
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
                <Flex flexDir='column'>
                <span style={{color:'black'}} >Updated Data :</span> 
                    <Flex bg='#F7F7F7' color='black' mt='4px' p='10px' borderRadius='5px' flexDir='column'>

                    {Object.entries(step.data).map(([key, value]) => (
                      <Flex key={key}>
                          {`${key} = ${value}`}
                        </Flex>
                      ))}
                      </Flex>

                </Flex>
                </Flex>
            </StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper> : 
    <Alert status='warning'>
    <AlertIcon />
    To access the history, please consider updating the project with historical information.             
    </Alert>
}
    
    </>
  )
}

export default HistoryStepper