import React from 'react';
import { Button } from '@mui/material';
import { Colors } from '../DesignTokens/Colors';
import { Labels } from '../DesignTokens/Labels';
import AppIcon from '../Atoms/AppIcon/AppIcon';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface NavigationMenuItemProps {
  label: string;
  icon: IconDefinition;
  color: string;
  onClick: () => void;
}

const NavigationMenuItem: React.FC<NavigationMenuItemProps> = ({ label, icon, color, onClick }) => {
  return (
    <div className='flex justify-start pl-7 py-3'>
      <Button onClick={onClick} sx={{ color: color, fontFamily: Labels.font_family, fontSize: '0.7em' }}>
        <AppIcon  size ='2x' className='h-6 w-6' icon={icon} color={Colors.primary} /> &nbsp; &nbsp;
        <div className='flex justify-center items-center align-middle text-sm'><b>{label}</b></div>
      </Button>
    </div>
  );
};

export default NavigationMenuItem;
