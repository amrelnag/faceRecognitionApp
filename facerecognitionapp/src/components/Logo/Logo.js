import React from 'react';
import Tilt from 'react-tilt';
import face from './face.png';

import './Logo.css';

const Logo = () => {
    return (
       <div className='ma4 mt0'>
           <Tilt className="Tilt br2 shadow-2" options={{max: 55}} style={{height: 70, width:80}}>
               <div className='Tilt-inner'>
                   <img style={{paddingTop: '3px'}} alt='logo' src={face}/>
               </div>
           </Tilt>
       </div>
    )
}

export default Logo;