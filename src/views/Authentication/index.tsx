import React, { useEffect, useRef } from 'react'
import './style.css'
import InputBox from 'components/InputBox';
import { useNavigate } from 'react-router-dom';
import useLoginUserStore from 'stores/user.store'; // Updated path
import { SignInRequestDto, SignUpRequestDto } from 'apis/request/auth';
import { signInRequest, signUpRequest } from 'apis';
import { ResponseDto } from 'apis/response';
import { SignInResponseDto, SignUpResponseDto } from 'apis/response/auth';
import { AUTH_PATH, MAIN_PATH } from 'constant';
import { Address, useDaumPostcodePopup } from 'react-daum-postcode';
import { ResponseCode, ResponseMessage } from 'types/enum';


function Authentication() {

    
    const [view, setView] = React.useState<'sign-in'|'sign-up'>('sign-in');
   
    const navigator = useNavigate();

    const SignInCard = () => {

        const emailRef = useRef<HTMLInputElement>(null);
        const passwordRef = useRef<HTMLInputElement>(null);

        const [email, setEmail] = React.useState<string>('');
        const [password, setPassword] = React.useState<string>('');
        const [passwordType, setPasswordType] = React.useState<'text'|'password'>('password');
        const [passwordButtonIcon, setPasswordButtonIcon] = React.useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon');
        const [error, setError] = React.useState<boolean>(false);

        const onPasswordButtonClickHandler = () => {
            if(passwordType === 'text') {
                setPasswordType('password');
                setPasswordButtonIcon('eye-light-off-icon');
            }
            else {
                setPasswordType('text');
                setPasswordButtonIcon('eye-light-on-icon');
            }
        }
        
        const signInReponse = (responseBody : SignInResponseDto | ResponseDto | null) => {
            if (!responseBody) {
                alert('서버와의 통신에 실패했습니다.');
                return;
            }

            const { code }  = responseBody;

            if (code === ResponseCode.DATABASE_ERROR) alert(ResponseMessage.DATABASE_ERROR);
            if (code === ResponseCode.SIGN_IN_FAIL || ResponseCode.VALIDATION_FAILED) setError(true);
            if (code !== ResponseCode.SUCCESS) return;

            const { accessToken, email, nickname, profileImage, accessTokenExpirationTime } = responseBody as SignInResponseDto;

            // 세션스토리지에 저장
            sessionStorage.setItem('accessToken', accessToken);    

            // 로그인 사용자 정보를 zustand 상태로 저장
            useLoginUserStore.getState().setLoginUser({
                email,
                nickname,
                profileImage: profileImage ? profileImage : '', // 프로필 이미지가 없으면 빈 문자열로 처리          
            });

            navigator(MAIN_PATH());
         
        }

        const onEmailChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
            setError(false);
            const value = e.target.value;            
            setEmail(value);
        }

        const onPasswordChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
            setError(false);
            const value = e.target.value;            
            setPassword(value);
        }


        const SignInButtonClickHandler = () => {      
            const requestBody : SignInRequestDto = { email, password };
            signInRequest(requestBody).then(signInReponse);
        }


        const SignUpButtonClickHandler = () => {
            setView('sign-up');
        }


        const onEmailKeyDownHandler= (e : React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter' && passwordRef.current !== null) {       
                passwordRef.current.focus();               
            }
        }

        const onPasswordButtonKeyDownHandler= (e : React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {  
                SignInButtonClickHandler();             
            }
        }

        useEffect(() => {
            if(emailRef.current !== null) {
                emailRef.current.focus();
            }    
        },[])

        return (
            <div className = 'auth-card'>
                <div className='auth-card-box'>
                    <div className='auth-card-top'>
                        <div className='auth-card-title-box'>
                            <div className='auth-card-title'>Sign In</div>
                        </div>
                        <InputBox ref = {emailRef} label ='이메일 주소' type = 'text' placeholder='이메일 주소를 입력해주세요.' error={error} value={email} onChange={onEmailChangeHandler} onKeyDown={onEmailKeyDownHandler}/>
                        <InputBox ref = {passwordRef} label ='패스워드' type = {passwordType} placeholder='비밀번호를 입력해주세요.' error={error} value={password} onChange={onPasswordChangeHandler} icon ={passwordButtonIcon} onButtonClick={onPasswordButtonClickHandler} onKeyDown={onPasswordButtonKeyDownHandler}/>
                    </div>
                    <div className='auth-card-bottom'>
                        {error && (
                            <div className='auth-sign-in-error-box'>
                                <div className='auth-sign-in-error-message'>{'이메일 주소 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해 주세요.'}</div>
                            </div>
                        )}
                        <div className='black-large-full-button' onClick={SignInButtonClickHandler}>로그인</div>
                        <div className='auth-description-box'>
                            <div className='auth-description'>{'신규 사용자이신가요?'}<span className ='auth-description-link' onClick={SignUpButtonClickHandler}>회원가입</span></div>
                        </div>
                    </div>
                </div>  
            </div>
        )
    }

    const SignUpCard = () => {

        const [page, setPage] = React.useState<1|2>(1);

        const emailRef = useRef<HTMLInputElement>(null);
        const passwordRef = useRef<HTMLInputElement>(null);
        const passwordCheckRef = useRef<HTMLInputElement>(null);
        const nicknameRef = useRef<HTMLInputElement>(null);
        const telNumberRef = useRef<HTMLInputElement>(null);
        const addressRef = useRef<HTMLInputElement>(null);
        const addressDetailRef = useRef<HTMLInputElement>(null);

        const [email, setEmail] = React.useState<string>('');
        const [password, setPassword] = React.useState<string>('');        
        const [passwordCheck, setPasswordCheck] = React.useState<string>('');

        const [passwordType, setPasswordType] = React.useState<'text'|'password'>('password');
        const [passwordCheckType, setPasswordCheckType] = React.useState<'text'|'password'>('password');

        const [nickname, setNickname] = React.useState<string>('');
        const [telNumber, setTelNumber] = React.useState<string>('');
        const [address, setAddress] = React.useState<string>('');
        const [addressDetail, setAddressDetail] = React.useState<string>('');  
        
        const [agreedPersonal, setAgreedPersonal] = React.useState<boolean>(false);

        const [isEmailError, setIsEmailError] = React.useState<boolean>(false);
        const [isPasswordError, setIsPasswordError] = React.useState<boolean>(false);
        const [isPasswordCheckError, setIsPasswordCheckError] = React.useState<boolean>(false);
        const [isNicknameError, setIsNicknameError] = React.useState<boolean>(false);
        const [isTelNumberError, setIsTelNumberError] = React.useState<boolean>(false);
        const [isAddressError, setIsAddressError] = React.useState<boolean>(false);
        const [isAgreedPersonalError, setIsAgreedPersonalError] = React.useState<boolean>(false);

        const [emailErrorMessgae, setEmailErrorMessage] = React.useState<string>('');
        const [passwordErrorMessage, setPasswordErrorMessage] = React.useState<string>('');
        const [passwordCheckErrorMessage, setPasswordCheckErrorMessage] = React.useState<string>('');
        const [nicknameErrorMessage, setNicknameErrorMessage] = React.useState<string>('');
        const [telNumberErrorMessage, setTelNumberErrorMessage] = React.useState<string>('');
        const [addressErrorMessage, setAddressErrorMessage] = React.useState<string>('');


        const [passwordButtonIcon, setPasswordButtonIcon] = React.useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon');
        const [passwordCheckButtonIcon, setPassworCheckdButtonIcon] = React.useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon');

        const open = useDaumPostcodePopup();

        const signUpResponse = (responseBody : SignUpResponseDto | ResponseDto | null) => {
            if (!responseBody) {
                alert('서버와의 통신에 실패했습니다.');
                return;
            }

            const { code }  = responseBody;

            if (code === ResponseCode.DUPLICATE_EMAIL){
                setIsEmailError(true);
                setEmailErrorMessage(ResponseMessage.DUPLICATE_EMAIL);
            }

            if (code === ResponseCode.DUPLICATE_NICKNAME){
                setIsNicknameError(true);
                setNicknameErrorMessage(ResponseMessage.DUPLICATE_NICKNAME);
            }

            if (code === ResponseCode.DUPLICATE_TEL_NUMBER){
                setIsTelNumberError(true);
                setTelNumberErrorMessage(ResponseMessage.DUPLICATE_TEL_NUMBER);
            }
            
            if (code === ResponseCode.VALIDATION_FAILED) alert(ResponseMessage.VALIDATION_FAILED);
            if (code === ResponseCode.DATABASE_ERROR) alert(ResponseMessage.DATABASE_ERROR);

            if (code !== ResponseCode.SUCCESS) return;

            alert('회원가입이 완료되었습니다.\n로그인 페이지로 이동합니다.');

            setView('sign-in');

        }



        const onEmailChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
            setIsEmailError(false);
            setEmailErrorMessage('');
        }

        const onPasswordChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
            setIsPasswordError(false);
            setPasswordErrorMessage('');
        }

        const onPasswordCheckChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
            setPasswordCheck(e.target.value);
            setIsPasswordCheckError(false);
            setPasswordCheckErrorMessage('');
        }

        const onNicknameChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
            setNickname(e.target.value);
            setIsNicknameError(false);
            setNicknameErrorMessage('');
        }

        const onTelNumberChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
            setTelNumber(e.target.value);
            setIsTelNumberError(false);
            setTelNumberErrorMessage('');
        }

        const onAddressChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
            setAddress(e.target.value);
            setIsAddressError(false);
            setAddressErrorMessage('');
        }

        const onAddressDetailChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
            setAddressDetail(e.target.value);
        }      

        const onPasswordButtonClickHandler = () => {
            if(passwordType === 'text') {
                setPasswordType('password');
                setPasswordButtonIcon('eye-light-off-icon');
            }
            else {
                setPasswordType('text');
                setPasswordButtonIcon('eye-light-on-icon');
            }
        }

        const onPasswordCheckButtonClickHandler = () => {
            if(passwordCheckType === 'text') {
                setPasswordCheckType('password');
                setPassworCheckdButtonIcon('eye-light-off-icon');
            }
            else {
                setPasswordCheckType('text');
                setPassworCheckdButtonIcon('eye-light-on-icon');
            }
        }

        const onNextButtonClickHandler = () => {

            if (page === 1) {

                if (email === '') {
                    setIsEmailError(true);
                    setEmailErrorMessage('이메일 주소를 입력해주세요.');
                    return;
                }
                else {
                    setIsEmailError(false);
                    setEmailErrorMessage('');
                }

                const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                const isEmailPattern = emailPattern.test(email);

                if (!isEmailPattern) {
                    setIsEmailError(true);
                    setEmailErrorMessage('이메일 주소 형식이 올바르지 않습니다.');
                    return;
                }
                else {
                    setIsEmailError(false);
                    setEmailErrorMessage('');
                }             
                

                if (password === '') {
                    setIsPasswordError(true);
                    setPasswordErrorMessage('비밀번호를 입력해주세요.');
                    return;
                }
                else {
                    setIsPasswordError(false);
                    setPasswordErrorMessage('');
                }

                const isCheckedPassword = password.trim().length > 8;

                if (!isCheckedPassword) {
                    setIsPasswordError(true);
                    setPasswordErrorMessage('비밀번호는 8자 이상이어야 합니다.');
                    return;
                }
                else {
                    setIsPasswordError(false);
                    setPasswordErrorMessage('');
                }

                if (passwordCheck === '') {
                    setIsPasswordCheckError(true);
                    setPasswordCheckErrorMessage('비밀번호를 다시 입력해주세요.');
                    return;
                }
                else {
                    setIsPasswordCheckError(false);
                    setPasswordCheckErrorMessage('');
                }

                const isCheckedPasswordCheck = passwordCheck.trim().length > 8;

                if (password !== passwordCheck) {
                    setIsPasswordCheckError(true);
                    setPasswordCheckErrorMessage('비밀번호가 일치하지 않습니다.');
                    return;
                }
                else {
                    setIsPasswordCheckError(false);
                    setPasswordCheckErrorMessage('');
                }

                if (!isCheckedPasswordCheck) {
                    setIsPasswordCheckError(true);
                    setPasswordCheckErrorMessage('비밀번호는 8자 이상이어야 합니다.');
                    return;
                }
                else {
                    setIsPasswordCheckError(false);
                    setPasswordCheckErrorMessage('');
                }

                setPage(2);
            }
            else if (page === 2) {

                if (nickname.trim() === '') {
                    setIsNicknameError(true);
                    setNicknameErrorMessage('닉네임을 입력해주세요.');
                    return;
                }
                else {
                    setIsNicknameError(false);
                    setNicknameErrorMessage('');
                }

                const telNumberPattern = /^01[0|1|6|7|8|9]-\d{3,4}-\d{4}$/;
                const isTelNumberPattern = telNumberPattern.test(telNumber);

                if (telNumber.trim() === '') {
                    setIsTelNumberError(true);
                    setTelNumberErrorMessage('휴대번호를 입력해주세요.');
                    return;
                }
                else {
                    setIsTelNumberError(false);
                    setTelNumberErrorMessage('');
                }

                if(!isTelNumberPattern) {
                    setIsTelNumberError(true);
                    setTelNumberErrorMessage('휴대번호 형식이 올바르지 않습니다.');
                    return;
                }
                else {
                    setIsTelNumberError(false);
                    setTelNumberErrorMessage('');
                }

                if (address.trim() === '') {
                    setIsAddressError(true);
                    setAddressErrorMessage('주소를 입력해주세요.');
                    return;
                }
                else {
                    setIsAddressError(false);
                    setAddressErrorMessage('');
                }

                if(!agreedPersonal) {
                    setIsAgreedPersonalError(true);
                    return;
                }
                else {
                    setIsAgreedPersonalError(false);
                }    
                
                const requestBody : SignUpRequestDto = {
                    email,
                    password,
                    nickname,
                    telNumber,
                    address,
                    addressDetail,
                    agreedPersonal
                };

                //API 송신
                onSignUpButtonClickHandler(requestBody);
            }
        }

        const onSiginInButtonClickHandler = () => {
            setView('sign-in');
        }

        const onAgreedPersonalClickHandler = () => {
            setAgreedPersonal(!agreedPersonal); 
            setIsAgreedPersonalError(false);     
       
        }

        const onAddressButtonClickHandler = () => {
            open({onComplete});
        }

        const onSignUpButtonClickHandler = (requestBody :SignUpRequestDto) => {
            signUpRequest(requestBody).then(signUpResponse);
        }

        const onEmailKeyDownHandler= (e : React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter' && passwordRef.current !== null) {       
                passwordRef.current.focus();               
            }
        }

        const onPasswordKeyDownHandler= (e : React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter' && passwordCheckRef.current !== null) {       
                passwordCheckRef.current.focus();               
            }
        }

        const onPasswordCheckKeyDownHandler= (e : React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {       
                onNextButtonClickHandler();   
                if(nicknameRef.current !== null) {
                    nicknameRef.current.focus();       
                }
            }
        }        

        const onNicknameKeyDownHandler= (e : React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter' && telNumberRef.current !== null) {       
                telNumberRef.current.focus();               
            }
        }

        const onTelNumberKeyDownHandler= (e : React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter' && addressRef.current !== null) {       
                addressRef.current.focus();               
            }
        }

        const onAddressKeyDownHandler= (e : React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter' && addressDetailRef.current !== null) {       
                addressDetailRef.current.focus();               
            }
        }

        const onAddressDetailKeyDownHandler= (e : React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {       
                onNextButtonClickHandler();           
            }
        }

        const onComplete = (data: Address) => {
            const { address } = data;
            setAddress(address);

            if(!addressDetailRef.current) return;
            addressDetailRef.current.focus();
        }
        
        useEffect(() => {
            if(page === 1) {
                if(emailRef.current !== null) {
                    emailRef.current.focus();
                }
            }
            else if(page === 2) {
                if(nicknameRef.current !== null) {
                    nicknameRef.current.focus();
                }
            }
        },[page]) //page가 변경될때마다 실행


        return (
            <div className = 'auth-card'>
                <div className='auth-card-box'>
                    <div className='auth-card-top'>
                        <div className='auth-card-title-box'>
                            <div className='auth-card-title'>회원가입</div>
                            <div className='auth-card-page'>{`${page}/2`}</div>
                        </div>
                        {page === 1 && (
                            <>
                                <InputBox   ref = {emailRef} 
                                            label ='이메일 주소' 
                                            type = 'text' 
                                            placeholder='이메일 주소를 입력해주세요.' 
                                            error={isEmailError} 
                                            value={email} 
                                            onChange={onEmailChangeHandler}                                     
                                            onKeyDown={onEmailKeyDownHandler}
                                            message = {emailErrorMessgae}
                                />
                                <InputBox   ref = {passwordRef} 
                                            label ='비밀번호' 
                                            type = {passwordType} 
                                            placeholder='비밀번호를 입력해주세요.' 
                                            error={isPasswordError} 
                                            value={password} 
                                            icon = {passwordButtonIcon}
                                            onChange={onPasswordChangeHandler}
                                            onButtonClick = {onPasswordButtonClickHandler}
                                            onKeyDown={onPasswordKeyDownHandler}
                                            message = {passwordErrorMessage}
                                />
                                <InputBox   ref = {passwordCheckRef} 
                                            label ='비밀번호 확인' 
                                            type = {passwordCheckType} 
                                            placeholder='비밀번호를 다시 입력해주세요.' 
                                            error={isPasswordCheckError} 
                                            value={passwordCheck} 
                                            icon = {passwordCheckButtonIcon}
                                            onChange={onPasswordCheckChangeHandler}
                                            onButtonClick = {onPasswordCheckButtonClickHandler}
                                            onKeyDown={onPasswordCheckKeyDownHandler}
                                            message = {passwordCheckErrorMessage}
                                />
                            </>
                        )}
                        {page === 2 && (
                            <> 
                                <InputBox   ref = {nicknameRef} 
                                            label ='닉네임*' 
                                            type = 'text' 
                                            placeholder='닉네임을 입력해주세요.' 
                                            value={nickname} 
                                            error={isNicknameError}                                             
                                            onChange={onNicknameChangeHandler}                                     
                                            onKeyDown={onNicknameKeyDownHandler}
                                            message = {nicknameErrorMessage}
                                />
                                <InputBox   ref = {telNumberRef} 
                                            label ='휴대번호*' 
                                            type = 'text' 
                                            placeholder='휴대번호를 입력해주세요.' 
                                            value={telNumber} 
                                            error={isTelNumberError}                                             
                                            onChange={onTelNumberChangeHandler}
                                            onKeyDown={onTelNumberKeyDownHandler}
                                            message = {telNumberErrorMessage}
                                />
                                <InputBox   ref = {addressRef} 
                                            label ='주소*' 
                                            type = 'text' 
                                            placeholder='주소를 입력해주세요.' 
                                            value={address} 
                                            error={isAddressError}                                             
                                            onChange={onAddressChangeHandler}
                                            onKeyDown={onAddressKeyDownHandler}
                                            onButtonClick = {onAddressButtonClickHandler}
                                            icon = 'expend-right-light-icon'
                                            message = {addressErrorMessage}
                                />
                                <InputBox   ref = {addressDetailRef} 
                                            label ='상세주소' 
                                            type = 'text' 
                                            placeholder='상세 주소를 입력해주세요.' 
                                            value={addressDetail} 
                                            error={false}                                            
                                            onChange={onAddressDetailChangeHandler}
                                            onKeyDown={onAddressDetailKeyDownHandler}
                                            message = {''}
                                />
                            </>
                        )}
                       
                    </div>
                    <div className='auth-card-bottom'>
                        {page === 1 && (
                            <div className='black-large-full-button' onClick={onNextButtonClickHandler}>다음 단계</div>
                        )}
                        {page === 2 && (
                            <>
                                <div className='auth-consent-box'>
                                    <div className='auth-check-box' onClick={onAgreedPersonalClickHandler}>                              
                                        <div className = 'check-round-fill-icon'></div>                                  
                                        <div className = {`icon ${agreedPersonal ? 'check-round-fill-icon' : 'check-ring-light-icon'}`}></div>                                                                         
                                    </div>
                                    <div className ={isAgreedPersonalError ? 'auth-consent-title-error' : 'auth-consent-title'}>개인정보동의</div>
                                    <div className ='auth-consent-link'>{'더보기 >'}</div>
                                </div>
                                <div className='black-large-full-button' onClick={onNextButtonClickHandler}>회원가입</div>
                            </>

                        )}
                        <div className='auth-description-box'>
                            <div className='auth-description'>{'이미 계정이 있으신가요?'}<span className ='auth-description-link' onClick ={onSiginInButtonClickHandler}>로그인</span></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } 

    return (
        <div className='auth-wrapper'>
            <div className='auth-container'>
                <div className='auth-jumbotron-box'>
                    <div className='auth-jumbotron-contents'>
                        <div className='auth-logo-icon'></div>
                        <div className='auth-jumbotron-text-box'>
                            <div className='auth-jumbotron-text'>Welcome</div>
                            <div className='auth-jumbotron-text'>하하하</div>
                        </div>
                    </div>
                </div>
                {view === 'sign-in' ? <SignInCard /> : <SignUpCard />}     
            </div>
        </div>
    )
}

export default Authentication