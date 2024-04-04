'use client'

import DashboardLayout from '@/app/DesignSystem/AppTemplates/DashboardLayout'
import React from 'react'

const page = ({ params }: any) => {
    console.log(params)
  console.log(params.role)

    return (
<DashboardLayout   appUser={params.role} />
  )
}

export default page