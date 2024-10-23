import React from 'react';
import "./loading.css"
import i18n from '../../i18n';
const Loading = () => {
    return (
        <div className='loading' style={{ left: (i18n.dir()==='rtl'?'40%' :"50%")}} >
            <div className="cube-loader" >
                <div className="cube-top"></div>
                <div className="cube-wrapper">
                    <span className="cube-span" style={{ '--i': 0 }}>
                        <div className="taco-container" style={{ textAlign: 'center', fontSize: '50px' }}>
                            <img src="\images\loading\loading.jpeg" alt="Image 1" />
                        </div>
                    </span>
                    <span className="cube-span" style={{ '--i': 1 }}>
                        <div className="taco-container" style={{ textAlign: 'center', fontSize: '50px' }}>
                            <img src="\images\loading\loading.jpeg" alt="Image 2" />
                        </div>
                    </span>
                    <span className="cube-span" style={{ '--i': 2 }}>
                        <div className="taco-container" style={{ textAlign: 'center', fontSize: '50px' }}>
                            <img src="\images\loading\loading.jpeg" alt="Image 3" />
                        </div>
                    </span>
                    <span className="cube-span" style={{ '--i': 3 }}>
                        <div className="taco-container" style={{ textAlign: 'center', fontSize: '50px' }}>
                            <img src="\images\loading\loading.jpeg" alt="Image 4" />
                        </div>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Loading;
