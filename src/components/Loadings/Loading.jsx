import React from 'react'
import { useSelector } from 'react-redux'
import { HashLoader } from 'react-spinners'

export default function Loading({ loading }) {
  const isLoading = useSelector(state => state.teachers.isLoading)
  return (
    isLoading && <div className='w-full h-screen absolute top-0 left-0 bg-black flex items-center justify-center'>
      <HashLoader color="#fff" size={150} />
    </div>
  )
}
