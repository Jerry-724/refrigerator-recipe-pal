
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// This is now just a redirect page to the inventory page
const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/inventory');
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">뭐먹을냉?</h1>
        <p className="text-gray-500">잠시만 기다려주세요...</p>
      </div>
    </div>
  );
};

export default Index;
