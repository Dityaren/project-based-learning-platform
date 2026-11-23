export const USER_ROLES = ["student", "teacher", "admin", "master"] as const;
export type UserRole = (typeof USER_ROLES)[number];
