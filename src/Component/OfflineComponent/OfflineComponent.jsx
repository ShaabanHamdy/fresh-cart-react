import React from 'react'

const OfflineComponent = () => {
  return (
<>
<div className="container">
    <div className="row">
        <div className="col-md-12 d-flex justify-content-center align-items-center min-vh-100">
            <div className='text-center text-danger offline'>
                <i className="fa fa-wifi fs-1"></i>
                <h2 className='h1'> You are Offline, Please Check your internet </h2>
                </div>
        </div>
    </div>
</div>
</>
    )
}

export default OfflineComponent