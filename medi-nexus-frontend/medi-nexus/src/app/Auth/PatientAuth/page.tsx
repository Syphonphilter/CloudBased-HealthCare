'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import Form from '@/app/DesignSystem/Organisms/Form';
import LoadingModal from '@/app/DesignSystem/Organisms/LoadingModal';
import { AppFormData } from '@/app/Utils/interfaces';
import TypographyComponent from '@/app/DesignSystem/Atoms/Typography/TypographyComponent';
import { AppButton } from '@/app/DesignSystem/Atoms/AppButton/AppButton';
import medinexusLogo from  '../../../Assets/Images/medinexuslogo.png'


const PatientAuth = () => {

    const navigate = useRouter();
    const [formData, setFormData] = useState<AppFormData>({Names:'',Gender:'',Phone:'',Email: '', Password: '' });
    const [loadingState, setLoadingState] = useState(false);

    const handleLogin = () => {
        setLoadingState(true);
        setTimeout(() => {
            setLoadingState(false);
        }, 2000);
    }


    return (
        <div className='flex flex-col justify-center items-center  h-screen'>
           <Image src={medinexusLogo} alt="logo" width={250} height={250} />

            <Form formData={formData} setFormData={setFormData} buttonLabel='Register' buttonAction={handleLogin} />

            <div className="w-full justify-center space-y-4 text-center md:w-2/4">
            <TypographyComponent  fontSize={15}>
                <p>
                 Or.
                </p>
                </TypographyComponent>
            
            <AppButton
                className='app-button w-full h-12 '
                label='Try a Demo Account'
                onClick={() => {
                 
                }}/>
            <LoadingModal progressLabel='REGISTERING' isOpen={loadingState} />
            </div>

        </div>
    );
};

export default PatientAuth;
