export const requiredNotificationFields = [
  { name: 'status', domain: 'NotificationStatus' },
] as const;
export const requiredNotificationByUserIdFields = [
  { name: 'status', domain: 'NotificationStatus' },
  { name: 'userId', domain: 'ID' },
] as const;
