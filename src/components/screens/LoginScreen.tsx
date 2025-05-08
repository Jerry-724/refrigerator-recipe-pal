
import React, { useState } from 'react';
import CustomInput from '../common/CustomInput';
import CustomButton from '../common/CustomButton';
import { useAuth } from '@/contexts/AuthContext';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  const { login, signup, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password, nickname);
      }
      onLogin();
    } catch (error) {
      setError('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
      <h1 className="text-4xl font-bold mb-8 text-primary">뭐먹을냉?</h1>
      
      <div className="w-full max-w-md">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">
            {isLogin ? '로그인' : '회원가입'}
          </h2>
          <p className="text-gray-500">
            {isLogin 
              ? '앱을 사용하려면 로그인이 필요합니다.' 
              : '새 계정을 만들어보세요.'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <CustomInput
            label="이메일"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <CustomInput
            label="비밀번호"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          {!isLogin && (
            <CustomInput
              label="닉네임"
              type="text"
              placeholder="사용할 닉네임을 입력하세요"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          )}
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <CustomButton
            type="submit"
            fullWidth
            disabled={loading}
          >
            {loading ? '처리 중...' : isLogin ? '로그인' : '회원가입'}
          </CustomButton>
        </form>
        
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:underline"
          >
            {isLogin ? '계정이 없으신가요? 회원가입' : '이미 계정이 있으신가요? 로그인'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
