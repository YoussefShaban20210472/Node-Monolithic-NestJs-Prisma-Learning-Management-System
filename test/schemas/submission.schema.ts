export const requiredSubmissionByStudentFields = [
  { name: 'assignmentId', domain: 'ID' },
] as const;
export const requiredSubmissionFields = [
  { name: 'assignmentId', domain: 'ID' },
  { name: 'studentId', domain: 'ID' },
] as const;
export const requiredScoreSubmissionFields = [
  { name: 'assignmentId', domain: 'ID' },
  { name: 'studentId', domain: 'ID' },
  { name: 'score', type: 'Number', domain: 'Score' },
] as const;
