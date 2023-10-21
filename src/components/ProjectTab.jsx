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
import { useNavigate } from 'react-router-dom'

const ProjectTab = ({setCurrPage,isNew=true}) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskDetail,setTaskDetail] = useState({
    phase: '',
    module: '',
    task: '',
  })

  const [flag,setFlag] = useState(false);
  const navigate = useNavigate();

  const handleMyProjects=()=>{
    isNew? navigate('/myproject') : setCurrPage(1);
  }

  return (
    <Box className='box-shadow'>
      <Tabs variant='enclosed' size='lg'>
        <TabList>
        <Tooltip label='Go Back to My Projects'>
        <Button m='10px' size='sm' variant='outline' p='2' leftIcon={<KeyboardBackspaceIcon/> } onClick={handleMyProjects}></Button>
        </Tooltip>
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