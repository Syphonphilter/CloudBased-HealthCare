import React from 'react'

import { Box } from '@mui/material'
import { photoInterface } from '@/app/Utils/interfaces'


function RoundedPhoto(props:photoInterface) {
  return (
      <Box component="img" src={ props.src}  className={ props.className} />
  )
}

export default RoundedPhoto