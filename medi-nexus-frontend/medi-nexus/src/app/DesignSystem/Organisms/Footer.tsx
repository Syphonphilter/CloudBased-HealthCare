import React from 'react'
import TypographyComponent from '../Atoms/Typography/TypographyComponent'
import { Colors } from '../DesignTokens/Colors'


const Footer = () => {
  return (
    <footer style={{backgroundColor:Colors.primary}} className=" justify-center flex m-auto p-2 fixed w-full bottom-0  ">
          &copy; {new Date().getFullYear()} &nbsp; <TypographyComponent fontSize={15} variant="p">Medi-Nexus</TypographyComponent>
        </footer>
  )
}

export default Footer