import React, { useState } from 'react';
import CustomInput from '../common/CustomInput';
import CustomButton from '../common/CustomButton';
import { useAuth } from '@/contexts/AuthContext';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginId, setLoginId] = useState('');      // login_id
  const [password1, setPassword1] = useState('');  // password1 / login password
  const [password2, setPassword2] = useState('');  // password2 / confirm
  const [username, setUsername] = useState('');    // nickname
  const [error, setError] = useState('');
  const { login, signup, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!loginId || !password1 || (!isLogin && (!password2 || !username))) {
      setError('모든 필드를 입력해주세요.');
      return;
    }
    if (!isLogin && password1 !== password2) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      if (isLogin) {
        await login(loginId, password1);
        onLogin();
      } else {
        await signup(loginId, username, password1, password2);
        alert('회원가입이 완료되었습니다.\n이제 로그인해주세요.');
        setIsLogin(true);
      }
    } catch (err: any) {
      setError(isLogin ? '로그인에 실패했습니다.' : err.response?.data?.detail || '회원가입에 실패했습니다.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold mb-4 text-center">뭐먹을냉?</h1>
        <h2 className="text-2xl font-semibold mb-2">
          {isLogin ? '로그인' : '회원가입'}
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <CustomInput
            label="아이디"
            type="text"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            placeholder="아이디를 입력하세요"
            required
          />

          <CustomInput
            label="비밀번호"
            type="password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            required
          />

          {!isLogin && (
            <>
              <CustomInput
                label="비밀번호 확인"
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="비밀번호를 다시 한 번 입력하세요"
                required
              />
              <CustomInput
                label="닉네임"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="사용할 닉네임을 입력하세요"
                required
              />
            </>
          )}

          <CustomButton type="submit" fullWidth disabled={loading}>
            {loading
              ? isLogin
                ? '로그인 중…'
                : '가입 중…'
              : isLogin
              ? '로그인'
              : '회원가입'}
          </CustomButton>
        </form>

        <p className="mt-4 text-center">
          <button
            onClick={() => {
              setError('');
              setIsLogin(!isLogin);
            }}
            className="text-primary hover:underline"
          >
            {isLogin
              ? '계정이 없으신가요? 회원가입'
              : '이미 계정이 있으신가요? 로그인'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
