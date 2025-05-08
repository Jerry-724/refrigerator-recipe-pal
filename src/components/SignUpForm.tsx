// src/components/SignUpForm.tsx
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function SignUpForm() {
  const { signup, loading } = useAuth();
  const [loginId, setLoginId] = useState('');      // 로그인 ID
  const [username, setUsername] = useState('');    // 닉네임
  const [password1, setPassword1] = useState('');  // 비밀번호
  const [password2, setPassword2] = useState('');  // 비밀번호 확인
  const [error, setError] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 빈 값 체크
    if (!loginId || !username || !password1 || !password2) {
      setError('모든 필드를 입력해주세요.');
      return;
    }
    // 비밀번호 일치 여부 체크
    if (password1 !== password2) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      // signup(login_id, username, password1, password2)
      await signup(loginId, username, password1, password2);
      alert('회원가입이 완료되었습니다. 로그인해주세요.');
    } catch (err: any) {
      setError(err.response?.data?.detail || '회원가입에 실패했습니다.');
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl mb-4">회원가입</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <label className="block mb-2">아이디</label>
      <input
        type="text"
        value={loginId}
        onChange={e => setLoginId(e.target.value)}
        className="w-full border p-2 mb-4"
        placeholder="사용할 로그인 ID를 입력하세요"
        required
      />

      <label className="block mb-2">닉네임</label>
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="w-full border p-2 mb-4"
        placeholder="표시될 닉네임을 입력하세요"
        required
      />

      <label className="block mb-2">비밀번호</label>
      <input
        type="password"
        value={password1}
        onChange={e => setPassword1(e.target.value)}
        className="w-full border p-2 mb-4"
        placeholder="비밀번호를 입력하세요"
        required
      />

      <label className="block mb-2">비밀번호 확인</label>
      <input
        type="password"
        value={password2}
        onChange={e => setPassword2(e.target.value)}
        className="w-full border p-2 mb-6"
        placeholder="비밀번호를 다시 입력하세요"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-500 text-white py-2 rounded"
      >
        {loading ? '가입 중…' : '회원가입'}
      </button>
    </form>
  );
}
