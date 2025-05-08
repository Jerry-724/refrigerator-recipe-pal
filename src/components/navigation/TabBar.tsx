
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TabBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const tabs = [
    { name: '레시피 추천', path: '/recipe' },
    { name: '내 냉장고', path: '/inventory' },
    { name: '마이페이지', path: '/mypage' },
  ];
  
  const activeTabIndex = tabs.findIndex(tab => location.pathname.startsWith(tab.path));
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
      <div className="flex justify-around items-center">
        {tabs.map((tab, index) => (
          <button
            key={tab.name}
            onClick={() => navigate(tab.path)}
            className={`flex-1 py-3 flex flex-col items-center ${
              activeTabIndex === index ? 'text-primary font-medium' : 'text-gray-500'
            }`}
          >
            {index === 0 && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke={activeTabIndex === 0 ? '#8DD07E' : '#9CA3AF'} strokeWidth="2" />
              </svg>
            )}
            {index === 1 && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 4H19C20.1 4 21 4.9 21 6V20C21 21.1 20.1 22 19 22H5C3.9 22 3 21.1 3 20V6C3 4.9 3.9 4 5 4Z" stroke={activeTabIndex === 1 ? '#8DD07E' : '#9CA3AF'} strokeWidth="2" />
                <path d="M16 2V6M8 2V6M3 10H21" stroke={activeTabIndex === 1 ? '#8DD07E' : '#9CA3AF'} strokeWidth="2" />
              </svg>
            )}
            {index === 2 && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke={activeTabIndex === 2 ? '#8DD07E' : '#9CA3AF'} strokeWidth="2" />
                <path d="M19 21C19 17.134 15.866 14 12 14C8.13401 14 5 17.134 5 21" stroke={activeTabIndex === 2 ? '#8DD07E' : '#9CA3AF'} strokeWidth="2" />
              </svg>
            )}
            <span className="text-xs mt-1">{tab.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabBar;
