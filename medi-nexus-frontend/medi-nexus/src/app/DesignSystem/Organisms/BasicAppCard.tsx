import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import React from 'react'

import { Colors } from '../DesignTokens/Colors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { Borders } from '../DesignTokens/Borders'
import { ContentCardInterface } from '@/app/Utils/interfaces'

const BasicAppCard = (props: ContentCardInterface) => {
  return (
    <div className='p-2 flex  '>
    <Card className=' w-[17vw]  h-[20vh]' sx={{borderRadius:Borders.input_border_regular, paddingBottom:0 }}>
      <CardContent>
        <div className="flex  pt-0">
          <div className="w-2/3 p-2">
            <div className="storage-square">
            <div className=" bg-app-accent-light p-8 rounded-xl   justify-center align-middle items-center flex w-1/3 h-12"> <FontAwesomeIcon icon={props.icon} size='2x' color={Colors.primary}  /></div>
            <br/>
              {props.header}
              <br />
              <br />
              <div>{props.h1}</div>
            </div>
            </div>
            <div className="w-1/3 p-4">
            <div className='flex justify-center '>
              <img
                src="https://assets.website-files.com/6057ab51530cb39d3fdac75d/605b3da6bf39491be81291c6_Dash%20-%20Avatar%2009-min.jpg"
                loading="lazy"
                alt=""
                className="rounded-full h-10 w-10 border-2 border-solid z-10  border-app-accent-light "
              />
              <img
                src="https://assets.website-files.com/6057ab51530cb39d3fdac75d/605b3cfaebf62f4f1b3ef035_Dash%20-%20Avatar%2007-min.jpg"
                loading="lazy"
                alt=""
                className="rounded-full h-10 w-10 border-2 border-solid -ml-6 z-0  border-app-accent-light"
              />
            </div>
            </div>

      </div>
      </CardContent>
      </Card>
      </div>
  )
}

export default BasicAppCard