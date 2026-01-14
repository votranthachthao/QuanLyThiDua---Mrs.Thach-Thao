
import React from 'react';
import { User, UserRole, PointEntry, Student } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  user: User;
  points: PointEntry[];
  students: Student[];
}

const Dashboard: React.FC<DashboardProps> = ({ user, points, students }) => {
  const approvedPoints = points.filter(p => p.status === 'Đã duyệt');
  const pendingPoints = points.filter(p => p.status === 'Chờ duyệt');

  const StatCard = ({ title, value, sub, color }: { title: string, value: string | number, sub: string, color: string }) => (
    <div className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${color}`}>
      <p className="text-sm text-slate-500 font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
      <p className="text-xs text-slate-400 mt-2">{sub}</p>
    </div>
  );

  if (user.role === UserRole.GVCN) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Tổng điểm lớp" value={approvedPoints.reduce((acc, p) => acc + p.points, 0)} sub="Tuần hiện tại" color="border-indigo-500" />
          <StatCard title="Chờ duyệt" value={pendingPoints.length} sub="Cần xử lý ngay" color="border-yellow-500" />
          <StatCard title="Học sinh tích cực" value="12" sub="Trên +20 điểm" color="border-green-500" />
          <StatCard title="Học sinh cần lưu ý" value="3" sub="Điểm âm" color="border-red-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h4 className="font-semibold text-slate-800 mb-4">Xếp hạng các tổ</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'Tổ 1', points: 150 },
                  { name: 'Tổ 2', points: 135 },
                  { name: 'Tổ 3', points: 160 },
                  { name: 'Tổ 4', points: 142 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="points" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h4 className="font-semibold text-slate-800 mb-4">Thao tác nhanh</h4>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center p-4 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors">
                <span className="text-2xl mb-1">📝</span>
                <span className="text-xs font-semibold">Nhập điểm nhanh</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 rounded-lg bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition-colors">
                <span className="text-2xl mb-1">⚖️</span>
                <span className="text-xs font-semibold">Duyệt đề xuất</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors">
                <span className="text-2xl mb-1">👤</span>
                <span className="text-xs font-semibold">Hồ sơ HS</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors">
                <span className="text-2xl mb-1">📈</span>
                <span className="text-xs font-semibold">Báo cáo tuần</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Same logic for Leader and Student dashboards with filtered data
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard 
          title={user.role === UserRole.LEADER ? "Tổng điểm Tổ" : "Điểm cá nhân"} 
          value={approvedPoints.length > 0 ? 85 : 0} 
          sub="Tuần hiện tại" 
          color="border-indigo-500" 
        />
        <StatCard 
          title="Xếp hạng" 
          value={user.role === UserRole.LEADER ? "2/4" : "15/45"} 
          sub="Trong lớp" 
          color="border-green-500" 
        />
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h4 className="font-semibold text-slate-800 mb-4">Lịch sử điểm gần đây</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold">
              <tr>
                <th className="px-4 py-3">Ngày</th>
                <th className="px-4 py-3">Tiêu chí</th>
                <th className="px-4 py-3">Điểm</th>
                <th className="px-4 py-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {points.map(p => (
                <tr key={p.id}>
                  <td className="px-4 py-3">{p.submittedAt}</td>
                  <td className="px-4 py-3">{p.note || 'Thi đua'}</td>
                  <td className={`px-4 py-3 font-semibold ${p.points >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {p.points > 0 ? `+${p.points}` : p.points}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                      p.status === 'Đã duyệt' ? 'bg-green-100 text-green-700' : 
                      p.status === 'Chờ duyệt' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
