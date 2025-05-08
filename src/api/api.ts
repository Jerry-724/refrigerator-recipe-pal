// src/api/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// ─── 회원가입 ─────────────────────────────
// login_id: 로그인 아이디(문자열)
// username: 화면에 보일 닉네임
// password: 비밀번호
export interface SignUpData {
  login_id: string;
  username: string;
  password1: string;
  password2: string;
}
export const signup = (data: SignUpData) =>
  api.post<void>('/user/create', data);

// ─── 로그인 ───────────────────────────────
// 로그인 성공 시 { access_token: string } 반환
export interface LoginResponse {
  access_token: string;
}
export const login = (login_id: string, password: string) =>
  api.post<LoginResponse>('/user/login', { login_id, password });

// ─── (필요시) 토큰 갱신 · 로그아웃 등 추가 함수…

export default api;
