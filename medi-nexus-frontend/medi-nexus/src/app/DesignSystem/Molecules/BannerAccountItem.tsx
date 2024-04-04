import React from 'react'
import RoundedPhoto from '../Atoms/RoundedPhoto/RoundedPhoto'
import { Button } from '@mui/material'
import { Colors } from '../DesignTokens/Colors'
import { Labels } from '../DesignTokens/Labels'

import AppIcon from '../Atoms/AppIcon/AppIcon'
import { faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { bannerInterface } from '@/app/Utils/interfaces'


const BannerAccountItem = (props:bannerInterface) => {
  return (
    
      <div className='flex items-center bg-item-dark rounded-xl p-4 justify-center '>
         <AppIcon icon={faUserCircle}  size ='2x' color={Colors.primary}/>    
        <div className=' pl-4 '>
        <h5 style={{fontSize:'1em', whiteSpace: 'nowrap' }} className=" text-white  justify-center text-left">{ props.appUserFullName}</h5>
        <Button sx={{ color: Colors.primary, padding: '0px', fontFamily: Labels.font_family, fontSize: '0.7em', textTransform: 'capitalize' }} >{ props.speciality}</Button>
        </div>
        </div>
  )
}

export default BannerAccountItem