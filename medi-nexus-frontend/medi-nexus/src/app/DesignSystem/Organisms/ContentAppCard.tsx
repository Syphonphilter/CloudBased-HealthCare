import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import React from 'react'


import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import AppIcon from '../Atoms/AppIcon/AppIcon'
import { Colors } from '../DesignTokens/Colors'
import { Borders } from '../DesignTokens/Borders'
import { ContentCardInterface } from '@/app/Utils/interfaces'


const ContentAppCard = (props:ContentCardInterface) => {
  return (
    <div className='p-2  flex align-middle'>
    <Card className='w-[30vw] h-[20vh]' sx={{borderRadius:Borders.input_border_regular, paddingBottom:0  }}>
    <CardContent>
    <div className="flex justify-center pt-0">
          <div className="w-2/4 p-2">
            <div className="storage-square">
            <div className=" bg-app-accent-light p-4 rounded-xl   justify-center align-middle items-center flex w-20"> <AppIcon icon={props.icon} color={Colors.primary} size={undefined} /></div>
            <br/>
              {props.header}
              <div className=' text-gray-500  text-xs'>{props.h2}</div>
              <br />
              <br />
              <div>{props.h1}</div>
              <br />
            </div>
          </div>
        <div className="w-2/4 p-2 justify-center items-center flex">
          </div>
        </div>
    </CardContent>
      </Card>
    </div>
  )
}

export default ContentAppCard