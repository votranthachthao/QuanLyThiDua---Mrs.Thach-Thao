
import React, { useState, useEffect } from 'react';
import { User, UserRole, Student, Criteria, Week, PointEntry } from './types';
import { DUMMY_STUDENTS, DUMMY_CRITERIA, DUMMY_WEEKS } from './constants';
import { apiService } from './services/api';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
// Import Recharts components for the reports tab
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // App State
  const [students] = useState<Student[]>(DUMMY_STUDENTS);
  const [criteria] = useState<Criteria[]>(DUMMY_CRITERIA);
  const [weeks] = useState<Week[]>(DUMMY_WEEKS);
  const [points, setPoints] = useState<PointEntry[]>([]);

  // Auth Inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    try {
      const p = await apiService.fetchPoints();
      setPoints(p);
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const userData = await apiService.login(username, password);
      setUser(userData as User);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setUsername('');
    setPassword('');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-indigo-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-indigo-700 p-8 text-white text-center">
            <h1 className="text-2xl font-bold">Hệ thống Quản lý Thi đua</h1>
            <p className="text-indigo-200 mt-2 text-sm">Lớp 12D1 | Năm học 2025 – 2026</p>
          </div>
          <form onSubmit={handleLogin} className="p-8 space-y-6">
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm border border-red-100">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tên đăng nhập</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tên đăng nhập"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Mật khẩu</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 disabled:opacity-50"
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
            <div className="text-center text-xs text-slate-400">
              Sử dụng "admin", "to1", hoặc "hs1" để demo
            </div>
          </form>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard user={user} points={points} students={students} />;
      
      case 'students':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100">
            <div className="p-6 border-b border-slate-100 flex flex-wrap gap-4 justify-between items-center">
               <h3 className="font-semibold text-slate-800">Danh sách học sinh (12D1)</h3>
               <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                 + Thêm học sinh
               </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="px-6 py-4">Mã HS</th>
                    <th className="px-6 py-4">Họ và Tên</th>
                    <th className="px-6 py-4">Tổ</th>
                    <th className="px-6 py-4">Ngày sinh</th>
                    <th className="px-6 py-4">Trạng thái</th>
                    <th className="px-6 py-4">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {students.map(s => (
                    <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-mono font-medium text-indigo-600">{s.id}</td>
                      <td className="px-6 py-4 font-semibold text-slate-800">{s.fullName}</td>
                      <td className="px-6 py-4">Tổ {s.group}</td>
                      <td className="px-6 py-4 text-slate-500">{s.dob}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-[10px]">{s.status}</span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-indigo-600 hover:underline mr-3">Sửa</button>
                        <button className="text-red-500 hover:underline">Xóa</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'criteria':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-slate-800">Cấu hình tiêu chí thi đua</h3>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium">Thêm tiêu chí</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {criteria.map(c => (
                <div key={c.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50 relative overflow-hidden">
                  <div className={`absolute left-0 top-0 h-full w-1 ${c.points >= 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{c.category}</span>
                    <span className={`font-bold ${c.points >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {c.points > 0 ? `+${c.points}` : c.points}
                    </span>
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-1">{c.name}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{c.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'weeks':
        return (
          <div className="max-w-3xl mx-auto space-y-4">
             {weeks.map(w => (
               <div key={w.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center">
                 <div>
                   <h4 className="font-bold text-slate-800">{w.name}</h4>
                   <p className="text-sm text-slate-500">{w.startDate} - {w.endDate}</p>
                 </div>
                 <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      w.status === 'Mở' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-slate-100 text-slate-600'
                    }`}>
                      Trạng thái: {w.status}
                    </span>
                    <button className="text-indigo-600 text-sm font-medium hover:underline">Cập nhật</button>
                 </div>
               </div>
             ))}
             <button className="w-full border-2 border-dashed border-slate-200 p-4 rounded-xl text-slate-400 hover:border-indigo-300 hover:text-indigo-500 transition-all font-medium">
               + Khởi tạo tuần mới
             </button>
          </div>
        );

      case 'input':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 max-w-2xl mx-auto">
             <h3 className="text-xl font-bold text-slate-800 mb-6">Ghi nhận điểm thi đua</h3>
             <form className="space-y-6">
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-2">Chọn Học sinh</label>
                 <select className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="">-- Chọn học sinh --</option>
                    {students.filter(s => user.role === UserRole.GVCN || s.group === user.group).map(s => (
                      <option key={s.id} value={s.id}>{s.fullName} - Tổ {s.group}</option>
                    ))}
                 </select>
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-2">Tiêu chí</label>
                 <select className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="">-- Chọn tiêu chí --</option>
                    {criteria.map(c => (
                      <option key={c.id} value={c.id}>{c.name} ({c.points >= 0 ? '+' : ''}{c.points}đ)</option>
                    ))}
                 </select>
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-2">Ghi chú chi tiết</label>
                 <textarea className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 h-24" placeholder="Ví dụ: Nghỉ học không lý do, tham gia dọn vệ sinh lớp..." />
               </div>
               <button type="button" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 shadow-lg shadow-indigo-100">
                 Gửi yêu cầu ghi nhận
               </button>
               <p className="text-center text-xs text-slate-400 italic">
                 {user.role === UserRole.LEADER ? "* Điểm của tổ trưởng nhập sẽ ở trạng thái 'Chờ duyệt' bởi GVCN." : "* Điểm nhập bởi GVCN sẽ được duyệt tự động."}
               </p>
             </form>
          </div>
        );

      case 'reports':
        return (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-4 text-lg">Phân tích Tiến độ Thi đua</h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { week: 'Tuần 1', points: 45 },
                    { week: 'Tuần 2', points: 52 },
                    { week: 'Tuần 3', points: 38 },
                    { week: 'Tuần 4', points: 65 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="points" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                 <h4 className="font-semibold text-slate-800 mb-4">Top 5 học sinh tiêu biểu</h4>
                 <div className="space-y-4">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i === 1 ? 'bg-yellow-100 text-yellow-600' : 'bg-slate-100 text-slate-600'}`}>
                            {i}
                          </span>
                          <span className="text-sm font-medium text-slate-700">Nguyễn Văn {i}</span>
                        </div>
                        <span className="text-sm font-bold text-green-600">+{20 - i}đ</span>
                      </div>
                    ))}
                 </div>
               </div>
               <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                 <h4 className="font-semibold text-slate-800 mb-4">Tỷ lệ vi phạm theo danh mục</h4>
                 <div className="space-y-4">
                    {['Nề nếp', 'Học tập', 'Phong trào', 'Lao động'].map((cat, idx) => (
                      <div key={cat}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-medium text-slate-600">{cat}</span>
                          <span className="text-slate-400">{(idx + 1) * 10}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                           <div className="bg-indigo-500 h-full" style={{ width: `${(idx + 1) * 10}%` }} />
                        </div>
                      </div>
                    ))}
                 </div>
               </div>
            </div>
          </div>
        );

      default:
        return <div>Tính năng đang phát triển</div>;
    }
  };

  return (
    <Layout 
      user={user} 
      onLogout={handleLogout} 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
    >
      {renderTabContent()}
    </Layout>
  );
};

export default App;
