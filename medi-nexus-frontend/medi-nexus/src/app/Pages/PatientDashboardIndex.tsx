import React from 'react';
import { faInfoCircle, faCoins, faCheckCircle, faCircle, faPieChart, faHospitalUser } from '@fortawesome/free-solid-svg-icons';
import { Colors } from '../DesignSystem/DesignTokens/Colors';
import ListTable from '../DesignSystem/Molecules/ListTable';
import DashboardContainer from '../DesignSystem/Organisms/DashboardContainer';
import ValueBasedAppCard from '../DesignSystem/Organisms/ValueBasedAppCard';
import Image from 'next/image'
import medinexusLogo from '../../Assets/Images/medinexuslogo.png';
import ContentAppCard from '../DesignSystem/Organisms/ContentAppCard';
import LinearProgressBar from '../DesignSystem/Atoms/LinearProgressBar/LinearProgressBar';
import BasicAppCard from '../DesignSystem/Organisms/BasicAppCard';
import { AppButton } from '../DesignSystem/Atoms/AppButton/AppButton';
import AppIcon from '../DesignSystem/Atoms/AppIcon/AppIcon';

const PatientDashboardIndex = () => {
const myObject: { [key: string]: any[] } = {
    data1: ['P1234', 'Abdulkadir Bala', 'CASE123','Pending'],
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
            <Image src={medinexusLogo}  alt="logo" className='justify-center lg:-mt-28 md:-mt-0 mb-14' width={250} height={250} />
        </div>
    <div className='p-4'>
        <div className=' grid-cols-1 md:grid-cols-2 gap-4 justify-center flex'>
        <ValueBasedAppCard color={Colors.primary} accent={Colors.primaryLight}  icon={faHospitalUser} header='Appointments Scheduled' value='2' percentile={+3} />
        </div>

        <ListTable tableLable={'Appointment Logs'} columnNames={['Patient ID','Patient Name','Case ID','Status','Action']} rowData={tableObject} />
    </div>
    </DashboardContainer>
);
};

export default PatientDashboardIndex;
