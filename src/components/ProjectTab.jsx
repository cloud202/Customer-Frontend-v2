import { Box, Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Tooltip } from '@chakra-ui/react'
import React, { useState } from 'react'
import '../css/user/boxShadow.css'
import Overview from './ProjectTabPanel/Overview'
import Phases from './ProjectTabPanel/Phases'
import Modules from './ProjectTabPanel/Modules'
import Tasks from './ProjectTabPanel/Tasks.jsx'
import TaskDetail from './ProjectTabPanel/TaskDetail'
import { Download } from '@mui/icons-material'
import Downloads from './ProjectTabPanel/Downloads'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const ProjectTab = ({setCurrPage}) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskDetail,setTaskDetail] = useState({
    phase: '',
    module: '',
    task: '',
  })

  const [flag,setFlag] = useState(false);

  return (
    <Box className='box-shadow'>
      <Tabs variant='enclosed' size='lg' defaultIndex={1}>
        <TabList>
        <Tab>
        <Tooltip label='Go Back to My Projects'>
        <Button size='sm' variant='outline' p='2' leftIcon={<KeyboardBackspaceIcon/> } onClick={()=>setCurrPage((prevState)=> prevState-1)}></Button>
        </Tooltip>
        </Tab>
          <Tab><Text fontSize='md' fontWeight='semibold' >Overview</Text></Tab>
          <Tab><Text fontSize='md' fontWeight='semibold' >Phases</Text></Tab>
          <Tab><Text fontSize='md' fontWeight='semibold' >Modules</Text></Tab>
          <Tab><Text fontSize='md' fontWeight='semibold' >Tasks</Text></Tab>
          <Tab><Text fontSize='md' fontWeight='semibold' >Downloads</Text></Tab>
          
        </TabList>

        <TabPanels>
          <TabPanel>

          </TabPanel>
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
          {selectedTask ? (
            <TaskDetail setFlag={setFlag} task={selectedTask} setSelectedTask={setSelectedTask} taskDetail={taskDetail}/>
            ) : (
              <Tasks flag={flag} setSelectedTask={setSelectedTask} setTaskDetail={setTaskDetail}/>
              )}
          </TabPanel>
          <TabPanel>
            <Downloads/>
          </TabPanel>
        </TabPanels>
      </Tabs>
        
    </Box>
  )
}

export default ProjectTab