
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import { InventoryProvider } from './contexts/InventoryContext';
import { ChatProvider } from './contexts/ChatContext';

import LoadingScreen from './components/screens/LoadingScreen';
import LoginScreen from './components/screens/LoginScreen';
import MainLayout from './components/layout/MainLayout';

import InventoryPage from './pages/InventoryPage';
import RecipePage from './pages/RecipePage';
import MyPage from './pages/MyPage';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { user, loading } = useAuth();
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  
  useEffect(() => {
    // If auth loading is complete and we have no user, show login screen
    if (!loading && !user && !showLogin) {
      const timer = setTimeout(() => {
        setShowLogin(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loading, user, showLogin]);
  
  const handleLoadingComplete = () => {
    setShowLoadingScreen(false);
  };
  
  const handleLogin = () => {
    setShowLogin(false);
  };
  
  if (showLoadingScreen) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }
  
  if (showLogin) {
    return <LoginScreen onLogin={handleLogin} />;
  }
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }
  
  return (
    <Routes>
      {user ? (
        <>
          <Route path="/" element={<Navigate to="/inventory" replace />} />
          <Route path="/" element={<MainLayout />}>
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="recipe" element={<RecipePage />} />
            <Route path="mypage" element={<MyPage />} />
          </Route>
        </>
      ) : (
        <Route path="*" element={<Navigate to="/" replace />} />
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <InventoryProvider>
          <ChatProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </ChatProvider>
        </InventoryProvider>
      </AuthProvider>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
