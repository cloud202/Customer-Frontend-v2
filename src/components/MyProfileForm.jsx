import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Flex, FormControl, FormLabel, HStack, Input, Menu, MenuButton, MenuItem, MenuList, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { setProfileData } from '../features/formData/profileForm';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { countriesData } from '../data/country';
import { roles } from '../data/role';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import '../css/user/dueDiligence.css'

const MyProfileForm = () => {
  const [industry,setIndustry] = useState();
  const toast = useToast();
  const profileData = useSelector((state)=> state.profileForm.profileData)
  const dispatch = useDispatch();

  const handleInputChange=(e)=>{
    if(e.target===undefined)   return;
    const {name,value} = e.target;
    dispatch(setProfileData({field: name,value}))
  }

  const handleSelect = (field,value)=>{
    dispatch(setProfileData({field,value}));
  }

  const [searchInput, setSearchInput] = useState('');
  const filteredCountries = countriesData.countries.filter((country) =>
    country.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const [searchCountryCodeInput, setSearchCountryCodeInput] = useState('');
  const filteredCountriesCode = countriesData.countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchCountryCodeInput.toLowerCase()) ||
      country.code.toLowerCase().includes(searchCountryCodeInput.toLowerCase())
  );

  const handleCountryCodeSearchInputChange = (e) => {
    setSearchCountryCodeInput(e.target.value);
  };

  async function fetchData(){
    try{
        const industry = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/master/project_industry`);
        setIndustry(industry.data);

    }catch(e){
        console.log('Error fetching data',e);
    }
}

useEffect(()=>{
  fetchData();
},[])
  return (
    <>
          <FormControl mb={{base: '8px',sm: '8px', lg: '10px'}}>
            <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700'>Name</FormLabel>
            <Input isDisabled={true} w='100%' type="text" placeholder="Enter your name" name='customer_name' value={profileData.customer_name} onChange={(e)=> handleInputChange(e)}/>
            </FormControl>

          <FormControl mb={{base: '8px',sm: '8px', lg: '10px'}}>
            <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700'>Role</FormLabel>
            <Menu>
              <MenuButton w='100%' as={Flex} variant="outline" colorScheme="gray" color='gray.700' className='menu-button'>          
              <HStack display='flex' justifyContent='space-between'>
              <Text>{profileData.customer_role}</Text>
              <ArrowDropDownIcon />
              </HStack>
              </MenuButton>
              <MenuList style={{height: '300px',overflow: 'auto'}}>
                {roles.map((role,ind)=> <MenuItem key={ind} onClick={()=> handleSelect('customer_role',role)}>{role}</MenuItem>)}
              </MenuList>
          </Menu>
            </FormControl>

          <FormControl mb={{base: '8px',sm: '8px', lg: '10px'}}>
            <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700'>Company</FormLabel>
            <Input w='100%' type="text" placeholder="Enter your company name" name='customer_company' value={profileData.customer_company} onChange={(e)=> handleInputChange(e)}/>
            </FormControl>

          <FormControl mb={{base: '8px',sm: '8px', lg: '10px'}}>
            <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700'>Company Size</FormLabel>
            <Menu>
              <MenuButton w='100%' as={Flex} variant="outline" colorScheme="gray" color='gray.700' className='menu-button'>
              <HStack display='flex' justifyContent='space-between'>
              <Text>{profileData.customer_company_size}</Text>
              <ArrowDropDownIcon />
              </HStack>
              </MenuButton>
              <MenuList >
                  <MenuItem onClick={()=> handleSelect('customer_company_size',"1")}>1</MenuItem>
                  <MenuItem onClick={()=> handleSelect('customer_company_size',"20")}>2-20</MenuItem>
                  <MenuItem onClick={()=> handleSelect('customer_company_size',"50")}>21-50</MenuItem>
                  <MenuItem onClick={()=> handleSelect('customer_company_size',"100")}>50-100</MenuItem>
                  <MenuItem onClick={()=> handleSelect('customer_company_size',"101")}>100+</MenuItem>
              </MenuList>
          </Menu>
            </FormControl>

          <FormControl mb={{base: '8px',sm: '8px', lg: '10px'}}>
            <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700'>Country</FormLabel>
            <Menu>
              <MenuButton w='100%' as={Flex} variant="outline" colorScheme="gray" color='gray.700' className='menu-button'>
              <HStack display='flex' justifyContent='space-between'>
              <Text>{profileData.customer_country}</Text>
              <ArrowDropDownIcon />
              </HStack>
              </MenuButton>
              <MenuList style={{maxHeight: '300px',overflow: 'auto'}}>
            <Input
              w='100%'
              type='text'
              placeholder='Search country...'
              value={searchInput}
              onChange={handleSearchInputChange}
            />
            {filteredCountries.map((country, ind) => (
              <MenuItem
                key={ind}
                onClick={() => {handleSelect('customer_country', country.name); setSearchInput('')}}
              >
                {country.name}
              </MenuItem>
            ))}
          </MenuList>
          </Menu>

            </FormControl>

          <FormControl mb={{base: '8px',sm: '8px', lg: '10px'}}>
            <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700'>Industry</FormLabel>
            <Menu>
              <MenuButton w='100%' as={Flex} variant="outline" colorScheme="gray" color='gray.700' className='menu-button' >
              <HStack display='flex' justifyContent='space-between'>
              <Text>{profileData.customer_industry}</Text>
              <ArrowDropDownIcon />
              </HStack>
              </MenuButton>
              <MenuList>
                  {industry && industry.map((item,ind)=> <MenuItem key={ind} onClick={()=> handleSelect('customer_industry',item.name)}>{item.name}</MenuItem>)}
              </MenuList>
          </Menu>
            </FormControl>

          <FormControl mb={{base: '8px',sm: '8px', lg: '10px'}}>
            <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700'>Business Email</FormLabel>
            <Input isDisabled={true} w='100%' type="email" placeholder="Enter business email" name='customer_email' value={profileData.customer_email} onChange={(e)=> handleInputChange(e)}/>
            </FormControl>

          <FormControl mb={{base: '8px',sm: '8px', lg: '10px'}}>
            <FormLabel fontSize={{base: '14px',sm: '14px',md: '16px', lg: '17px'}} color='gray.700'>Mobile Number</FormLabel>
            <Box display='flex' flexDir='row'>
          <Menu>
            <MenuButton
              w='120px'
              as={Button}
              variant='outline'
              colorScheme='gray'
              color='gray.700'
              rightIcon={<ChevronDownIcon />}
            >
              {profileData.customer_mobile.countryCode}
            </MenuButton>
            <MenuList style={{height: '200px',overflow: 'auto'}}>
              <Input
                w='100%'
                type='text'
                placeholder='Search country code...'
                value={searchCountryCodeInput}
                onChange={handleCountryCodeSearchInputChange}
              />
              {filteredCountriesCode.map((country, ind) => (
                <MenuItem
                  key={ind}
                  onClick={() => {handleSelect('countryCode', country.code); setSearchCountryCodeInput('')}}
                >
                  {country.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Input
            ml='4px'
            w='100%'
            type='number'
            placeholder='Enter mobile number'
            name='phoneNumber'
            value={profileData.customer_mobile.phoneNumber}
            onChange={(e) => handleInputChange(e)}
          />
        </Box>
            </FormControl>
          </>
  )
}

export default MyProfileForm