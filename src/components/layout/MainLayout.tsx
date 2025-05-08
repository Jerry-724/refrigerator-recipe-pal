
import React from 'react';
import TabBar from '../navigation/TabBar';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
  return (
    <div className="app-container bg-gray-50">
      <div className="flex flex-col h-screen">
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
        <TabBar />
      </div>
    </div>
  );
};

export default MainLayout;
