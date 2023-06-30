import AuthLayout from '@/Layouts/AuthLayout'
import React from 'react'

export default function Edit({ auth }) {
  return (
    <AuthLayout user={auth.user}>
    </AuthLayout>
  )
}
