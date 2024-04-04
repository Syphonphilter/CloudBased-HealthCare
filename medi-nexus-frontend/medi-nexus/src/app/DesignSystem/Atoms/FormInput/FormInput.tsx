import { TextField, css } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Borders} from '../../DesignTokens/Borders'
import { FormInputInterface } from '@/app/Utils/interfaces';




export const FormInput = (props: FormInputInterface) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Check if custom onChange handler is provided
    if (props.onCustomChange) {
      props.onCustomChange(event); // Use the custom handler
    } else {
      // Fallback to the default behavior
      const { value } = event.target;
      props.onChange(props.fieldName, value,event); // Call the provided onChange prop
    }
  };
  return (
    <TextField ref={props.ref}  type={props.inputType}  sx={{
      '& .MuiOutlinedInput-root': {
        border:'2px solid #333',
        borderRadius: Borders.input_border_regular,
        color:'#fff',// Set your desired border radius value
      },
      fontFamily: 'Montserrat, sans-serif', // Use Montserrat as the primary font with a fallback
    }} name={props.fieldName} placeholder={ props.fieldName} className={props.className} id={ props.id}  onChange={handleChange} />
  )
}
