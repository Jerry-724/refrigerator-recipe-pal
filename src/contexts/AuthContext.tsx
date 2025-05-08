import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import api, { signup as apiSignup, login as apiLogin } from '@/api/api';

interface AuthContextType {
  user: { login_id: string } | null;
  loading: boolean;
  signup: (
    login_id: string,
    username: string,
    password1: string,
    password2: string
  ) => Promise<void>;
  login: (login_id: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  signup: async () => {},
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ login_id: string } | null>(null);
  const [loading, setLoading] = useState(false);

  // 앱 시작 시 저장된 토큰이 있으면 axios 헤더에 세팅
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      // (옵션) 여기서 /user/me 같은 엔드포인트로 유저 정보를 가져올 수도 있습니다.
    }
  }, []);

  const signup = async (
    login_id: string,
    username: string,
    password1: string,
    password2: string
  ) => {
    setLoading(true);
    try {
      await apiSignup({ login_id, username, password1, password2 });
    } finally {
      setLoading(false);
    }
  };

  const login = async (login_id: string, password: string) => {
    setLoading(true);
    try {
      const res = await apiLogin(login_id, password);
      const token = res.data.access_token;
      localStorage.setItem('token', token);
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setUser({ login_id });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.Authorization;
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
