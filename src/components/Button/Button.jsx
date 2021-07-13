import { useState, useEffect } from 'react';
import './style.css';

const Button = ({variant, loading, textColor, icon, label, ...props}) => {
    const [buttonColor, setButtonColor] = useState('');
    const setColor = () => {
        switch(variant) {
            case 'primary':
                setButtonColor('#4e4e4e');
                break;
            case 'secondary':
                setButtonColor('#445ede');
                break;
            case 'danger':
                setButtonColor('red');
                break;
            default:
                setButtonColor('');
        }
    }
    useEffect(() => {
        setColor()
    });
    return (
        <button 
            {...props}
            style={{
                background: buttonColor,
                color: textColor,
                border: 'none'
            }}
        >
            <div className="d-flex justify-content-center">
                {loading && (<div className="loader"></div>)}
                <div className="top-1">
                    {label ? (
                        <div>
                            <span className={icon}></span>
                            <span>{label}</span>
                        </div>
                    ):(
                        <div>
                           <span className={icon}></span>
                           <span>{props.children}</span>
                        </div>
                    )}
                    </div>
            </div>
        </button>
    )
};

export default Button;