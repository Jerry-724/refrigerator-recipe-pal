
import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingComplete(true);
      
      // Give time for animation to complete
      setTimeout(onComplete, 500);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 flex flex-col items-center justify-center bg-white transition-opacity duration-500 ${loadingComplete ? 'opacity-0' : 'opacity-100'}`}>
      <h1 className="text-4xl font-bold mb-6 text-primary">뭐먹을냉?</h1>
      <div className="flex space-x-2">
        <div className="w-4 h-4 loading-circle" style={{ animationDelay: '0s' }}></div>
        <div className="w-4 h-4 loading-circle" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-4 h-4 loading-circle" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
