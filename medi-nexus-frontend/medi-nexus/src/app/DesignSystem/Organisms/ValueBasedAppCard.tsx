import { Card, CardContent } from '@mui/material';
import React from 'react';
import { Colors } from '../DesignTokens/Colors';
import { Borders } from '../DesignTokens/Borders';
import { ValueBasedCardInterface } from '@/app/Utils/interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ValueBasedAppCard = (props: ValueBasedCardInterface) => {
  return (
    <div className='p-2 flex justify-center'>
      <Card
        className='w-[90vw] md:w-[30vw] h-[15vh]'
        sx={{
          borderRadius: Borders.input_border_large,
          paddingBottom: 0,
          backgroundColor: Colors.itemBackground,
          '&:hover': {
            backgroundColor: Colors.itemHover,
            transform: 'scale(1.025)',
            transition: 'transform 0.7s ease, color 0.7s ease, background 0.5s ease-out',
          },
          transition: 'transform 0.7s ease, color 0.7s ease, background 0.5s ease-out',
        }}
      >
        <CardContent className="flex justify-center items-center h-full">
          <div className="flex justify-center items-center">
            <div className="w-full">
              <div style={{ backgroundColor: props.accent ? props.accent : '#03766850' }} className={`ml-5 p-2 rounded-xl flex justify-center items-center`}>
                <FontAwesomeIcon icon={props.icon} size='4x' color={props.color ? props.color : Colors.primary} />
              </div>
            </div>
            <div className="p-5">
              <div className="text-s text-white">{props.header}</div>
              <div className="flex items-center">
                <h3 className="text-3xl text-white">{props.value}</h3>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ValueBasedAppCard;
