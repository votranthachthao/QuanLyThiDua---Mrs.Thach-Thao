
import React from 'react';
import { User, UserRole } from '../types';
import { CLASS_INFO } from '../constants';

interface LayoutProps {
  user: User;
  onLogout: () => void;
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ user, onLogout, children, activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Bảng điều khiển', roles: [UserRole.GVCN, UserRole.LEADER, UserRole.STUDENT] },
    { id: 'students', label: 'Quản lý học sinh', roles: [UserRole.GVCN] },
    { id: 'criteria', label: 'Tiêu chí thi đua', roles: [UserRole.GVCN] },
    { id: 'weeks', label: 'Quản lý tuần', roles: [UserRole.GVCN] },
    { id: 'input', label: 'Nhập điểm', roles: [UserRole.GVCN, UserRole.LEADER] },
    { id: 'reports', label: 'Thống kê - Báo cáo', roles: [UserRole.GVCN, UserRole.LEADER, UserRole.STUDENT] },
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(user.role));

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-indigo-900 text-white flex-shrink-0">
        <div className="p-6 border-b border-indigo-800">
          <h1 className="text-xl font-bold leading-tight">QUẢN LÝ THI ĐUA</h1>
          <p className="text-xs text-indigo-300 mt-1">Lớp {CLASS_INFO.className} | {CLASS_INFO.schoolYear}</p>
        </div>
        
        <div className="p-4 border-b border-indigo-800 bg-indigo-800/50">
          <p className="text-xs uppercase text-indigo-400 font-semibold mb-1">Người dùng</p>
          <p className="font-medium text-sm truncate">{user.fullName}</p>
          <span className="inline-block px-2 py-0.5 rounded text-[10px] bg-indigo-600 text-white mt-1">
            {user.role}
          </span>
        </div>

        <nav className="p-4 space-y-1">
          {filteredMenu.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id 
                ? 'bg-indigo-600 text-white shadow-lg' 
                : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={onLogout}
            className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-red-300 hover:bg-red-900/30 hover:text-red-100 transition-colors mt-8"
          >
            Đăng xuất
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-slate-50 overflow-auto">
        <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-slate-800">
            {menuItems.find(i => i.id === activeTab)?.label}
          </h2>
          <div className="text-sm text-slate-500 hidden sm:block">
            GVCN: <span className="font-medium text-slate-800">{CLASS_INFO.teacher}</span>
          </div>
        </header>
        <div className="p-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
