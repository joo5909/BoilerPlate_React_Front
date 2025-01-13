import React ,{ ChangeEvent, Dispatch, forwardRef, SetStateAction } from 'react'
import './style.css'

interface Props {
    label : string;
    type : 'text' | 'password';
    placeholder? : string;
    value? : string;
    onChange? : (event : ChangeEvent<HTMLInputElement>) => void;
    error : boolean;
    icon? : 'eye-light-off-icon' | 'eye-light-on-icon' | 'expend-right-light-icon';
    onButtonClick? : () => void;
    message? : string;    
    onKeyDown? : (e : React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputBox = forwardRef<HTMLInputElement, Props>((props : Props, ref) => {

    const {label, type, placeholder, value, error, icon, message}   = props;

    const {onChange, onButtonClick, onKeyDown} = props;


    const onKeyDownHandler = (e : React.KeyboardEvent<HTMLInputElement>) => {
        if (!onKeyDown){
            return;
        }
        else {
            if (e.key === 'Enter') {
                if (onKeyDown !== undefined) {
                    onKeyDown(e);
                }
            }
        }
    }
    return (
        <div className = 'inputbox'>
            <div className = 'inputbox-label'>{label}</div>
            <div className = {error ? 'inputbox-container-error' : 'inputbox-container'}>
                <input type = {type} className = 'input' ref = {ref} placeholder={placeholder} value = {value} onChange={onChange} onKeyDown={onKeyDownHandler}/>
                {onButtonClick !== undefined && (
                    <div className = 'icon-button' onClick = {onButtonClick}>
                        {icon !== undefined && (
                            <div className = {`icon ${icon}`}></div>
                        )}
                    </div>
                )}      
            </div>
            {message !== undefined && (
                <div className = 'inputbox-message'>{message}</div> 
            )}
        </div>  
    )
});

export default InputBox;