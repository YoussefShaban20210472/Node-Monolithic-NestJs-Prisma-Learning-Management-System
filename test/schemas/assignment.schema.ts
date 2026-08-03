export const requiredAssignmentFields = [
  { name: 'title', domain: 'Title', required: true },
  { name: 'description', domain: 'Description', required: true },
  { name: 'score', type: 'Number', domain: 'Score', required: true },
  { name: 'startDate', domain: 'Date', required: true },
  { name: 'endDate', domain: 'Date', required: true },
];
export const updateAssignmentFields = [
  { name: 'title', domain: 'Title', required: false },
  { name: 'description', domain: 'Description', required: false },
  { name: 'score', type: 'Number', domain: 'Score', required: false },
  { name: 'startDate', domain: 'Date', required: false },
  { name: 'endDate', domain: 'Date', required: false },
];
