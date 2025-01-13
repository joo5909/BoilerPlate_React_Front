
export const DOMAIN = () => 'http://localhost:8080';

//URL
export const API_DOMAIN = () =>   DOMAIN() + '/api/v1';
export const SIGN_IN_URL = () =>   '/auth/sign-in';
export const SIGN_UP_URL = () =>   '/auth/sign-up';
export const GET_USER_URL = () =>   '/user';


//PATH
export const MAIN_PATH = () => '/';
export const AUTH_PATH = () => '/auth';
export const SEARCH_PATH = (searchWord : string) => `/search/${searchWord}`;
export const USER_PATH = (userEmail : string) => `/user/${userEmail}`;
export const BOARD_PATH = () => '/board';
export const BOARD_WRITE_PATH = () => 'write';
export const BOARD_DETAIL_PATH = (boardIdx: string | number) => `detail/${boardIdx}`;
export const BOARD_UPDATE_PATH = (boardIdx: string | number) => `update/${boardIdx}`;

