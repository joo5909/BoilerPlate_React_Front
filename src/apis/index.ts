import axios from "axios";
import { SignInRequestDto, SignUpRequestDto } from "./request/auth";
import { SignInResponseDto, SignUpResponseDto } from "./response/auth";
import { ResponseDto } from "./response";
import { GetUserResponseDto } from "./response/user";
import apiClient from "./axios/token-api-client";
import { GET_USER_URL, SIGN_IN_URL, SIGN_UP_URL } from "constant";

//로그인
export const signInRequest = async (requestBody: SignInRequestDto) => {
    try {
        const response = await apiClient.post(SIGN_IN_URL(), requestBody);
        const responseBody: SignInResponseDto = response.data;
        return responseBody;
    } catch (error: any) {
        // error.response가 존재하는지 확인
        if (error.response && error.response.data) {
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        }

        // 에러의 기본 메시지를 반환하거나 null 처리
        console.error('Network or Server Error:', error.message);
        return null;
    }
};

//회원가입
export const signUpRequest = async (requestBody : SignUpRequestDto) => {

    try {
        const response = await apiClient.post(SIGN_UP_URL(), requestBody);
        const responseBody: SignUpResponseDto = response.data;
        return responseBody;
    } catch (error: any) {
        // error.response가 존재하는지 확인
        if (error.response && error.response.data) {
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        }

        // 에러의 기본 메시지를 반환하거나 null 처리
        console.error('Network or Server Error:', error.message);
        return null;
    }
}

//User정보
export const getUserInfo = async (): Promise<GetUserResponseDto | null> => {
  try {
    const response = await apiClient.get(GET_USER_URL());
    return response.data as GetUserResponseDto; // 사용자 정보 반환
  } catch (error: any) {
    if (error.response?.data) {
      console.error('API Error:', error.response.data.message || 'Unknown API Error');
      return null; // 필요시 error.response.data를 반환하도록 수정
    }

    console.error('Network or Server Error:', error.message);
    return null;
  }
};
