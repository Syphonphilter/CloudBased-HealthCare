
import { ContainerInterface } from '@/app/Utils/interfaces';
import React from 'react';


const DashboardContainer: React.FC<ContainerInterface> = ({ children}) => {
  return (
    <div className="app-container w-[70vw] min-w-full  border-0.5mx-auto pt-2 pl-2 pr-2 rounded-xl">
      <div className=' w-full flex-col p-3 justify-center'>
        
        {children}
      </div>
      
    </div>
  );
};

export default DashboardContainer;
