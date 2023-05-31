import React from 'react';
import './PlanScreen.css'

function PlanScreen() {
    return (
        <div classNmae="planscrren">
            <div className='planscreen_plan'>
                <div className='planscreen_info'>
                    <h5>Premium</h5>
                    <h6>4K + HDR</h6>
                </div>
                <button>Subscribe</button>
            </div>
            <div className='planscreen_plan'>
                <div className='planscreen_info'>
                    <h5>Standard</h5>
                    <h6>1080p</h6>
                </div>
                <button>Subscribe</button>
            </div>
            <div className='planscreen_plan'>
                <div className='planscreen_info'>
                    <h5>Basic</h5>
                    <h6>720p</h6>
                </div>
                <button>Subscribe</button>
            </div>
            <div className='planscreen_plan'>
                <div className='planscreen_info'>
                    <h5>Mobile pack</h5>
                    <h6>480p</h6>
                </div>
                <button>Subscribe</button>
            </div>
        </div>
    )
}

export default PlanScreen