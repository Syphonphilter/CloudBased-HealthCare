import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TypographyComponent from '../Atoms/Typography/TypographyComponent';
import { Borders } from '../DesignTokens/Borders';
import { Colors } from '../DesignTokens/Colors';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppIcon from '../Atoms/AppIcon/AppIcon';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { createTableData } from '@/app/Utils/Functions';
import { listTable } from '@/app/Utils/interfaces';

const ListTable = (props: listTable) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const rows = Object.entries(props.rowData).map(([key, value]) => {
    return createTableData([value]);
  });
  const headerCellStyle = (index: number) => ({
    color: 'white',
    borderTopLeftRadius: index === 0 ? '0.5em' : '0',
    borderBottomLeftRadius: index === 0 ? '1em' : '0',
    borderTopRightRadius: index === props.columnNames.length - 1 ? '0.5em' : '0',
    borderBottomRightRadius: index === props.columnNames.length - 1 ? '1em' : '0',
  });

  // Styles for TableRow
  const rowStyle = (cellIndex: number, length: number) => ({
    backgroundColor: Colors.itemBackground,
    borderTopLeftRadius: cellIndex === 0 ? '0.75em' : '0',
    borderBottomLeftRadius: cellIndex === 0 ? '0.75em' : '0',
    borderTopRightRadius: cellIndex === length - 1 ? '0.75em' : '0',
    borderBottomRightRadius: cellIndex === length - 1 ? '0.75em' : '0',
    '&:hover': {
      backgroundColor: Colors.itemHover,
      transform: 'scale(1.005)',
      transition: 'transform 0.7s ease, color 0.7s ease, background 0.5s ease-out',
    },
    transition: 'transform 0.7s ease, color 0.7s ease, background 0.5s ease-out',
  });

  // Styles for TableCell when it's a body cell
  const bodyCellStyle = (i: number, length: number) => ({
    color: 'white',
    borderTopLeftRadius: i === 0 ? '1.5em' : '0',
    borderBottomLeftRadius: i === 0 ? '1.5em' : '0',
    borderTopRightRadius: i === length - 1 ? '1.5em' : '0',
    borderBottomRightRadius: i === length - 1 ? '1.5em' : '0',
  });
  if (isMobile) {
    return (
      <div className="">
        <TypographyComponent fontSize={25} className="justify-start p-3 text-white">
          {props.tableLable}
        </TypographyComponent>
        {rows.map((row, index) => (
          <Paper key={index} sx={{
            margin: '16px',
            padding: '16px',
            color: Colors.absoluteWhite,
            backgroundColor: Colors.itemBackground,
            borderRadius: Borders.input_border_large,
          }}>
            {row.rowData[0].map((cell: any, cellIndex: any) => (
              <div key={cellIndex} className="flex p-1 justify-between">
                <TypographyComponent fontSize={12}>
                  <strong>{props.columnNames[cellIndex]}:</strong>
                </TypographyComponent>
                <TypographyComponent fontSize={12}>
                  {cell}
                </TypographyComponent>
              </div>
            ))}
          </Paper>
        ))}
      </div>
    );
  } else {
    return (
      <div className='  p-2'>
         <TypographyComponent fontSize={25} className='justify-start p-3 text-white '  >
        
         {props.tableLable}
        </TypographyComponent>
        <TableContainer className='scrollable-div' sx={{ borderRadius: Borders.input_border_regular, backgroundColor:'transparent'}} component={Paper}>
         
      <Table sx={{ minWidth: 700}} aria-label="simple table">
        <TableHead sx={{ color:'#ffffff', borderRadius:'10px',}}>
          <TableRow sx={{backgroundColor: Colors.primary,   color:'#ffffff'}}>
                {props.columnNames.map((column, index) => (
             
              <TableCell sx={{
                color: '#ffffff',
               
                borderTopLeftRadius: index === 0 ? '0.5em' : '0',
                borderBottomLeftRadius: index === 0 ? '1em' : '0',
                borderTopRightRadius: index ===  props.columnNames.length-1 ? '0.5em' : '0',
                borderBottomRightRadius: index === props.columnNames.length-1 ? '1em' : '0',
              }} key={index}>
                <TypographyComponent fontSize={15} className='justify-start text-lg' >
                  
                {column}
             </TypographyComponent>
              </TableCell>))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, cellIndex) => (
            <TableRow key={cellIndex}
              sx={{
                border: '7px solid #000',
                
                backgroundColor:Colors.itemBackground,
                borderTopLeftRadius: cellIndex === 0 ? '0.75em' : '0',
                borderBottomLeftRadius: cellIndex === 0 ? '0.75em' : '0',
                borderTopRightRadius: cellIndex === row.rowData[0].length - 1 ? '0.75em' : '0',
                borderBottomRightRadius: cellIndex === row.rowData[0].length - 1 ? '0.75em' : '0',
              '&:hover': {
                backgroundColor:Colors.itemHover, // Change background color on hover to 'lightgrey' (replace with your color)
                transform: 'scale(1.005)', // Apply scaling effect on hover
                transition: 'transform 0.7s ease, color 0.7s ease, background 0.5s ease-out', // Transition for transform, color, and background-color
                },
                transition: 'transform 0.7s ease, color 0.7s ease, background 0.5s ease-out',
            }}
          >
            {row.rowData[0].map((item:any, i:any) => (
              <TableCell
                key={i}
                sx={{
                 
                  color:'#ffffff',
                  borderTopLeftRadius: i === 0 ? '1.5em' : '0',
                  borderBottomLeftRadius: i === 0 ? '1.5em' : '0',
                  borderTopRightRadius: i === row.rowData[0].length - 1 ? '1.5em' : '0',
                  borderBottomRightRadius: i === row.rowData[0].length - 1 ? '1.5em' : '0',
                }}
                align="left"
              > 
                <TypographyComponent fontSize={15} className='justify-start  text-lg' >
               <div className=' flex items-center justify-left m-auto'>
                    {item}
                    </div>
                </TypographyComponent>
              </TableCell>
            ))}
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          </div>
    );
  }
};

export default ListTable;


