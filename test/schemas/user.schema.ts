export const requiredUserFields = [
  { name: 'firstName', domain: 'Name' },
  { name: 'lastName', domain: 'Name' },
  { name: 'phoneNumber', domain: 'PhoneNumber' },
  { name: 'email', domain: 'Email' },
  { name: 'password', domain: 'Password' },
  { name: 'address', domain: 'Address' },
  { name: 'role', domain: 'Role' },
] as const;
export const updateUserFields = [
  { name: 'firstName', domain: 'Name' },
  { name: 'lastName', domain: 'Name' },
  { name: 'phoneNumber', domain: 'PhoneNumber' },
  { name: 'email', domain: 'Email' },
  { name: 'address', domain: 'Address' },
] as const;
