
import { PointEntry } from '../types';

// In a real app, this would be your Google Apps Script Web App URL
const API_URL = "https://script.google.com/macros/s/example/exec";

export const apiService = {
  // Mocking the API response
  async login(username: string, pass: string) {
    // Simulated auth check
    if (username === 'admin') return { id: 'U0', username: 'admin', fullName: 'Võ Trần Thạch Thảo', role: 'GVCN' };
    if (username === 'to1') return { id: 'U1', username: 'to1', fullName: 'Nguyễn Văn An', role: 'Tổ trưởng', group: 1 };
    if (username === 'hs1') return { id: 'U2', username: 'hs1', fullName: 'Lê Hoàng Long', role: 'Học sinh', studentId: 'S003' };
    throw new Error("Tên đăng nhập hoặc mật khẩu không đúng.");
  },

  async fetchPoints(): Promise<PointEntry[]> {
    return [
      { id: 'P01', studentId: 'S001', criteriaId: 'C001', weekId: 'W02', points: -2, note: 'Muộn 5p', status: 'Đã duyệt', submittedBy: 'admin', submittedAt: '2023-09-09' },
      { id: 'P02', studentId: 'S002', criteriaId: 'C002', weekId: 'W02', points: 5, note: 'Hăng hái', status: 'Chờ duyệt', submittedBy: 'to1', submittedAt: '2023-09-10' }
    ];
  }
};
