import {  Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, IconButton, List, ListIcon, ListItem, useBreakpointValue, useDisclosure } from '@chakra-ui/react'
import { CalendarIcon, ExternalLinkIcon, HamburgerIcon, PlusSquareIcon, ViewIcon } from '@chakra-ui/icons'
import React from 'react'
import { Link ,useLocation} from 'react-router-dom'
import PsychologyIcon from '@mui/icons-material/Psychology';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import ChaletOutlinedIcon from '@mui/icons-material/ChaletOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import RoofingOutlinedIcon from '@mui/icons-material/RoofingOutlined';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import { useSelector } from 'react-redux';

const Sidebar = () => {
    const location = useLocation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isMember = useSelector((state)=> state.token.isMember);

      const sidebarItems = [
        { label: "New Project", route: "/newproject",icon: AddBoxOutlinedIcon },
        { label: "My Projects", route: "/myproject",icon: RecentActorsIcon },
        { label: "GenAI Tools", route: "/admin/phase",icon: PsychologyIcon },
        { label: "Business Case Solution", route: "/admin/module",icon: BusinessCenterOutlinedIcon },
        { label: "Cloud Intelligence Dashboard", route: "/admin/task",icon: CalculateOutlinedIcon },
        { label: "Architecture Centre", route: "/admin/solution",icon: RoofingOutlinedIcon },
        { label: "Knowledge Base", route: "/admin/customer",icon: MenuBookOutlinedIcon },
      ];

      const showSidebar = useBreakpointValue({ base: false, md: false,lg: true });

      if (showSidebar) {
        return (
          <List bg="#546269" position="fixed" minH="100vh"  p="12px" pt='20px'>
            {sidebarItems.map((item, index) => (
              isMember && item.label === "New Project" ? null : (
                <Link to={item.route} key={index}>
                  <ListItem
                    mb="10px"
                    p="5px"
                    color={location.pathname === item.route ? "#ffca39" : "#FFFFFF"}
                    _hover={{ borderRadius: '8px', backgroundColor: "#e6b01aa8" }}
                  >
                    <ListIcon as={item.icon} />
                    {item.label}
                  </ListItem>
                </Link>
              )
            ))}
          </List>
        );
      } else {
        return (
          <>
          <Box position="fixed" top="6px" left="4px" zIndex={3}>
            <IconButton
              icon={<HamburgerIcon />}
              aria-label="Open Menu"
              onClick={onOpen}
              display={{ base: 'block', sm: 'block',md: 'block',lg: 'none' }}
              bg="#04373A"
              color="white"
              _hover={{ bg: "#D9A718" }}
              _active={{ bg: "#D9A718" }}
            />
            <Drawer isOpen={isOpen} onClose={onClose} placement="left">
                <DrawerOverlay>
                <DrawerContent bg="#546269">
                    <DrawerCloseButton color="white" />
                    <DrawerHeader color="white">Menu</DrawerHeader>
                    <DrawerBody>
                    <List spacing={3}>
                        {sidebarItems.map((item, index) => (
                        isMember && item.label==="New Project" ? null: <Link to={item.route} key={index}>
                            <ListItem
                            mb="15px"
                            p="5px"
                            color={location.pathname === item.route ? "#ffca39" : "#FFFFFF"}
                            _hover={{borderRadius:'8px', backgroundColor: "#e6b01aa8" }}
                            >
                            <ListIcon as={item.icon} />
                            {item.label}
                            </ListItem>
                        </Link>
                        ))}
                    </List>
                    </DrawerBody>
                </DrawerContent>
                </DrawerOverlay>
      </Drawer>
      </Box>
          </>
        );
      }
}

export default Sidebar