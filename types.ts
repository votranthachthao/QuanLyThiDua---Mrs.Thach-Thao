
export enum UserRole {
  GVCN = 'GVCN',
  LEADER = 'Tổ trưởng',
  STUDENT = 'Học sinh'
}

export interface User {
  id: string;
  username: string;
  fullName: string;
  role: UserRole;
  group?: number;
  studentId?: string;
}

export interface Student {
  id: string;
  fullName: string;
  gender: 'Nam' | 'Nữ';
  dob: string;
  group: number;
  status: 'Đang học' | 'Nghỉ học';
  notes: string;
}

export interface Criteria {
  id: string;
  name: string;
  category: 'Nề nếp' | 'Học tập' | 'Phong trào' | 'Lao động';
  points: number;
  isActive: boolean;
  description: string;
}

export interface Week {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'Mở' | 'Đóng';
}

export interface PointEntry {
  id: string;
  studentId: string;
  criteriaId: string;
  weekId: string;
  points: number;
  note: string;
  status: 'Chờ duyệt' | 'Đã duyệt' | 'Từ chối';
  submittedBy: string;
  submittedAt: string;
}
