import React, { useEffect, useState } from 'react';
import ptad_core_logo from '../../Assets/Images/ptadCoreLogo.png';
import { FormInput } from '../Atoms/FormInput/FormInput';
import { AppButton } from '../Atoms/AppButton/AppButton';

import Image from 'next/image';
import './Organisms.css'
import { formChildProps } from '@/app/Utils/interfaces';
interface file extends formChildProps {
  onFileUpdate?: (file: any) => any
}
const Form: React.FC<file> = ({ formData, setFormData, buttonLabel, buttonAction,onFileUpdate }) => {
  const [file, setFile] = useState(null);

  useEffect(() => {
    console.log(file);
    if(onFileUpdate)
      onFileUpdate(file)
  }, [file, onFileUpdate]);
  const onChange = (fieldName: string, value: string,event?:any) => {
    console.log(value)
    console.log(fieldName)
    console.log(event.target.files[0])
    if (event.target.files) {
      setFile(event.target.files[0]);
      
    }
       setFormData({ ...formData, [fieldName]: value });
  };
  const getInputType = (fieldName: string): string => {
    switch (fieldName) {
      case 'email':
        return 'email';
      case 'password':
        return 'password';
      case 'number':
        return 'number';
      case 'date':
        return 'date';
      // Add more cases as needed for different field names
      default:
        return 'text';
    }
  }
        
  return (
    <div className=" flex w-full justify-center items-center">
      <div className="w-full md:w-2/4">
        <div className="app-form rounded-2xl bg-item-dark shadow-md  px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            
            {/* <Image
              src={ ptad_core_logo} 
              alt="Login"
              className=" w-2/4 justify-center m-auto  items-center  mb-5"
            ></Image> */}
          </div>
          <form className="mb-4">
            {Object.keys(formData).map((fieldName, index) => (
              <div key={0} className="mb-6">
                <FormInput
                  className=' input appearance-none  rounded-2xl w-full  text-white leading-tight focus:outline-none focus:shadow-outline'
                  id={formData[fieldName]}
                  key={index}
                  file={file}
                  fieldName={fieldName}
                  value={formData[fieldName]}
                  inputType={fieldName}
                  placeHolder={fieldName}
                  onChange={onChange}
                />
              </div>
            ))}
      
            <div className="flex items-center justify-between">
              <AppButton
                className='app-button  w-full h-12 '
                label={buttonLabel}
                onClick={() => {
                  buttonAction()
                }}/>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export default Form;
