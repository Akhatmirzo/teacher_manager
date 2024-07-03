import React from 'react'
import { PuffLoader } from 'react-spinners'

export default function PrimaryLoading({ loading = false }) {
  return (
    loading && <div className='w-full h-screen fixed top-0 left-0 bg-[#ffffffbc] flex items-center justify-center'>
      <PuffLoader size={150} color='#399af5' />
    </div>
  )
}
