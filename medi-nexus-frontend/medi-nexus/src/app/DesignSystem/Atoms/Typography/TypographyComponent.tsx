

import { TypographyInterface } from '../../../Utils/interfaces';
import { Typography } from '@mui/material'
import React from 'react'



const TypographyComponent = (props: TypographyInterface) => {
  return (
  
    <Typography fontSize={props.fontSize}  variant={props.variant} style={{ fontFamily: 'Montserrat , sans-serif' }} className={props.className}>
        {props.children}
      </Typography>
    );
  };
  

export default TypographyComponent