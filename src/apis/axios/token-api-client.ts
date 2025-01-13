import axios from 'axios';
import { API_DOMAIN } from 'constant';

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_DOMAIN(), // 서버 주소
  headers: {
    'Content-Type': 'application/json',
  },
});

// 토큰 인터셉터 설정
export default apiClient;