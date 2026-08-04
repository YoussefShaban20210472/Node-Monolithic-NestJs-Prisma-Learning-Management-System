export const requiredAttendanceByStudentFields = [
  { name: 'otp', domain: 'OTP', required: true },
];
export const requiredAttendanceByAdminFields = [
  { name: 'studentId', type: 'Number', domain: 'ID', required: true },
  { name: 'otp', domain: 'OTP', required: true },
];

export const requiredGetAttendanceFields = [
  { name: 'studentId', type: 'Number', domain: 'ID', required: true },
];
