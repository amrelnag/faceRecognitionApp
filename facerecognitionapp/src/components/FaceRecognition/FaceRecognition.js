import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl, box }) => {
    console.log(imageUrl);
    if(imageUrl) {
        return (
            <div className='center ma'>
                <div className='absolute mt2'>
                    <img id='uploadedImage' alt='uploadedImage' src={imageUrl} width='500px' height='auto'></img>
                    <div className='bounding-box' style={{top: box.topRow, 
                                                         right: box.rightCol, 
                                                         bottom: box.bottomRow, 
                                                         left: box.leftCol}}></div>
                </div>
                
            </div>
         )
    } else {
        return null;
    }
   
}

export default FaceRecognition;