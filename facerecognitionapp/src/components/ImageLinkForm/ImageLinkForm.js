import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onSubmit}) => {
    return (
       <div className='ma4 mt0'>
          <p className='f3'>
            {'This App will detect faces in your pictures.'}
          </p>
          <div className='center'>
            <div className='form center pa4 br3 shadow-5 bg-light-blue'>
                <input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange}/>
                <button className='w-30 grow f4 link pv2 buttonDetect dib white br3' onClick={onSubmit}>Detect</button>
            </div>  
          </div>
       </div>
    )
}

export default ImageLinkForm;