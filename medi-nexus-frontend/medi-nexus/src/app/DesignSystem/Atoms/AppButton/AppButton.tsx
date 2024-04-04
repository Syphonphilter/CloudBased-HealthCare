import React from 'react';
import Button from '@mui/material/Button';
import styles from './AppButton.module.css'
import { Borders } from '../../DesignTokens/Borders';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppButtonInterface } from '@/app/Utils/interfaces';



export const AppButton: React.FC<AppButtonInterface> = ({ onClick, label, className, icon,isNotDefault,bgColor }) => {
  // Apply Tailwind classes directly in the className
  // cssClass can optionally add or override the default Tailwind classes
  const buttonStyles: React.CSSProperties = {
    color: '#fff',
    backgroundColor: bgColor,
    fontFamily: 'var(--font-family)',
    fontWeight: 'bold',
    fontSize: '1em',
  };
  const buttonStyleToApply = isNotDefault ? buttonStyles : undefined;
  
  return (
    <Button style={buttonStyleToApply} className={className=isNotDefault?className = `${className}`:className=`${styles.app_button}  w-full h-12 `}   sx={{ borderRadius: Borders.input_border_regular }} onClick={onClick}>
      {label}  &nbsp;
     <FontAwesomeIcon icon={icon} />
    </Button>
  );
};
