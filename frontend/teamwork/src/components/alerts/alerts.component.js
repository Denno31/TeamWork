import react from 'react';

import React from 'react';

function AlertsComponent(props) {
        if(props.errors.length > 0){
            return (
            
                <div className="alert alert-danger container-fluid" role="alert" >
                    {props.errors}
                </div>
                    
                )
        }else{
            return (
            <div></div>
                
                    
                )
        }
       
    }

export default AlertsComponent;