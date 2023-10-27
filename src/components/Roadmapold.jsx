import { Box, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../css/user/tableModernisation.css'
import { setProjectData } from '../features/formData/selectDueDiligence';
import '../css/user/boxShadow.css'

const Roadmap = () => {
    const templateId = useSelector((state)=> state.selectDueDiligence.projectId);

    const [table,setTable] = useState({})

    const dispatch = useDispatch();
    const formData = useSelector((state)=> state.dueDiligence.formData);

    useEffect(() => {
        async function fetchData() {
            try {
                if (templateId) {
                    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/master/v2/project_template/${templateId}`);
                    dispatch(setProjectData(data));
                    setTable(data);
                }
            } catch (e) {
                console.log("Error fetching data", e);
            }
        }

        fetchData();
    }, [])

    function getTotalTasksInPhase(phase) {
        let totalTasks = 0;
      
        if (phase.modules && phase.modules.length > 0) {
          phase.modules.forEach((module) => {
            if (module.tasks && module.tasks.length > 0) {
              totalTasks += module.tasks.length;
            }
          });
        }
      
        return totalTasks;
      }
      
      var flag=1;
      var flag2=1;

    return (
        <>
            <Text mb='15px' textAlign='center' p='5px' bg='#389785' color='white' borderRadius='5px' fontSize={{ base: '16px', sm: '18px', md: '25px', lg: '25px' }}>
                {formData.name.toUpperCase()} Modernisation Roadmap Summary
            </Text>
        {/* New table without alternative color  */}
        <Box style={{overflowX: 'auto'}} className='box-shadow'>   
        <table className="table-modern">
                <thead>
                    <tr>
                        <th colSpan='100%'>Modernisation Phases</th>
                    </tr>
                    <tr>
                        {table.phases && table.phases.map((phase, index) => (
                            <td key={index} colSpan={getTotalTasksInPhase(phase)} className={index % 2 === 0 ? 'alternating-row' : 'alternating-row-two'} style={{textAlign: 'center',fontSize: '25px'}} >
                                {phase.phasesId.name}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <th colSpan='100%'>Modules Under Phases</th>
                    </tr>
                    <tr>
                        {table.phases && table.phases.map((phase,index)=>
                        {
                            flag=flag+1;
                            return (phase.modules.map((module, index) => (
                                <td key={index} colSpan={module.tasks.length} className={flag % 2 === 0 ? 'alternating-row' : 'alternating-row-two'} style={{textAlign: 'center',fontSize: '18px'}}>
                                    {module.moduleId.name}
                                </td>
                            )))
                        }
                            )
                        }
                    </tr>
                    <tr>
                        <th colSpan='100%' >Automated Action Plan (Task List)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    {table.phases &&
                            table.phases.map((phase, phaseIndex) => {
                                flag2 = flag2 + 1;
                                return phase.modules.map((module, moduleIndex) => {
                                return module.tasks.map((taskList, taskIndex) => (
                                    <td key={taskIndex} className={flag2 % 2 === 0 ? 'alternating-row' : 'alternating-row-two'} style={{textAlign: 'center'}}>
                                    {taskList.taskId.name}
                                    </td>
                                ));
                                });
                            })}
                    </tr>
                </tbody>
            </table>
            </Box>
        
        {/* The old table  */}
        {/* <table className="table-modern">
                <thead>
                    <tr>
                        <th colSpan='100%' style={{color: '#313030'}}>Modernisation Phases</th>
                    </tr>
                    <tr>
                        {phases.map((phase, index) => (
                            <td key={index} colSpan={modules[index].length}>
                                {phase}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <th colSpan='100%' style={{color: '#313030'}}>Modules Under Phases</th>
                    </tr>
                    <tr>
                        {modules.map((module, index) => (
                            <td key={index} colSpan={tasks[index].length}>
                                {module.map((mod,ind)=> 
                                    <td>{mod}</td>
                                )}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <th colSpan='100%' style={{color: '#313030'}}>Automated Action Plan (Task List)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {tasks.map((taskList, index) => (
                            <td key={index} colSpan={modules[index].length} className="vertical-line">
                                {taskList.map((task,ind) => 
                                    <td colSpan={modules[index][ind].length}>
                                        {task.join(', ')}
                                    </td>)}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table> */}
        </>
    )
}

export default Roadmap;
