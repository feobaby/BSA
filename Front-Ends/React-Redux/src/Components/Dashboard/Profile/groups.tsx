import React from 'react';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import CreateAGroup from './create-a-group';
import AllGroupsCreated from './all-groups-created';
import { MdCreateNewFolder, MdList, MdLink } from "react-icons/md";
import AllGroupspartOf from './all-groups-part-of';


const Group: React.FC = () => {

  return (
    <>
      <div>
      <Menu>
  <MenuButton>
    Groups
  </MenuButton>
  <MenuList bg='#242323'>
    <MenuItem bg='#242323' icon={<MdCreateNewFolder style={{color: '#F2D2BD'}} />}><CreateAGroup /></MenuItem>
    <MenuItem bg='#242323' icon={<MdList style={{color: '#F2D2BD'}}/>}><AllGroupsCreated /></MenuItem>
    <MenuItem bg='#242323' icon={<MdLink style={{color: '#F2D2BD'}} />}><AllGroupspartOf /></MenuItem>
  </MenuList>
</Menu>
      </div>
    </>
  );
};

export default Group;
