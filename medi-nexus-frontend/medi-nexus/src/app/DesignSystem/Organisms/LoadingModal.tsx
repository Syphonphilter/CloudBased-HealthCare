import React from 'react';
import { Spinner } from '../Atoms/Spinner/Spinner';
import { LoaderInterface } from '@/app/Utils/interfaces';



const LoadingModal = (props: LoaderInterface) => {
    
    return (
        props.isOpen && (
            <div className=" fixed top-0 pb-32 left-0 z-0 w-full h-full flex justify-center items-center bg-black bg-opacity-90">
              <div className="bg-item-dark app-modal bottom-50 w-1/6 h-1/5 rounded-3xl flex-col flex justify-center items-center">
                <p className="mb-7 text-white text-lg loader-text">{props.progressLabel}</p>
                <Spinner />
              </div>
            </div>
          )
  );
};

export default LoadingModal;
