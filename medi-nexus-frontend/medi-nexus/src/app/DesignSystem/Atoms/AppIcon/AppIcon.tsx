import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconInterface } from '@/app/Utils/interfaces'



const AppIcon = (props:IconInterface) => {
  return (
    <FontAwesomeIcon className={ props.className} icon={props.icon} size='2x' color={props.color}  />
  )
}

export default AppIcon