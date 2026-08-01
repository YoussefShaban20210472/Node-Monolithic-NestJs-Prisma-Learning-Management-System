export const requiredCourseFields = [
  { name: 'title', domain: 'Title', required: true },
  { name: 'description', domain: 'Description', required: true },
  { name: 'shortDescription', domain: 'ShortDescription', required: true },
  { name: 'startDate', domain: 'Date', required: true },
  { name: 'endDate', domain: 'Date', required: true },
  { name: 'tags', type: 'StringArray', domain: 'StringArray', required: true },
  {
    name: 'categories',
    type: 'StringArray',
    domain: 'StringArray',
    required: true,
  },
];
export const updateCourseFields = [
  { name: 'title', domain: 'Title', required: false },
  { name: 'description', domain: 'Description', required: false },
  { name: 'shortDescription', domain: 'ShortDescription', required: false },
  { name: 'startDate', domain: 'Date', required: false },
  { name: 'endDate', domain: 'Date', required: false },
  { name: 'tags', type: 'StringArray', domain: 'StringArray', required: false },
  {
    name: 'categories',
    type: 'StringArray',
    domain: 'StringArray',
    required: false,
  },
];
