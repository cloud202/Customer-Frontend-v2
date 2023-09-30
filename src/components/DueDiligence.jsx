import { ChevronDownIcon, CloseIcon, SearchIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { Box, Button, Checkbox, Flex, FormControl, FormLabel, HStack, Input, InputGroup, InputRightElement, Menu, MenuButton, MenuItem, MenuList, Text, Textarea } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import '../css/user/boxShadow.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { setFormData, setPostData, setPostDatas } from '../features/formData/dueDiligenceForm';
import ClearIcon from '@mui/icons-material/Clear';
import { useToast } from '@chakra-ui/react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import '../css/user/dueDiligence.css'

const DueDiligence = () => {
    const [adoption,setAdoption] = useState([]);
    const [workloadType,setWorkloadType] = useState([]);
    const [techStack,setTechStack] = useState([]);
    const [industry,setIndustry] = useState([]);

    const [searchInput, setSearchInput] = useState(''); 
    const [filteredWorkloadType, setFilteredWorkloadType] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [searchInputTechStack, setSearchInputTechStack] = useState('');
    const [filteredTechStack, setFilteredTechStack] = useState([]);
    const [isDropdownOpenTechStack, setIsDropdownOpenTechStack] = useState(false);

    const toast = useToast();
    //redux-logic
    const formData = useSelector((state) => state.dueDiligence.formData)
    const dispatch = useDispatch();


    const handleInputChange=(e)=>{
        const {name,value} = e.target;
        dispatch(setFormData({field: name,value}))
    }

    const handleSelect=(field,value,id)=>{
       setSearchInput('')
        dispatch(setFormData({field,value}))
        if(field==='industry')
            dispatch(setPostData({field: 'industry_id',value: id}));
        if(field==='techStack')
            dispatch(setPostData({field: 'teckstack_name',value}));
        if(field==='workloadType')
            dispatch(setPostData({field: 'workload_type',value}));
        if(field==='cloudApproach')
            dispatch(setPostData({field: 'type_id',value: id}))
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleDropdownTechStack = ()=>{
        setIsDropdownOpenTechStack(!isDropdownOpenTechStack);
    }

    async function fetchData(){
        try{
           const adoptionApproach = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/master/project_type`);
            setAdoption(adoptionApproach.data);

            const industry = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/master/project_industry`);
            setIndustry(industry.data);

            const workloadType = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/master/workload_type`);
            setWorkloadType(workloadType.data);
            setFilteredWorkloadType(workloadType.data);

            const techStack = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/master/teck_stack`);
            setTechStack(techStack.data);
            setFilteredTechStack(techStack.data);

        }catch(e){
            console.log('Error fetching data',e);
        }
    }
    
    const handleInputKeyDownTechStack = async (e) => {
        if (e.key === 'Enter') {
          try {
            const techStack = {
                teckstack_name: searchInputTechStack,
            }
            const {data} = await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/master/teck_stack`,techStack);
            fetchData();
            dispatch(setFormData({field: "techStack",value: data.teckstack_name}));
            setSearchInputTechStack('')
          } catch (error) {
            console.error('Error calling the API', error);
            toast({
                title: 'Unable to add workload type',
                description: "Try again later",
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
          }
        }
    }
    const handleInputKeyDownWorkload = async (e) => {
        if (e.key === 'Enter') {
          try {
            const workload = {
                type_name: searchInput,
            }
            const {data} = await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/master/workload_type`,workload);
            fetchData();
            dispatch(setFormData({field: "workloadType",value: data.type_name}));
            setSearchInput('')
          } catch (error) {
            console.error('Error calling the API', error);
            toast({
                title: 'Unable to add workload type',
                description: "Try again later",
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
          }
        }
    }

    useEffect(()=>{ 
        fetchData();
    },[]);

    useEffect(() => {
        if (!searchInput) {
            if (workloadType) {
                setFilteredWorkloadType(workloadType);
            }
        } else {
            if (workloadType) {
                const filteredOptions = workloadType.filter(item =>
                    item.type_name.toLowerCase().includes(searchInput.toLowerCase())
                );
                setFilteredWorkloadType(filteredOptions);
            }
        }
    }, [searchInput, workloadType]);

    useEffect(() => {
        if (!searchInputTechStack) {
            if (techStack) {
                setFilteredTechStack(techStack);
            }
        } else {
            if (techStack) {
                const filteredOptions = techStack.filter((item) =>
                    item.teckstack_name.toLowerCase().includes(searchInputTechStack.toLowerCase())
                );
                setFilteredTechStack(filteredOptions);
            }
        }
    }, [searchInputTechStack, techStack]);
    
  return (
    <>
    <Text mb='15px' textAlign='center' p='5px' bg='#389785' color='white' borderRadius='5px' fontSize={{ base: '16px', sm: '18px',md: '25px', lg: '25px' }}>
        Begin Your Project Journey & Let's Start With Quick Due Diligence
      </Text>

    <Flex direction="column" p='10px' className='box-shadow'>
        
    <FormControl mb={{base: '8px',sm: '8px', lg: '10px'}} isRequired>
    <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700'>Project Name</FormLabel>
    <Input w='100%' type="text" placeholder="Enter template name" name='name' value={formData.name} onChange={(e)=> handleInputChange(e)} />
    </FormControl>

    <FormControl mb={{base: '8px',sm: '8px', lg: '10px'}} isRequired>
    <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700'>Applications/Workloads in scope</FormLabel>
    <Menu>
        <MenuButton w='100%' as={Flex} variant="outline" colorScheme="gray" color='gray.700' rightIcon={<ChevronDownIcon />} className='menu-button'>
        <HStack display='flex' justifyContent='space-between'>
        <Text>{formData.workloadInScope}</Text>
        <ArrowDropDownIcon />
        </HStack>
        </MenuButton>
        <MenuList >
            <MenuItem onClick={()=> handleSelect('workloadInScope',"1")}>1</MenuItem>
            <MenuItem onClick={()=> handleSelect('workloadInScope',"2-20")}>2-20</MenuItem>
            <MenuItem onClick={()=> handleSelect('workloadInScope',"21-100")}>21-100</MenuItem>
            <MenuItem onClick={()=> handleSelect('workloadInScope',"100+")}>100+</MenuItem>
        </MenuList>
    </Menu>
    </FormControl>

    <FormControl mb={{base: '8px',sm: '8px', lg: '10px'}} isRequired>
    <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700'>Cloud Adoption Approach</FormLabel>
    <Menu>
        <MenuButton w='100%' as={Flex} variant="outline" colorScheme="gray" color='gray.700' className='menu-button'>
        <HStack display='flex' justifyContent='space-between'>
        <Text>{formData.cloudApproach}</Text>
        <ArrowDropDownIcon />
        </HStack>
        </MenuButton>
        <MenuList>
            {adoption && adoption.map((item,ind)=> <MenuItem key={ind} onClick={()=> handleSelect('cloudApproach',item.name,item._id)}>{item.name}</MenuItem>)}
        </MenuList>
    </Menu>
    </FormControl>

    <FormControl mb={{base: '8px',sm: '8px', lg: '10px'}} isRequired>
    <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700'>Project Industry</FormLabel>
    <Menu>
        <MenuButton w='100%' as={Flex} variant="outline" colorScheme="gray" color='gray.700' rightIcon={<ChevronDownIcon />} className='menu-button'>
        <HStack display='flex' justifyContent='space-between'>
        <Text>{formData.industry}</Text>
        <ArrowDropDownIcon />
        </HStack>
        </MenuButton>
        <MenuList>
            {industry && industry.map((item,ind)=> <MenuItem key={ind} onClick={()=> handleSelect('industry',item.name,item._id)}>{item.name}</MenuItem>)}
        </MenuList>
    </Menu>
    </FormControl>

    <FormControl mb={{ base: '8px', sm: '8px', lg: '10px' }} isRequired>
    <FormLabel fontSize={{ base: '14px', sm: '14px', md: '16px', lg: '17px' }} color='gray.700'>
        Application/Workload Type
    </FormLabel>
    <Flex flexDir='column'  >
        <Flex flexDirection='row' mb='2' wrap='wrap'>
            {formData.workloadType.map((workloadType,ind)=> <>
                <Box key={ind} mr='4px' bg='gray.200' p='2px' pl='10px' pr='10px' borderRadius='20px' display='flex' flexDir='row'>
                    {workloadType}
                    <Box ml='6px' _hover={{bg: 'gray.50'}} borderRadius='45%' display='flex' alignItems='center' justifyContent='center' onClick={()=> handleSelect('workloadType', workloadType)}>
                        <ClearIcon fontSize='small' style={{ color: 'gray' }} />
                    </Box>
                    </Box>
                </>)}
        </Flex>
        <InputGroup>
                <Input
                    placeholder="Search or Add New Workload Type"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onFocus={() => setIsDropdownOpen(true)}
                    onBlur={()=> setTimeout(() => {
                        setIsDropdownOpen(false);
                    }, 200)}
                    onKeyDown={(e) => handleInputKeyDownWorkload(e)}
                    pr="4.5rem"
                />
                <InputRightElement width="4.5rem">
                <Button
                    size="sm"
                    rightIcon={<SearchIcon />}
                    onClick={() => {setSearchInput(''); toggleDropdown()}}
                    variant="ghost"
                    aria-label="Clear search"
            
                />
                </InputRightElement>
            </InputGroup>
                {
                isDropdownOpen && 
                <Flex flexDir='column' >
                            {
                            filteredWorkloadType.map((item, ind) => (
                                <Checkbox
                                key={ind}
                                isChecked={formData.workloadType.includes(item.type_name)}
                                onChange={() => { handleSelect('workloadType', item.type_name);}}
                                colorScheme="teal"
                            >
                                {item.type_name}
                            </Checkbox>
                            ))}
                </Flex>
                }
            </Flex>
</FormControl>

<FormControl mb={{ base: '8px', sm: '8px', lg: '10px' }} isRequired>
    <FormLabel fontSize={{ base: '14px', sm: '14px', md: '16px', lg: '17px' }} color='gray.700'>
        Tech Stacks
    </FormLabel>
    <Flex flexDirection='column'>
        <Flex flexDirection='row' mb='2' wrap='wrap'>
            {formData.techStack.map((techStack, ind) => (
                <Box key={ind} mr='4px' bg='gray.200' p='2px' pl='10px' pr='10px' borderRadius='20px' display='flex' flexDir='row'>
                {techStack}
                <Box key={techStack+ind} ml='6px' _hover={{bg: 'gray.50'}} borderRadius='45%' display='flex' alignItems='center' justifyContent='center' onClick={()=> handleSelect('techStack', techStack)}>
                    <ClearIcon fontSize='small' style={{ color: 'gray' }} />
                </Box>
                </Box>
            ))}
        </Flex>
        <InputGroup>
            <Input
                placeholder="Search or Add New Tech Stack"
                value={searchInputTechStack}
                onChange={(e) => setSearchInputTechStack(e.target.value)}
                onFocus={() => setIsDropdownOpenTechStack(true)}
                onBlur={() =>
                    setTimeout(() => {
                        setIsDropdownOpenTechStack(false);
                    }, 200)
                }
                onKeyDown={(e) => handleInputKeyDownTechStack(e)}
                pr="4.5rem"
            />
            <InputRightElement width="4.5rem">
                <Button
                    size="sm"
                    rightIcon={<SearchIcon />}
                    onClick={() => {
                        setSearchInputTechStack('');
                        toggleDropdownTechStack();
                    }}
                    variant="ghost"
                    aria-label="Clear search"
                />
            </InputRightElement>
        </InputGroup>
        {isDropdownOpenTechStack && (
        <Flex flexDir="column">
            {filteredTechStack.map((item, ind) => (
                <Checkbox
                    m="1px"
                    _hover={{ bg: 'gray.200', cursor: 'pointer' }}
                    key={ind}
                    isChecked={formData.techStack.includes(item.teckstack_name)}
                    onChange={() => {
                        handleSelect('techStack', item.teckstack_name);
                        setSearchInputTechStack('')
                    }}
                >
                    {item.teckstack_name}
                </Checkbox>
            ))}
        </Flex>
    )}
    </Flex>
</FormControl>
    </Flex>
    </>
  )
}

export default DueDiligence