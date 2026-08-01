export const requiredEnrollmentFields = [
  { name: 'studentId', type: 'Number', domain: 'ID', required: true },
];
export const updateEnrollmentFields = [
  { name: 'studentId', type: 'Number', domain: 'ID', required: true },
  { name: 'status', domain: 'EnrollmentStatus', required: true },
];
