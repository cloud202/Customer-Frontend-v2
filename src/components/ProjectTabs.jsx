import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React from 'react'
import '../css/user/boxShadow.css'
import Overview from './ProjectTabPanel/Overview'
import Phases from './ProjectTabPanel/Phases'
import Modules from './ProjectTabPanel/Modules'
import Tasks from './ProjectTabPanel/Tasks'

const ProjectTabs = () => {
    return (
        <Box className='box-shadow'>
          <Tabs variant='enclosed' size='lg'>
            <TabList>
              <Tab><Text fontSize='md' fontWeight='semibold' >Overview</Text></Tab>
              <Tab><Text fontSize='md' fontWeight='semibold' >Phases</Text></Tab>
              <Tab><Text fontSize='md' fontWeight='semibold' >Modules</Text></Tab>
              <Tab><Text fontSize='md' fontWeight='semibold' >Tasks</Text></Tab>
              <Tab><Text fontSize='md' fontWeight='semibold' >Downloads</Text></Tab>
            </TabList>
    
            <TabPanels>
              <TabPanel>
                <Overview/>
              </TabPanel>
              <TabPanel>
                <Phases/>
              </TabPanel>
              <TabPanel>
                <Modules/>
              </TabPanel>
              <TabPanel>
                {/* <Tasks/> */}
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      )
}

export default ProjectTabs