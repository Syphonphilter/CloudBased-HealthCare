'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'

import Form from '@/app/DesignSystem/Organisms/Form';
import LoadingModal from '@/app/DesignSystem/Organisms/LoadingModal';
import { AppFormData } from '@/app/Utils/interfaces';
import TypographyComponent from '@/app/DesignSystem/Atoms/Typography/TypographyComponent';
import { AppButton } from '@/app/DesignSystem/Atoms/AppButton/AppButton';

const PatientAuth = () => {

    const navigate = useRouter();
    const [formData, setFormData] = useState<AppFormData>({ProviderID: '', Password: '' });
    const [loadingState, setLoadingState] = useState(false);

    const handleLogin = () => {
        setLoadingState(true);
        setTimeout(() => {
            setLoadingState(false);
            navigate.push('/Dashboard');
        }, 2000);
    }


    return (
        <div className='flex flex-col justify-center items-center  h-screen'>
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
