import apiClient from "./token-api-client";
import { syncUserInfo } from "./user-sync";

// 요청 인터셉터: 토큰을 헤더에 자동으로 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // 헤더에 토큰 추가
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 토큰 갱신 처리
apiClient.interceptors.response.use(
  (response) => {
    // 새로운 AccessToken이 있을 경우 sessionStorage에 저장
    const newAccessToken = response.headers['authorization']?.split(' ')[1];
    if (newAccessToken) {      
      syncUserInfo(newAccessToken); // 토큰 갱신 후 사용자 정보 동기화
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
