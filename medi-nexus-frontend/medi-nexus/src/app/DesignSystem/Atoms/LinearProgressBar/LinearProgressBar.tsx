import { progressBarInterface } from '@/app/Utils/interfaces'
import { LinearProgress } from '@mui/material'
import React from 'react'
import { Colors } from '../../DesignTokens/Colors'


const LinearProgressBar = (props:progressBarInterface) => {
  return (
    <LinearProgress variant="determinate" sx={{ '& .MuiLinearProgress-bar': { backgroundColor: Colors.primary }, backgroundColor: Colors.primaryLight, borderRadius: 20 }} value={props.percentage} />
  )
}

export default LinearProgressBar