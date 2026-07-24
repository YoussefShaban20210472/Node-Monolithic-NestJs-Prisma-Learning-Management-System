export const invalidAuthenicationSecinaros = [
  { type: 'empty', value: [''] },
  { type: 'invalid', value: ['adsadasdsad', 'invalid-session'] },
] as const;

export const invalidTokens = [
  'Bearer ',
  'bearer',
  'Bearer',
  '1234',
  '++++',
  'GoodPerson',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsInJvbGUiOiJBRE1JTiIsImp3dFZlcnNpb24iOiIwIiwiaWF0IjoxNzg0ODUwNjUwLCJleHAiOjE3ODQ4NTE1NTB9.9a_ZVBNpoh7wqLcxvzEMpLhrzG69zKhqf1gVEitD0Tk',
];
export const expiredTokens = [
  '',
  // 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsInJvbGUiOiJBRE1JTiIsImp3dFZlcnNpb24iOiIwIiwiaWF0IjoxNzg0ODUwNjUwLCJleHAiOjE3ODQ4NTE1NTB9.9a_ZVBNpoh7wqLcxvzEMpLhrzG69zKhqf1gVEitD0Tk',
  // 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsInJvbGUiOiJBRE1JTiIsImp3dFZlcnNpb24iOiIwIiwiaWF0IjoxNzg0ODUxMDk0LCJleHAiOjE3ODQ4NTE5OTR9.603cY2m7dHv4DHgJGsdBnfWKL1TRenon0tAoaMWCMks',
  // 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsInJvbGUiOiJBRE1JTiIsImp3dFZlcnNpb24iOiIwIiwiaWF0IjoxNzg0ODUxMjA3LCJleHAiOjE3ODQ4NTIxMDd9.UanrweCDposNvz8i_ItLEgWikDHnLUAXUwqjsmcYDlw',
];
export const malformedTokens = [
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ8.eyJpZCI6MjEsInJvbGUiOiJBRE1JTiIsImp3dFZlcnNpb24iOiIwIiwiaWF0IjoxNzg0ODUwNjUwLCJleHAiOjE3ODQ4NTE1NTB9.9a_ZVBNpoh7wqLcxvzEMpLhrzG69zKhqf1gVEitD0Tk',
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsInJvbGUiOiJBRE1JTiIsImp3dFZlcnNpb24iOiIwIiwiaWF0IjoxNzg0ODUxMDk0LCJleHAiOjE3ODQ4NTE5OTR9.903cY2m7dHv4DHgJGsdBnfWKL1TRenon0tAoaMWCMks',
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsInJvbGUiOiJBRE1JTiIsImp3dFZlcnNpb24iOiIwIiwiaWF0IjoxNzg0ODUxMjA3LCJleHAiOjE3ODQ4NTI9.UanrweCDposNvz8i_ItLEgWikDHnLUAXUwqjsmcYDlw',
];
