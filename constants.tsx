
import { Student, Criteria, Week, User, UserRole } from './types';

export const CLASS_INFO = {
  teacher: 'Võ Trần Thạch Thảo',
  className: '12D1',
  schoolYear: '2025 – 2026'
};

export const DUMMY_STUDENTS: Student[] = [
  { id: 'S001', fullName: 'Nguyễn Văn An', gender: 'Nam', dob: '2008-05-15', group: 1, status: 'Đang học', notes: '' },
  { id: 'S002', fullName: 'Trần Thị Bình', gender: 'Nữ', dob: '2008-08-22', group: 1, status: 'Đang học', notes: '' },
  { id: 'S003', fullName: 'Lê Hoàng Long', gender: 'Nam', dob: '2008-01-10', group: 2, status: 'Đang học', notes: '' },
  { id: 'S004', fullName: 'Phạm Minh Thư', gender: 'Nữ', dob: '2008-11-30', group: 2, status: 'Đang học', notes: '' },
];

export const DUMMY_CRITERIA: Criteria[] = [
  { id: 'C001', name: 'Đi học muộn', category: 'Nề nếp', points: -2, isActive: true, description: 'Đi học sau tiếng trống' },
  { id: 'C002', name: 'Phát biểu xây dựng bài', category: 'Học tập', points: 5, isActive: true, description: 'Được giáo viên bộ môn ghi nhận' },
  { id: 'C003', name: 'Không thuộc bài', category: 'Học tập', points: -5, isActive: true, description: 'Kiểm tra miệng dưới trung bình' },
  { id: 'C004', name: 'Tham gia phong trào', category: 'Phong trào', points: 10, isActive: true, description: 'Đóng góp tích cực cho lớp' },
];

export const DUMMY_WEEKS: Week[] = [
  { id: 'W01', name: 'Tuần 1 - HKI', startDate: '2025-09-01', endDate: '2025-09-07', status: 'Đóng' },
  { id: 'W02', name: 'Tuần 2 - HKI', startDate: '2025-09-08', endDate: '2025-09-14', status: 'Mở' },
];
