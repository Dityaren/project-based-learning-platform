import { USER_ROLES, type UserRole } from "#/lib/db/schema/types.ts";

export function isUserRole(value: unknown): value is UserRole {
  return USER_ROLES.some((role) => role === value);
}

export function hasRole(role: unknown, allowed: readonly UserRole[]): role is UserRole {
  return isUserRole(role) && allowed.includes(role);
}
