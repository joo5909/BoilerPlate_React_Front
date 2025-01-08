import React ,{ Dispatch, forwardRef, SetStateAction } from 'react'
import './style.css'

interface Props {
    label : string;
    type : 'text' | 'password';
    placeholder? : string;
    value? : string;
    setValue : Dispatch<SetStateAction<string>>;
    error : boolean;
    icon? : string;
    onButtonClick? : () => void;
    message? : string;    
    onKeyDown? : (e : React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputBox = forwardRef<HTMLInputElement, Props>((props : Props, ref) => {

    const {label, type, placeholder, value, error, icon, message}   = props;

    const {setValue, onButtonClick, onKeyDown} = props;

    const onChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setValue(value);
    }
    
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
                <input type = {type} className = 'input' ref = {ref} placeholder={placeholder} value = {value} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
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