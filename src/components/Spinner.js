import React from 'react'
import loading from './assets/loading.gif'

export default function Spinner() {
    return (
      <div className='bg-[#fffef8] min-h-screen flex justify-center'>
        <img className='h-52' src={loading} alt="loading" />
      </div>
    )
}
