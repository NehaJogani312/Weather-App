import React from 'react'
import loading from '../images/loading.gif'

const Spinner = () => {
    return (
      <div className='text-center' style={{background: 'transparent'}}>
        <img className='my-3' src={loading} alt="loading" />
      </div>
    )
}

export default Spinner
