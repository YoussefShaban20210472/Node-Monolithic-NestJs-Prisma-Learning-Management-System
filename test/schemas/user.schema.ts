export const requiredUserFields = [
  { name: 'firstName', domain: 'Name', required: true },
  { name: 'lastName', domain: 'Name', required: true },
  { name: 'phoneNumber', domain: 'PhoneNumber', required: true },
  { name: 'email', domain: 'Email', required: true },
  { name: 'password', domain: 'Password', required: true },
  { name: 'address', domain: 'Address', required: true },
  { name: 'role', domain: 'Role', required: true },
];
export const updateUserFields = [
  { name: 'firstName', domain: 'Name', required: false },
  { name: 'lastName', domain: 'Name', required: false },
  { name: 'phoneNumber', domain: 'PhoneNumber', required: false },
  { name: 'email', domain: 'Email', required: false },
  { name: 'address', domain: 'Address', required: false },
];
