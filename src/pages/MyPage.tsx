
import React from 'react';
import ProfileSettings from '@/components/mypage/ProfileSettings';

const MyPage: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-6 border-b">
        <h1 className="text-xl font-bold">마이페이지</h1>
      </div>
      
      <div className="flex-1 overflow-auto">
        <ProfileSettings />
      </div>
    </div>
  );
};

export default MyPage;
