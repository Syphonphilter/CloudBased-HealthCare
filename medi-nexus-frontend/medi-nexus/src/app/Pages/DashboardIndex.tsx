import React from 'react';
import { faInfoCircle, faCoins, faCheckCircle, faCircle, faListDots, faCalendarDay, faClipboardList, faTimesSquare, faHospitalUser } from '@fortawesome/free-solid-svg-icons';
import { Colors } from '../DesignSystem/DesignTokens/Colors';
import ListTable from '../DesignSystem/Molecules/ListTable';
import DashboardContainer from '../DesignSystem/Organisms/DashboardContainer';
import ValueBasedAppCard from '../DesignSystem/Organisms/ValueBasedAppCard';
import Image from 'next/image'
import medinexusLogo from '../../Assets/Images/medinexuslogo.png';
import AppIcon from '../DesignSystem/Atoms/AppIcon/AppIcon';
import { AppButton } from '../DesignSystem/Atoms/AppButton/AppButton';

const DashboardIndex = () => {
  const myObject: { [key: string]: any[] } = {
    data1: ['P1000', 'Abdulkadir Bala', 'CASE-200','Pending'],
    data2: ['P1235', 'Disha Rajesh', 'CASE-300','Done'],
    data3: ['P1236', 'Nirav', 'CASE-400','Failed'],
  };

  const viewStatus = (status: string) => {
    console.log(status)
    let color =  Colors.danger
    if (status === 'Pending') {
        color = Colors.pendingItem
    }
    else if (status === 'Done') {
        color = Colors.primary
    }

    return <>
        <AppIcon className='h-3 w-3' size='1x' icon={faCircle} color={color} />  &nbsp; {status}
    </>
}
const viewAction = (id:string) => {
return <>
  <AppButton isNotDefault={true} bgColor={Colors.secondary} className=' text-sm w-3/3 h-8 '
    icon={faInfoCircle} onClick={function (): void {
throw new Error('Function not implemented.');
} }/>
</>
}

  const tableObject = Object.fromEntries(
    Object.entries(myObject).map(([key, value]) => [
      key,
      [...value.slice(0, 3), viewStatus(value[3]), viewAction(value[1].toString())], // Adding viewAction with value[1] as parameter
    ])
  );

  return (
    <DashboardContainer>
      <div className='flex justify-center w-full'>
            <Image src={medinexusLogo} alt="logo" className='justify-center lg:-mt-28 md:-mt-0 mb-14' width={250} height={250} />
          </div>
      <div className=''>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <ValueBasedAppCard icon={faClipboardList} header='Patient Schedule' value='1' percentile={+3} />
          <ValueBasedAppCard color={Colors.pendingItem} accent={Colors.pendingItemLight} icon={faCalendarDay} header='Appointments Today' value='1' />
          <ValueBasedAppCard color={Colors.secondary} accent={Colors.secondaryLight} icon={faHospitalUser} header='Registered Patients' value='3' />
          <ValueBasedAppCard color={Colors.danger} accent={Colors.dangerLight} icon={faTimesSquare} header='Missed Appointments' value='1' />
        </div>

        <ListTable tableLable={'Appointment Logs'} columnNames={['Patient ID','Patient Name','Case ID','Status','Action']} rowData={tableObject} />
      </div>
    </DashboardContainer>
  );
};

export default DashboardIndex;




