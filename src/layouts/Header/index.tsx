import React, { useEffect, useRef, useState } from 'react'
import './style.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AUTH_PATH, BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from 'constant';
import { useBoardStore, useLoginUserStore } from 'stores';

function Header() {

  //로그인 유저 상태
  const {loginUser, setLoginUser, resetLoginUser} = useLoginUserStore();

  //path 상태
  const {pathname} = useLocation();

  //토큰
  const [accessToken, setToken] = useState(() => sessionStorage.getItem('accessToken') || null);

  //로그인 상태
  const [isLogin, setLogin] = useState<boolean>(false);

  //path 값
  const isAuthPage = pathname.startsWith(AUTH_PATH());
  const isMainPage = pathname === MAIN_PATH();
  const isSearchPage = pathname.startsWith(SEARCH_PATH(''));
  const isBoardDetailPage = pathname.startsWith(BOARD_PATH() + '/' + BOARD_DETAIL_PATH(''));
  const isBoardWritePage = pathname.startsWith(BOARD_PATH() + '/' +BOARD_WRITE_PATH());
  const isBoardUpdatePage = pathname.startsWith(BOARD_PATH() + '/' +BOARD_UPDATE_PATH(''));
  const isUserPage = pathname.startsWith(USER_PATH(''));

  const navigate = useNavigate();

  const onLogoClickHandler = () => {
    navigate(MAIN_PATH());
  }

  //검색버튼
  const SearchButton = () => {

    //검색 버튼 상태
    const [status, setStatus] = useState<boolean>(false);

    //검색어 상태
    const [word, setWord] = useState<string>('');

    //검색어 버튼 요소 참조 상태
    const searchButtonRef = useRef<HTMLDivElement>(null);

    //검색어 path variable 상태
    const {searchWord, setSearchWord} = useParams();

    //검색어 변경 이벤트 처리 함수    
    const onsearchWordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setWord(value);
    }

    //검색어 키 이벤트 처리 함수
    const onSearchWordKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== 'Enter') return;
      if (!searchButtonRef.current) return;
      searchButtonRef.current.click(); 
    }

    // 검색버튼 클릭 이벤트 처리 함수
    const onSearchButtonClickHandler = () => {
      if(!status) {
        setStatus(!status);
        return;
      }
      navigate(SEARCH_PATH(word));
    }

    // 검색어 path variable이 변경되었을 때 처리 함수
    useEffect(() => {
      if (searchWord) {
        setWord(searchWord);
        setStatus(true);
      }
    },[searchWord]);

    if(!status) {
      return (
              <div className='icon-button' onClick={onSearchButtonClickHandler}>
                <div className='icon search-light-icon'></div>
              </div>
      );
    }
    else {
      return (
                <div className = 'header-search-input-box'>
                  <input className = 'header-search-input' type='text' placeholder='검색어를 입력해주세요.' value = {word} onChange={onsearchWordChangeHandler} onKeyDown={onSearchWordKeyDownHandler} />
                  <div className='icon-button' onClick={onSearchButtonClickHandler}>
                    <div className='icon search-light-icon'></div>
                  </div>
                </div>
      );
      
    }    
  }

  //로그인 마이페이지 버튼 컴포넌트

  //로그인 버튼 컴포넌트
  const MypageButton = () => {

    const { userEmail } = useParams();

    //마이페이지 버튼 클릭 이벤트 처리 함수
    const onMypageButtonClickHandler = () => {
      if (!loginUser) return;
      const {email} = loginUser;
      navigate(USER_PATH(email));
    }

    //로그아웃 버튼 클릭 이벤트 처리 함수
    const onSignOutButtonClickHandler = () => {
      resetLoginUser();
      navigate(MAIN_PATH());
    }

    //로그인버튼 클릭 이벤트 처리 함수
    const onLoginButtonClickHandler = () => {
      navigate(AUTH_PATH());
    }

    if(isLogin && userEmail === loginUser?.email) {
      return (
        <div className='white-button' onClick={onSignOutButtonClickHandler}>{'로그아웃'}</div>
      ); 
    }

    if (isLogin) {
      return (
        <div className='white-button' onClick={onMypageButtonClickHandler}>{'마이페이지'}</div>
      );
    }
    else {
      return(
        <div className='black-button' onClick={onLoginButtonClickHandler}>{'로그인'}</div>    
      );
    }
  }

  //업로드 버튼 컴포넌트
  const UploadButton = () => {

    //게시물 상태
    const { title, content, boardImageFileList, resetBoard} = useBoardStore();

    //업로드 버튼 클릭 이벤트 처리 함수
    const onUploadButtonClickHandler = () => {

    }

    if (title && content) {
      return <div className='black-button' onClick={onUploadButtonClickHandler}>{'업로드'}</div>  
    }
    else {
      return <div className='disable-button'>{'업로드'}</div> 
    }
  }


  return (
    <div className='header'>
      <div className='header-container'>
        <div className = 'header-left-box' onClick={onLogoClickHandler}>
          <div className = 'icon-box'>
            <div className = 'icon logo-dark-icon'></div>
          </div>
          <div className = 'header-logo'></div>
        </div>        
        <div className='header-right-box'>{isAuthPage}
          {(isAuthPage || isMainPage || isSearchPage || isBoardDetailPage) && <SearchButton />}
          {(isMainPage || isSearchPage || isBoardDetailPage || isUserPage) && <MypageButton />}
          {(isBoardWritePage || isBoardUpdatePage) && <UploadButton />}
        </div>
      </div>      
    </div>
  )
}

export default Header