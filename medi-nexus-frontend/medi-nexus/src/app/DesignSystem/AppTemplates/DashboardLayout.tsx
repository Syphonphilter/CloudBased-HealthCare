'use client'
import React, { useState } from 'react';
import Footer from '../Organisms/Footer';
import Navigation from '../Organisms/Navigation';
import BannerAccountItem from '../Molecules/BannerAccountItem';
import DashboardIndex from '@/app/Pages/DashboardIndex';
import PatientDashboardIndex from '@/app/Pages/PatientDashboardIndex';
interface DashboardLayoutProps {
  appUser: any;
}
const DashboardLayout = (props:DashboardLayoutProps) => {
  const [navigationState, setNavigationState] = useState('Index');
  const staffName = ' Dr. Abdulkadir Bala';
  const speciality = 'Dentist - P1234';

  const handleNavigationStateChange = (newState: string) => {
    setNavigationState(newState);
  };
  const RenderDashboard = () => {
    switch (navigationState) {
      case 'Dashboard':
        return props.appUser ==='patient'?<PatientDashboardIndex/>:<DashboardIndex />;
      default:
        return props.appUser ==='patient'?<PatientDashboardIndex/>:<DashboardIndex />;
    }
  };

  return (
    <div className='flex flex-col md:flex-row'>
      {/* Navigation */}
      <div className='mt-4 w-1/4'>
        <Navigation onUpdate={handleNavigationStateChange} />
      </div>

      {/* Content */}
      <div className=' md:ml-22 bottom-0 w-full'>
        <div className='flex flex-col items-center'>
          <div className='w-full flex justify-between items-center mt-4'>
            {/* Placeholder for Logo alignment */}
            <div></div>

            {/* Account Information positioned to the right */}
            
          </div>

          {/* Dashboard Content */}
          <div className='w-full'>
          <div className='flex md:justify-center justify-center lg:justify-end w-full lg:mr-28'>
  <BannerAccountItem speciality={speciality} appUserFullName={staffName} className={''} src={''} />
</div>


            {RenderDashboard()}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;

