import React from 'react'
import { AppButton } from '../Atoms/AppButton/AppButton';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Button, makeStyles } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Labels } from '../DesignTokens/Labels';
import { Colors } from '../DesignTokens/Colors';
import { SearchInputInterface } from '@/app/Utils/interfaces';


const SearchInput = (props:SearchInputInterface) => {
  return (
    <div className={ props.className}>
  <input
    type="text"
    placeholder="Pensioner No, Account No, Name(s), BVN"
    className="border-1 focus:outline-none  rounded-l-xl  bg-white border-app-accent flex-1 px-4"
    style={{ height: 'inherit' }} // Inline style to inherit height from parent
  />
          <Button
            //   sx={{fontFamily:Labels.font_family, backgroundColor:Colors.primary}}
              sx={{
                  // Tailwind-like styles
                  backgroundColor: Colors.primary,
                  color: 'white',
                  fontFamily:Labels.font_family,
                  borderRadius: '0 0.75em 0.75em 0', // Update this to match your rounded corner style
                  height: '3rem',
              }}
            onClick={() => {  // Handle button click event
              }}>
              <FontAwesomeIcon icon={faSearch} /> &nbsp;
              Search
    </Button>
</div>

  );
};

export default SearchInput;
